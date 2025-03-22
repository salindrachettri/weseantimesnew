import React, { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, Github, Download, Upload, RefreshCw } from 'lucide-react';
import { StorageAPI } from '@/utils/storageAPI';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const AdminGitHubSetup = () => {
  const [token, setToken] = useState('');
  const [repo, setRepo] = useState('');
  const [branch, setBranch] = useState('main');
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [config, setConfig] = useState<any>(null);
  const { toast } = useToast();

  // Load existing configuration
  useEffect(() => {
    const githubConfig = StorageAPI.getGitHubConfig();
    setConfig(githubConfig);
    
    if (githubConfig.token) {
      setToken(githubConfig.token);
      setRepo(githubConfig.repo);
      setBranch(githubConfig.branch);
    }
  }, []);

  const handleSetupGitHub = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!token || !repo) {
      toast({
        title: "Missing information",
        description: "Please enter your GitHub token and repository details",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      // Save GitHub configuration
      StorageAPI.setupGitHubToken(token, repo, branch);
      
      // Test the connection by doing an initial sync
      const articles = await StorageAPI.getArticles();
      
      toast({
        title: "GitHub integration setup successfully",
        description: "Your article data will now be stored in your GitHub repository",
      });
      
      // Update the config state
      setConfig(StorageAPI.getGitHubConfig());
    } catch (error) {
      console.error("Error setting up GitHub:", error);
      toast({
        title: "GitHub setup failed",
        description: "Please check your GitHub token and repository details",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSyncWithGitHub = async () => {
    setIsSyncing(true);
    
    try {
      // Force a fresh fetch from GitHub
      localStorage.removeItem('weseanLastFetch');
      const articles = await StorageAPI.getArticles();
      
      toast({
        title: "Synced with GitHub",
        description: "Latest articles pulled from GitHub repository",
      });
      
      // Force reload the page to reflect changes
      window.location.reload();
    } catch (error) {
      console.error("Error syncing with GitHub:", error);
      toast({
        title: "Sync failed",
        description: "Could not retrieve data from GitHub",
        variant: "destructive"
      });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExport = () => {
    StorageAPI.exportArticles();
    
    toast({
      title: "Export successful",
      description: "Articles exported to JSON file",
    });
  };

  const handleImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImportFile(e.target.files[0]);
    }
  };

  const handleImport = async () => {
    if (!importFile) {
      toast({
        title: "No file selected",
        description: "Please select a JSON file to import",
        variant: "destructive"
      });
      return;
    }
    
    setIsImporting(true);
    
    try {
      const success = await StorageAPI.importArticles(importFile);
      
      if (success) {
        toast({
          title: "Import successful",
          description: "Articles imported from JSON file and uploaded to GitHub",
        });
        
        // Force reload the page to reflect changes
        window.location.reload();
      } else {
        throw new Error("Import failed");
      }
    } catch (error) {
      console.error("Error importing:", error);
      toast({
        title: "Import failed",
        description: "Please check that the file contains valid article data",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-medium mb-6">GitHub Integration</h2>
      
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>GitHub Repository Setup</CardTitle>
            <CardDescription>
              Connect your GitHub repository to store article data. This enables persistent storage across all devices.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSetupGitHub} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="token">GitHub Personal Access Token</Label>
                <Input
                  id="token"
                  type="password"
                  value={token}
                  onChange={(e) => setToken(e.target.value)}
                  placeholder="ghp_your_personal_access_token"
                  className="font-mono"
                />
                <p className="text-sm text-gray-500">
                  Create a token with <code>repo</code> scope at <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">GitHub Settings</a>
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="repo">Repository Name</Label>
                <Input
                  id="repo"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="username/repository"
                />
                <p className="text-sm text-gray-500">
                  Format: <code>username/repository</code> (e.g., <code>johndoe/wesean-times</code>)
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="branch">Branch Name</Label>
                <Input
                  id="branch"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  placeholder="main"
                />
                <p className="text-sm text-gray-500">
                  Default branch is usually <code>main</code> or <code>master</code>
                </p>
              </div>
              
              <Button 
                type="submit" 
                disabled={isSaving}
                className="w-full"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Setting up...
                  </>
                ) : (
                  <>
                    <GitHub className="mr-2 h-4 w-4" />
                    {config?.token ? 'Update GitHub Connection' : 'Connect to GitHub'}
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {config?.token && (
          <Card>
            <CardHeader>
              <CardTitle>Data Management</CardTitle>
              <CardDescription>
                Sync, backup, and restore your article data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium">Connected Repository</h3>
                    <p className="text-sm text-gray-600">{config.repo} ({config.branch})</p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleSyncWithGitHub}
                    disabled={isSyncing}
                  >
                    {isSyncing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        Sync Now
                      </>
                    )}
                  </Button>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2">Backup Data</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Export your articles to a JSON file
                    </p>
                    <Button 
                      variant="secondary" 
                      onClick={handleExport}
                      className="w-full"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Export Articles
                    </Button>
                  </div>
                  
                  <div>
                    <h3 className="font-medium mb-2">Restore Data</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      Import articles from a JSON file
                    </p>
                    <div className="flex gap-2">
                      <Input
                        type="file"
                        accept=".json"
                        onChange={handleImportChange}
                        className="flex-1"
                      />
                      <Button
                        variant="secondary"
                        onClick={handleImport}
                        disabled={!importFile || isImporting}
                      >
                        {isImporting ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminGitHubSetup;
