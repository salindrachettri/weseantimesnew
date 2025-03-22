import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/components/ui/use-toast';
import { StorageAPI } from '@/utils/storageAPI';
import { Loader2 } from 'lucide-react';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const [categoryArticles, setCategoryArticles] = useState<any[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Function to load category articles
  const loadCategoryArticles = async () => {
    if (category) {
      setIsLoading(true);
      try {
        const allArticles = await StorageAPI.getArticles();
        const filteredArticles = allArticles.filter(
          (article: any) => article.category.toLowerCase() === category.toLowerCase()
        );
        setCategoryArticles(filteredArticles);
        
        // Generate sample articles if none exist for this category
        if (filteredArticles.length === 0) {
          createSampleArticles();
        }
      } catch (error) {
        console.error("Error loading articles:", error);
        toast({
          title: "Error loading articles",
          description: "There was a problem loading the articles. Please try again later.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Function to create sample articles
  const createSampleArticles = async () => {
    if (!category || !categoryName) return;
    
    toast({
      title: "Adding sample content",
      description: `Creating sample articles for the ${categoryName} section`,
    });
    
    // Create sample article(s) for this category
    try {
      const currentArticles = await StorageAPI.getArticles();
      const sampleArticles = [
        {
          id: Date.now(),
          title: `Latest Developments in ${categoryName}`,
          excerpt: `Stay informed about the most recent events and trends in the world of ${categoryName}.`,
          content: `This is a sample article for the ${categoryName} category. Edit it in the admin dashboard to customize the content.`,
          category: categoryName,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          author: "Editorial Team",
          image: `https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1170`,
          slug: `latest-developments-in-${category?.toLowerCase()}-${Date.now()}`,
          featured: false
        },
        {
          id: Date.now() + 1,
          title: `${categoryName} Analysis: Looking Ahead`,
          excerpt: `Our experts provide in-depth analysis on what to expect in the ${categoryName} sector in the coming months.`,
          content: `This is another sample article for the ${categoryName} category. Edit it in the admin dashboard to customize the content.`,
          category: categoryName,
          date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
          author: "Analysis Team",
          image: `https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1159`,
          slug: `${category?.toLowerCase()}-analysis-looking-ahead-${Date.now()}`,
          featured: false
        }
      ];
      
      // Add the sample articles to storage
      const updatedArticles = [...currentArticles, ...sampleArticles];
      await StorageAPI.saveArticles(updatedArticles);
      
      // Update the current view
      setCategoryArticles(sampleArticles);
    } catch (error) {
      console.error("Error creating sample articles:", error);
      toast({
        title: "Error creating sample content",
        description: "There was a problem creating sample articles.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Format the category name for display
    if (category) {
      setCategoryName(category.charAt(0).toUpperCase() + category.slice(1));
      
      // Load articles for this category
      loadCategoryArticles();
      
      // Listen for changes to articles
      const cleanup = StorageAPI.listenForChanges(() => {
        loadCategoryArticles();
      });
      
      // Clean up
      return cleanup;
    }
  }, [category]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28">
        <section className="container mx-auto mb-8 px-4">
          <h1 className="text-3xl md:text-4xl font-medium mb-2">{categoryName}</h1>
          <p className="text-gray-600 mb-6">The latest news and analysis on {categoryName.toLowerCase()}</p>
          <Separator className="mb-8" />
          
          {isLoading ? (
            <div className="text-center py-16">
              <Loader2 className="h-8 w-8 mx-auto animate-spin text-gray-400 mb-4" />
              <p className="text-gray-500">Loading articles...</p>
            </div>
          ) : categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryArticles.map((article, index) => (
                <ArticleCard 
                  key={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  date={article.date}
                  author={article.author}
                  image={article.image}
                  slug={article.slug}
                  delay={index % 3 * 100}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <p className="text-gray-500 mb-4">No articles found for this category.</p>
              <p className="text-sm text-gray-400">
                Admin users can add articles through the <a href="/admin" className="text-blue-500 hover:underline">admin dashboard</a>
              </p>
            </div>
          )}
        </section>

        <section className="container mx-auto mb-16 px-4">
          <h2 className="text-2xl font-medium mb-6">About {categoryName}</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-700 mb-4">
              The {categoryName} section of The Wesean Times brings you the most important stories, analysis, and perspectives on {categoryName.toLowerCase()}-related issues that matter to our readers.
            </p>
            <p className="text-gray-700">
              Our team of experienced journalists and experts are dedicated to providing in-depth coverage that goes beyond headlines to help you understand the implications of events and developments in the world of {categoryName.toLowerCase()}.
            </p>
          </div>
        </section>
        
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default CategoryPage;
