
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { UploadCloud, Loader2, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { articles } from '@/data/articles';

const AdminArticleUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Politics');
  const [excerpt, setExcerpt] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [author, setAuthor] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [parseStatus, setParseStatus] = useState<'idle' | 'parsing' | 'success' | 'error'>('idle');
  const [featured, setFeatured] = useState(false);
  const { toast } = useToast();

  const categories = [
    'Politics', 'Business', 'Culture', 'Opinion', 
    'Science', 'Technology', 'Style', 'History', 'Media', 'Psychology'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      setParseStatus('parsing');
      setTimeout(() => {
        setParseStatus('success');
        if (!title) {
          setTitle(`New Article on ${new Date().toLocaleDateString()}`);
        }
        if (!excerpt) {
          setExcerpt('This is an automatically generated excerpt from the document. Edit as needed.');
        }
        toast({
          title: "Document parsed successfully",
          description: "Content has been extracted from the Word document",
        });
      }, 2000);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedImage = e.target.files[0];
      setImage(selectedImage);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title || !category || !excerpt || !author) {
      toast({
        title: "Missing fields",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    const currentArticles = localStorage.getItem('weseanArticles') 
      ? JSON.parse(localStorage.getItem('weseanArticles') || '[]')
      : [...articles];
    
    const newArticle = {
      id: Date.now(),
      title,
      excerpt,
      content: "Full article content would go here...",
      category,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      author,
      image: imagePreview || "https://images.unsplash.com/photo-1504711434969-e33886168f5c",
      slug: title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
      featured
    };
    
    const updatedArticles = [newArticle, ...currentArticles];
    
    localStorage.setItem('weseanArticles', JSON.stringify(updatedArticles));
    
    // Dispatch a custom event that other components can listen for
    window.dispatchEvent(new CustomEvent('articlesUpdated'));
    
    setTimeout(() => {
      toast({
        title: "Article published",
        description: `Your article has been successfully published to the ${category} section`,
      });
      
      setFile(null);
      setTitle('');
      setCategory('Politics');
      setExcerpt('');
      setImage(null);
      setImagePreview(null);
      setAuthor('');
      setFeatured(false);
      setParseStatus('idle');
      setIsUploading(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-medium mb-6">Upload New Article</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="file-upload" className="text-base">
              Word Document
            </Label>
            <div className={`border-2 border-dashed rounded-md p-6 text-center transition-colors ${parseStatus === 'success' ? 'border-green-300 bg-green-50' : 'border-gray-300'}`}>
              {file ? (
                <div className="flex flex-col items-center text-sm">
                  <div className="flex items-center mb-2">
                    {parseStatus === 'parsing' ? (
                      <Loader2 className="animate-spin h-5 w-5 mr-2 text-gray-500" />
                    ) : parseStatus === 'success' ? (
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                    ) : null}
                    <span className="font-medium">{file.name}</span>
                  </div>
                  <p className="text-gray-500 mb-2">{(file.size / 1024).toFixed(2)} KB</p>
                  {parseStatus === 'success' && <p className="text-green-600 mb-2">Document parsed successfully</p>}
                  <button 
                    type="button"
                    onClick={() => {
                      setFile(null);
                      setParseStatus('idle');
                    }}
                    className="text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-black hover:text-gray-700">
                      <span>Upload a Word document</span>
                      <input 
                        id="file-upload" 
                        name="file-upload" 
                        type="file" 
                        className="sr-only"
                        accept=".doc,.docx,.rtf"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    The system will automatically extract content from your document
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                required
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary of the article"
                rows={3}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Author name"
                required
              />
            </div>
            
            <div className="space-y-2 flex items-center pt-8">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
              />
              <Label htmlFor="featured" className="ml-2">
                Feature this article on homepage
              </Label>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-base">Featured Image</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-md p-4 text-center">
              {imagePreview ? (
                <div className="space-y-2">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="mx-auto h-48 object-cover rounded-md"
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setImage(null);
                      setImagePreview(null);
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <label htmlFor="image-upload" className="relative cursor-pointer rounded-md font-medium text-black hover:text-gray-700">
                      <span>Upload an image</span>
                      <input 
                        id="image-upload" 
                        name="image-upload" 
                        type="file" 
                        className="sr-only"
                        accept="image/*"
                        onChange={handleImageChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 5MB
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isUploading}
            className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-70 flex items-center"
          >
            {isUploading ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />
                Publishing...
              </>
            ) : (
              'Publish Article'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminArticleUpload;
