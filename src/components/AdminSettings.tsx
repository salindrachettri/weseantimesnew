import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Save, Loader2 } from 'lucide-react';
import { articles } from '@/data/articles';
import { StorageAPI } from '@/utils/storageAPI';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminGitHubSetup from './AdminGitHubSetup';

const AdminSettings = () => {
  const [siteName, setSiteName] = useState('The Wesean Times');
  const [siteTagline, setSiteTagline] = useState('Truth in Every Story');
  const [breakingNews, setBreakingNews] = useState('');
  const [hotTags, setHotTags] = useState(['Politics', 'Election', 'Economy', 'Technology', 'Health', 'Climate']);
  const [newTag, setNewTag] = useState('');
  const [featuredArticleId, setFeaturedArticleId] = useState('1'); // Default to the first article
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddTag = () => {
    if (newTag && !hotTags.includes(newTag)) {
      setHotTags([...hotTags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setHotTags(hotTags.filter(t => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate saving settings
    setTimeout(() => {
      toast({
        title: "Settings saved",
        description: "Your changes have been successfully saved",
      });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="general">General Settings</TabsTrigger>
          <TabsTrigger value="github">GitHub Integration</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <h2 className="text-2xl font-medium mb-6">Site Settings</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-gray-700 mb-1">
                  Site Name
                </label>
                <input
                  type="text"
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              
              <div>
                <label htmlFor="siteTagline" className="block text-sm font-medium text-gray-700 mb-1">
                  Site Tagline
                </label>
                <input
                  type="text"
                  id="siteTagline"
                  value={siteTagline}
                  onChange={(e) => setSiteTagline(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              
              <div>
                <label htmlFor="featuredArticle" className="block text-sm font-medium text-gray-700 mb-1">
                  Featured Homepage Article
                </label>
                <select
                  id="featuredArticle"
                  value={featuredArticleId}
                  onChange={(e) => setFeaturedArticleId(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                >
                  {articles.map(article => (
                    <option key={article.id} value={article.id.toString()}>
                      {article.title}
                    </option>
                  ))}
                </select>
                <p className="mt-1 text-sm text-gray-500">
                  This article will be displayed in the hero section of the homepage.
                </p>
              </div>
              
              <div>
                <label htmlFor="breakingNews" className="block text-sm font-medium text-gray-700 mb-1">
                  Breaking News
                </label>
                <input
                  type="text"
                  id="breakingNews"
                  value={breakingNews}
                  onChange={(e) => setBreakingNews(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                  placeholder="Enter breaking news headline (leave empty for none)"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hot Tags
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {hotTags.map(tag => (
                    <div key={tag} className="bg-gray-100 px-3 py-1 rounded-full flex items-center">
                      <span className="text-sm">{tag}</span>
                      <button 
                        type="button" 
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-black"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="bg-gray-200 text-gray-700 px-4 py-2 rounded-r-md hover:bg-gray-300"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-70 flex items-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-5 w-5" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    Save Settings
                  </>
                )}
              </button>
            </div>
          </form>
        </TabsContent>
        
        <TabsContent value="github">
          <AdminGitHubSetup />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
