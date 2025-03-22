
import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ArticleCard from '@/components/ArticleCard';
import FeaturedArticle from '@/components/FeaturedArticle';
import NewsletterSignup from '@/components/NewsletterSignup';
import BreakingNews from '@/components/BreakingNews';
import HorizontalScroll from '@/components/HorizontalScroll';
import HotTags from '@/components/HotTags';
import { Separator } from '@/components/ui/separator';
import { 
  getLatestArticles, 
  getFeaturedArticles, 
  getArticlesByCategory 
} from '@/data/articles';

const Index = () => {
  // Use state to store articles so page can refresh with new data
  const [latestArticles, setLatestArticles] = useState(getLatestArticles(3));
  const [featuredArticle, setFeaturedArticle] = useState(getFeaturedArticles(1)[0]);
  const [opinionArticles, setOpinionArticles] = useState(getArticlesByCategory('Opinion', 2));
  const [editorsPicks, setEditorsPicks] = useState([
    ...getArticlesByCategory('Business', 1),
    ...getArticlesByCategory('Culture', 1),
    ...getArticlesByCategory('Science', 1),
  ]);

  // Breaking news data
  const breakingNews = [
    { id: '1', title: 'Global Leaders Gather for Climate Summit in Madrid', link: '/article/global-climate-summit' },
    { id: '2', title: 'Tech Giants Face New Antitrust Regulations in EU', link: '/article/tech-antitrust-eu' },
    { id: '3', title: 'Stock Market Hits Record High Amid Economic Recovery', link: '/article/stock-market-record' },
  ];

  // Hot tags - removed COVID-19 as requested
  const hotTags = ['Politics', 'Economy', 'Climate', 'Technology', 'Elections', 'Health'];

  // Refresh data when the component mounts and when localStorage changes
  useEffect(() => {
    // Function to refresh all article data
    const refreshArticleData = () => {
      setLatestArticles(getLatestArticles(3));
      setFeaturedArticle(getFeaturedArticles(1)[0]);
      setOpinionArticles(getArticlesByCategory('Opinion', 2));
      setEditorsPicks([
        ...getArticlesByCategory('Business', 1),
        ...getArticlesByCategory('Culture', 1),
        ...getArticlesByCategory('Science', 1),
      ]);
    };

    // Refresh data on mount
    refreshArticleData();

    // Set up storage event listener to refresh data when localStorage changes
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'weseanArticles') {
        refreshArticleData();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Smooth scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Breaking News Banner */}
      <BreakingNews news={breakingNews} />
      
      <main className="flex-1 pt-24">
        {/* Featured Article */}
        <section className="container mx-auto mb-20 px-4">
          {featuredArticle && (
            <FeaturedArticle 
              title={featuredArticle.title}
              excerpt={featuredArticle.excerpt}
              category={featuredArticle.category}
              date={featuredArticle.date}
              author={featuredArticle.author}
              image={featuredArticle.image}
              slug={featuredArticle.slug}
            />
          )}
        </section>
        
        <Separator className="max-w-5xl mx-auto mb-16" />
        
        {/* Hot Tags */}
        <section className="container mx-auto mb-10 px-4">
          <HotTags tags={hotTags} />
        </section>
        
        {/* Latest Articles - Horizontal Scroll */}
        <section className="container mx-auto mb-20 px-4">
          <HorizontalScroll title="Latest Articles" limit={6} />
        </section>
        
        {/* Featured Opinion */}
        <section className="bg-gray-50 py-16 mb-20">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-medium mb-8">Featured Opinion</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {opinionArticles.map((article, index) => (
                <ArticleCard 
                  key={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  category={article.category}
                  date={article.date}
                  author={article.author}
                  image={article.image}
                  slug={article.slug}
                  featured
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Politics - Horizontal Scroll */}
        <section className="container mx-auto mb-20 px-4">
          <HorizontalScroll title="Politics" category="Politics" limit={6} />
        </section>
        
        {/* Business - Horizontal Scroll */}
        <section className="container mx-auto mb-20 px-4">
          <HorizontalScroll title="Business" category="Business" limit={6} />
        </section>
        
        {/* Editor's Picks */}
        <section className="container mx-auto mb-20 px-4">
          <h2 className="text-2xl font-medium mb-8">Editor's Picks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {editorsPicks.map((article, index) => (
              <ArticleCard 
                key={article.slug}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
                date={article.date}
                author={article.author}
                image={article.image}
                slug={article.slug}
                delay={index * 100}
              />
            ))}
          </div>
        </section>
        
        {/* Newsletter Signup */}
        <NewsletterSignup />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;