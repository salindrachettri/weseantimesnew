
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

interface FeaturedArticleProps {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  image: string;
  slug: string;
}

const FeaturedArticle = ({ 
  title, 
  excerpt, 
  category, 
  date, 
  author, 
  image, 
  slug 
}: FeaturedArticleProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const articleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1
      }
    );

    if (articleRef.current) {
      observer.observe(articleRef.current);
    }

    return () => {
      if (articleRef.current) {
        observer.unobserve(articleRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={articleRef} 
      className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="md:order-2">
        <div className="aspect-[4/3] overflow-hidden bg-gray-100">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            loading="lazy"
          />
        </div>
      </div>
      <div className="md:order-1 flex flex-col justify-center">
        <div className="flex items-center justify-between mb-4 text-sm">
          <Link to={`/${category.toLowerCase()}`} className="uppercase tracking-wider text-tiny font-sans font-semibold hover:text-gray-700 transition-colors">
            {category}
          </Link>
          <span className="text-gray-500 text-tiny font-sans">{date}</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-medium mb-4 leading-tight">
          <Link to={`/article/${slug}`} className="hover:text-gray-700 transition-colors">
            {title}
          </Link>
        </h2>
        <p className="text-gray-600 mb-4 leading-relaxed">{excerpt}</p>
        <span className="text-sm font-sans text-gray-500 mb-6">By {author}</span>
        <Link 
          to={`/article/${slug}`} 
          className="inline-block border-b border-black pb-1 transition-all hover:pb-2"
        >
          Read Article
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArticle;
