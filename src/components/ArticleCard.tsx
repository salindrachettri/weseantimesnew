
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image?: string;
  slug: string;
  featured?: boolean;
  delay?: number;
}

const ArticleCard = ({ 
  title, 
  excerpt, 
  category, 
  date, 
  author, 
  image, 
  slug,
  featured = false,
  delay = 0
}: ArticleCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={`group transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="block group-hover:opacity-95 transition-opacity">
        {image && (
          <Link to={`/article/${slug}`} className="block">
            <div className="aspect-[3/2] mb-4 overflow-hidden bg-gray-100">
              <img 
                src={image} 
                alt={title} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </Link>
        )}
        <div className={featured ? "mt-6" : "mt-3"}>
          <div className="flex items-center justify-between mb-2 text-sm">
            <Link 
              to={`/${category.toLowerCase()}`} 
              className="uppercase tracking-wider text-tiny font-sans font-semibold hover:text-gray-700 transition-colors"
            >
              {category}
            </Link>
            <span className="text-gray-500 text-tiny font-sans">{date}</span>
          </div>
          <h3 className={`${featured ? 'text-2xl' : 'text-xl'} font-medium leading-tight mb-2 transition-colors group-hover:text-gray-700`}>
            <Link to={`/article/${slug}`}>
              {title}
            </Link>
          </h3>
          <p className="text-gray-600 mb-2 line-clamp-2 leading-relaxed">{excerpt}</p>
          <span className="text-sm font-sans text-gray-500">By {author}</span>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
