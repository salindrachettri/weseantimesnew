// I am trying to basically uses GitHub's API to store and retrieve data from a JSON file in this repository
import { articles as defaultArticles } from "@/data/articles";

// Configuration for GitHub API access
const GITHUB_TOKEN = "Y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"; // my personal github token, used classic
const GITHUB_REPO = "salindrachettri/weseantimesnew"; // Replaced 
const GITHUB_BRANCH = "main"; // whatever branch a person is using
const ARTICLES_PATH = "data/articles.ts"; // Path in the repo where articles will be stored
 
// GitHub Pages compatible storage solution with GitHub API backend
export const StorageAPI = {
  // Get the articles data
  getArticles: async () => {
    try {
      // First try to get from localStorage (for faster loading)
      const storedArticles = localStorage.getItem('weseanArticles');
      const lastFetch = localStorage.getItem('weseanLastFetch');
      const now = new Date().getTime();
      
      // If we have recently fetched articles (within 5 minutes), use the cached version
      if (storedArticles && lastFetch && now - parseInt(lastFetch) < 300000) {
        return JSON.parse(storedArticles);
      }
      
      // Otherwise, fetch from GitHub API
      console.log("Fetching articles from GitHub API");
      const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${ARTICLES_PATH}`, {
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json'
        }
      });
      
      if (!response.ok) {
        // If the file doesn't exist yet or there's another error, use and save defaults
        console.log("Failed to fetch from GitHub, using defaults:", response.status);
        localStorage.setItem('weseanArticles', JSON.stringify(defaultArticles));
        localStorage.setItem('weseanLastFetch', now.toString());
        return defaultArticles;
      }
      
      // Parse the response and get the content
      const data = await response.json();
      const content = JSON.parse(atob(data.content)); // GitHub returns base64 encoded content
      
      // Save to localStorage for faster access next time
      localStorage.setItem('weseanArticles', JSON.stringify(content));
      localStorage.setItem('weseanLastFetch', now.toString());
      
      // Broadcast change to other tabs/windows
      StorageAPI.broadcastChange();
      
      return content;
    } catch (error) {
      console.error("Error getting articles:", error);
      
      // Fallback to localStorage if available
      const storedArticles = localStorage.getItem('weseanArticles');
      if (storedArticles) {
        return JSON.parse(storedArticles);
      }
      
      // Otherwise use defaults
      return defaultArticles;
    }
  },
  
  // Save articles to GitHub repository
  saveArticles: async (articles: any[]) => {
    try {
      // Save to localStorage immediately for fast access
      localStorage.setItem('weseanArticles', JSON.stringify(articles));
      
      // Prepare the data for GitHub
      const content = btoa(JSON.stringify(articles, null, 2)); // Convert to base64
      
      // Check if the file already exists to get its SHA
      let sha = '';
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${ARTICLES_PATH}`, {
          headers: {
            'Authorization': `token ${GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          sha = data.sha;
        }
      } catch (error) {
        // File doesn't exist yet, that's fine
        console.log("File doesn't exist yet, will be created");
      }
      
      // Prepare the request data
      const requestData: any = {
        message: "Update articles data",
        content: content,
        branch: GITHUB_BRANCH
      };
      
      // Add SHA if we're updating an existing file
      if (sha) {
        requestData.sha = sha;
      }
      
      // Send the update to GitHub
      const updateResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}/contents/${ARTICLES_PATH}`, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.github.v3+json'
        },
        body: JSON.stringify(requestData)
      });
      
      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        console.error("Error saving to GitHub:", errorData);
        throw new Error(`GitHub API error: ${updateResponse.status}`);
      }
      
      // Update last fetch time
      localStorage.setItem('weseanLastFetch', new Date().getTime().toString());
      
      // Broadcast change to other tabs/windows
      StorageAPI.broadcastChange();
      
      return true;
    } catch (error) {
      console.error("Error saving articles:", error);
      
      // Even if GitHub save fails, we still have the localStorage copy
      // This allows offline editing with sync when connection is restored
      return false;
    }
  },
  
  // Broadcast a change to all tabs/windows
  broadcastChange: () => {
    try {
      // Use a custom event to notify other tabs
      const timestamp = new Date().getTime();
      localStorage.setItem('weseanLastUpdate', timestamp.toString());
      
      // Dispatch storage event for same-window notification
      window.dispatchEvent(new CustomEvent('weseanArticlesUpdated', {
        detail: { timestamp }
      }));
      
      return true;
    } catch (error) {
      console.error("Error broadcasting change:", error);
      return false;
    }
  },
  
  // Listen for changes from other tabs/windows
  listenForChanges: (callback: () => void) => {
    // For cross-tab communication
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'weseanLastUpdate' || event.key === 'weseanArticles') {
        callback();
      }
    };
    
    // For same-window communication
    const handleCustomEvent = () => {
      callback();
    };
    
    // Add both event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('weseanArticlesUpdated', handleCustomEvent);
    
    // Return cleanup function
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('weseanArticlesUpdated', handleCustomEvent);
    };
  },
  
  // Export current articles to a file (for backup)
  exportArticles: () => {
    try {
      const articles = JSON.parse(localStorage.getItem('weseanArticles') || '[]');
      const blob = new Blob([JSON.stringify(articles, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'wesean-articles-backup.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error("Error exporting articles:", error);
      return false;
    }
  },
  
  // Import articles from a file (for restoration)
  importArticles: async (file: File): Promise<boolean> => {
    try {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const content = e.target?.result as string;
            const articles = JSON.parse(content);
            if (Array.isArray(articles)) {
              const saved = await StorageAPI.saveArticles(articles);
              resolve(saved);
            } else {
              reject(new Error("Invalid articles data format"));
            }
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = () => reject(new Error("Failed to read file"));
        reader.readAsText(file);
      });
    } catch (error) {
      console.error("Error importing articles:", error);
      return false;
    }
  },
  
  // Setup GitHub token for API access
  setupGitHubToken: (token: string, repo: string, branch: string = 'main') => {
    localStorage.setItem('weseanGitHubToken', token);
    localStorage.setItem('weseanGitHubRepo', repo);
    localStorage.setItem('weseanGitHubBranch', branch);
    return true;
  },
  
  // Get GitHub configuration
  getGitHubConfig: () => {
    return {
      token: localStorage.getItem('weseanGitHubToken') || GITHUB_TOKEN,
      repo: localStorage.getItem('weseanGitHubRepo') || GITHUB_REPO,
      branch: localStorage.getItem('weseanGitHubBranch') || GITHUB_BRANCH
    };
  }
};
