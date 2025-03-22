
import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Edit, Trash2, Search, BookOpen, Star, StarOff, X } from 'lucide-react';
import { articles } from '@/data/articles';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const AdminArticleList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  // Create a copy of the articles array to manipulate
  const [articlesList, setArticlesList] = useState([...articles]);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<any>(null);
  const [editedArticle, setEditedArticle] = useState<any>(null);
  
  // Sync state to localStorage to persist data for GitHub Pages
  useEffect(() => {
    const savedArticles = localStorage.getItem('weseanArticles');
    if (savedArticles) {
      setArticlesList(JSON.parse(savedArticles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('weseanArticles', JSON.stringify(articlesList));
  }, [articlesList]);
  
  const categories = ['All', 'Politics', 'Business', 'Culture', 'Opinion', 
    'Science', 'Technology', 'Style', 'History', 'Media', 'Psychology'];
  
  const filteredArticles = articlesList.filter(article => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === 'All' || article.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });
  
  const handleDelete = (slug: string) => {
    if (confirm("Are you sure you want to delete this article? This will remove it from the website.")) {
      setArticlesList(articlesList.filter(article => article.slug !== slug));
      toast({
        title: "Article deleted",
        description: "The article has been successfully deleted from the website",
      });
    }
  };

  const toggleFeatured = (slug: string, currentStatus: boolean) => {
    setArticlesList(
      articlesList.map(article => 
        article.slug === slug 
          ? { ...article, featured: !currentStatus } 
          : article
      )
    );
    
    toast({
      title: currentStatus ? "Article unfeatured" : "Article featured",
      description: currentStatus 
        ? "The article has been removed from featured articles" 
        : "The article will now appear in featured articles",
    });
  };

  const handleEdit = (slug: string) => {
    const article = articlesList.find(article => article.slug === slug);
    
    if (article) {
      setCurrentArticle(article);
      setEditedArticle({...article});
      setEditDialogOpen(true);
    }
  };

  const handleEditChange = (field: string, value: any) => {
    setEditedArticle(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveEdit = () => {
    // Update the article in the list
    setArticlesList(
      articlesList.map(article => 
        article.slug === editedArticle.slug 
          ? editedArticle
          : article
      )
    );
    
    setEditDialogOpen(false);
    
    toast({
      title: "Article updated",
      description: "The article has been successfully updated",
    });
  };

  const handlePreview = (slug: string) => {
    // In a real app, this would open the article in a new tab
    window.open(`/article/${slug}`, '_blank');
    
    toast({
      title: "Previewing article",
      description: "Opening article in new tab",
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-medium mb-6">Manage Articles</h2>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            />
          </div>
          
          <div>
            <select 
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Featured
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((article) => (
                  <tr key={article.slug} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {article.title.length > 50 ? article.title.substring(0, 50) + '...' : article.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="px-2 py-1 text-xs rounded-full bg-gray-100">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {article.author}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {article.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {article.featured ? (
                        <span className="text-green-600 flex items-center">
                          <Star className="h-4 w-4 mr-1 inline" />
                          Yes
                        </span>
                      ) : (
                        <span className="text-gray-400">
                          No
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end space-x-2">
                      <button 
                        className="text-blue-600 hover:text-blue-900 p-1"
                        onClick={() => handlePreview(article.slug)}
                        title="Preview article"
                      >
                        <BookOpen className="h-5 w-5" />
                      </button>
                      <button 
                        className="text-indigo-600 hover:text-indigo-900 p-1"
                        onClick={() => handleEdit(article.slug)}
                        title="Edit article"
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button 
                        className={article.featured ? "text-amber-400 hover:text-amber-600 p-1" : "text-gray-400 hover:text-gray-600 p-1"}
                        onClick={() => toggleFeatured(article.slug, article.featured)}
                        title={article.featured ? "Remove from featured" : "Add to featured"}
                      >
                        {article.featured ? <StarOff className="h-5 w-5" /> : <Star className="h-5 w-5" />}
                      </button>
                      <button 
                        className="text-red-600 hover:text-red-900 p-1"
                        onClick={() => handleDelete(article.slug)}
                        title="Delete article"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                    No articles found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-600">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Edit Article Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
            <DialogDescription>
              Make changes to the article. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          
          {editedArticle && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={editedArticle.title}
                  onChange={(e) => handleEditChange('title', e.target.value)}
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={editedArticle.excerpt}
                  onChange={(e) => handleEditChange('excerpt', e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="category">Category</Label>
                  <select
                    id="category"
                    value={editedArticle.category}
                    onChange={(e) => handleEditChange('category', e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {categories.filter(cat => cat !== 'All').map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    value={editedArticle.author}
                    onChange={(e) => handleEditChange('author', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={editedArticle.image}
                  onChange={(e) => handleEditChange('image', e.target.value)}
                />
                {editedArticle.image && (
                  <div className="mt-2 relative aspect-video bg-gray-100 rounded-md overflow-hidden">
                    <img 
                      src={editedArticle.image} 
                      alt={editedArticle.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editedArticle.featured}
                  onChange={(e) => handleEditChange('featured', e.target.checked)}
                  className="rounded border-gray-300 text-black focus:ring-black"
                />
                <Label htmlFor="featured">Featured Article</Label>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button type="button" onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminArticleList;
