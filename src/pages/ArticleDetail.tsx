
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Separator } from '@/components/ui/separator';
import { articles } from '@/data/articles';
import ArticleCard from '@/components/ArticleCard';
import { ArrowLeft } from 'lucide-react';

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [relatedArticles, setRelatedArticles] = useState<any[]>([]);

  useEffect(() => {
    // Smooth scroll to top when component mounts
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Find the current article and related articles
    const currentArticle = articles.find(a => a.slug === slug);
    if (currentArticle) {
      setArticle(currentArticle);
      
      // Get related articles from the same category
      const related = articles
        .filter(a => a.category === currentArticle.category && a.slug !== slug)
        .slice(0, 3);
      setRelatedArticles(related);
    }
  }, [slug]);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-28 container mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-2xl font-medium mb-4">Article not found</h1>
            <Link 
              to="/"
              className="inline-flex items-center border-b border-black pb-1 transition-all hover:pb-2"
            >
              <ArrowLeft size={18} className="mr-2" />
              Return to home
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-28">
        <article className="container mx-auto px-4 max-w-4xl">
          {/* Article header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4 text-sm">
              <span className="uppercase tracking-wider text-tiny font-sans font-semibold">{article.category}</span>
              <span className="text-gray-500 text-tiny font-sans">{article.date}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-medium mb-6 leading-tight">
              {article.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">{article.excerpt}</p>
            <span className="text-sm font-sans text-gray-500">By {article.author}</span>
          </div>
          
          {/* Featured image */}
          {article.image && (
            <div className="mb-10">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-gray-500 mt-2 italic">Photo: Unsplash</p>
            </div>
          )}
          
          {/* Article content */}
          <div className="prose prose-lg max-w-none">
            <p>As traditional media faces unprecedented challenges, innovative approaches to storytelling and distribution are reshaping how we consume news and information in society.</p>
            
            <p>The landscape of journalism has undergone a radical transformation in recent years. With the rise of digital platforms, social media, and changing consumer behaviors, traditional news outlets have had to adapt rapidly or face obsolescence.</p>
            
            <h2>The Digital Revolution</h2>
            
            <p>Digital technology has democratized information creation and distribution, allowing anyone with an internet connection to become a content creator. This shift has led to a proliferation of news sources and perspectives, challenging the traditional gatekeeping role of established media organizations.</p>
            
            <p>"We're witnessing a fundamental restructuring of the media ecosystem," says Dr. Maya Johnson, professor of digital journalism at Columbia University. "The monopoly that legacy media once held over information flow has been permanently disrupted."</p>
            
            <p>This disruption has brought both opportunities and challenges. On one hand, voices that might have been marginalized in traditional media can now find platforms and audiences. On the other, the sheer volume of content has made it increasingly difficult for consumers to distinguish between reliable reporting and misinformation.</p>
            
            <h2>Economic Pressures</h2>
            
            <p>The business model that sustained journalism throughout the 20th century—primarily advertising revenue—has collapsed in the digital age. Classified advertising, once a reliable revenue stream for newspapers, has largely migrated to specialized online platforms.</p>
            
            <p>Display advertising has similarly shifted to digital platforms, with the majority of digital ad revenue now captured by tech giants like Google and Meta. This has left many news organizations struggling to find sustainable business models.</p>
            
            <p>Subscription models have emerged as one potential solution, with publications like The New York Times and The Washington Post finding success with digital subscriptions. However, this approach raises concerns about creating information inequalities, where quality journalism becomes accessible only to those willing and able to pay.</p>
            
            <h2>Innovation in Storytelling</h2>
            
            <p>Despite these challenges, journalism continues to evolve and innovate. New formats such as interactive data visualizations, immersive multimedia presentations, podcasts, and newsletters have expanded the storytelling toolkit available to journalists.</p>
            
            <p>These innovations have enabled news organizations to connect with audiences in more engaging and personalized ways. They've also created opportunities for specialized journalism that serves specific communities of interest—from local news initiatives to topic-focused publications.</p>
            
            <h2>The Future Landscape</h2>
            
            <p>As we look ahead, several trends appear likely to shape the future of journalism:</p>
            
            <ul>
              <li>Increasing collaboration between news organizations to tackle complex investigative projects</li>
              <li>Greater emphasis on transparency in reporting processes</li>
              <li>Integration of artificial intelligence in news gathering and production</li>
              <li>Continued experimentation with revenue models beyond advertising</li>
              <li>Renewed focus on building direct relationships with audiences</li>
            </ul>
            
            <p>"The organizations that will thrive are those that can build genuine community around their journalism," predicts Carlos Mendez, founder of the digital news startup NewsForward. "It's no longer about scale alone—it's about depth of engagement."</p>
            
            <p>While the path forward remains challenging, there are reasons for optimism. The fundamental need for reliable information, accountability reporting, and thoughtful analysis remains as vital as ever to democratic societies. The forms may change, but the essential functions of journalism continue to evolve in response to our changing world.</p>
          </div>
        </article>
        
        <Separator className="max-w-4xl mx-auto my-16" />
        
        {/* Related articles */}
        {relatedArticles.length > 0 && (
          <section className="container mx-auto px-4 mb-20">
            <h2 className="text-2xl font-medium mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedArticles.map((article, index) => (
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
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default ArticleDetail;
