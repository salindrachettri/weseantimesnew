
import { Link } from 'react-router-dom';
import { Tag } from 'lucide-react';

interface HotTagsProps {
  tags: string[];
}

const HotTags = ({ tags }: HotTagsProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Tag size={18} className="mr-2" />
        <h3 className="text-lg font-medium">Hot Tags</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Link 
            key={tag} 
            to={`/${tag.toLowerCase()}`}
            className="inline-block px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HotTags;
