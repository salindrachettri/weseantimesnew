
import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ArticleCard from '@/components/ArticleCard';
import { articles } from '@/data/articles';

interface HorizontalScrollProps {
  title: string;
  category?: string;
  limit?: number;
}

const HorizontalScroll = ({ title, category, limit = 6 }: HorizontalScrollProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Get articles based on category or featured flag
  const filteredArticles = category
    ? articles.filter(article => article.category === category).slice(0, limit)
    : articles.slice(0, limit);

  // Check if scroll arrows should be visible
  const checkScrollPosition = () => {
    const element = scrollRef.current;
    if (!element) return;

    const { scrollLeft, scrollWidth, clientWidth } = element;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10); // 10px buffer
  };

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      element.addEventListener('scroll', checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }
    
    return () => {
      if (element) {
        element.removeEventListener('scroll', checkScrollPosition);
      }
    };
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    const element = scrollRef.current;
    if (!element) return;
    
    const scrollAmount = element.clientWidth * 0.75;
    const newScrollLeft = direction === 'left' 
      ? element.scrollLeft - scrollAmount 
      : element.scrollLeft + scrollAmount;
    
    element.scrollTo({
      left: newScrollLeft,
      behavior: 'smooth'
    });
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-medium">{title}</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => scroll('left')}
            className={`p-2 rounded-full border border-gray-300 ${
              showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity`}
            aria-label="Scroll left"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            onClick={() => scroll('right')}
            className={`p-2 rounded-full border border-gray-300 ${
              showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'
            } transition-opacity`}
            aria-label="Scroll right"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-auto pb-6 scrollbar-hide snap-x scroll-smooth gap-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {filteredArticles.map((article, index) => (
          <div 
            key={article.slug} 
            className="flex-none w-[280px] md:w-[330px] snap-start"
          >
            <ArticleCard 
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              date={article.date}
              author={article.author}
              image={article.image}
              slug={article.slug}
              delay={index * 100}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorizontalScroll;
