
import { useState, useEffect, useRef } from 'react';
import { Bell, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BreakingNewsProps {
  news: Array<{
    id: string;
    title: string;
    link: string;
  }>;
}

const BreakingNews = ({ news }: BreakingNewsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll through breaking news items
  useEffect(() => {
    if (news.length <= 1) return;
    
    const intervalId = setInterval(() => {
      setActiveIndex((current) => (current + 1) % news.length);
    }, 5000);
    
    return () => clearInterval(intervalId);
  }, [news.length]);

  // Scroll to position when activeIndex changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: activeIndex * scrollRef.current.clientWidth,
        behavior: 'smooth',
      });
    }
  }, [activeIndex]);

  const handleManualScroll = (index: number) => {
    setActiveIndex(index);
  };

  if (news.length === 0) return null;

  return (
    <div className="bg-black text-white py-3 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex items-center mr-4 text-red-500 whitespace-nowrap">
            <Bell size={16} className="mr-2" />
            <span className="text-sm font-medium uppercase tracking-wider">Breaking News</span>
          </div>
          
          <div className="relative flex-1 overflow-hidden" style={{ maxWidth: 'calc(100% - 200px)' }}>
            <div 
              ref={scrollRef}
              className="flex overflow-x-hidden snap-x"
            >
              {news.map((item) => (
                <Link 
                  key={item.id}
                  to={item.link}
                  className="w-full flex-shrink-0 snap-center text-sm md:text-base font-medium truncate px-2"
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex ml-4 space-x-1">
            {news.map((_, index) => (
              <button 
                key={index} 
                className={`w-2 h-2 rounded-full ${index === activeIndex ? 'bg-white' : 'bg-gray-600'}`}
                onClick={() => handleManualScroll(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreakingNews;
