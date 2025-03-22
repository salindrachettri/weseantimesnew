
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-3 lg:col-span-2">
            <h2 className="text-xl font-medium mb-4">The Wesean Times</h2>
            <p className="text-gray-400 mb-6 max-w-md">
              Dedicated to delivering truthful and insightful reporting on stories that matter
              around the globe. Our mission is to empower readers through quality journalism.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 font-sans font-semibold">Sections</h3>
            <ul className="space-y-2">
              <li><Link to="/politics" className="text-gray-400 hover:text-white transition-colors">Politics</Link></li>
              <li><Link to="/business" className="text-gray-400 hover:text-white transition-colors">Business</Link></li>
              <li><Link to="/culture" className="text-gray-400 hover:text-white transition-colors">Culture</Link></li>
              <li><Link to="/opinion" className="text-gray-400 hover:text-white transition-colors">Opinion</Link></li>
              <li><Link to="/science" className="text-gray-400 hover:text-white transition-colors">Science</Link></li>
              <li><Link to="/technology" className="text-gray-400 hover:text-white transition-colors">Technology</Link></li>
              <li><Link to="/style" className="text-gray-400 hover:text-white transition-colors">Style</Link></li>
              <li><Link to="/history" className="text-gray-400 hover:text-white transition-colors">History</Link></li>
              <li><Link to="/media" className="text-gray-400 hover:text-white transition-colors">Media</Link></li>
              <li><Link to="/psychology" className="text-gray-400 hover:text-white transition-colors">Psychology</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 font-sans font-semibold">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/advertise" className="text-gray-400 hover:text-white transition-colors">Advertise</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-white transition-colors">Our Team</Link></li>
              <li><Link to="/ethics" className="text-gray-400 hover:text-white transition-colors">Ethics Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-wider mb-4 font-sans font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</Link></li>
              <li><Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">Accessibility</Link></li>
              <li><Link to="/copyright" className="text-gray-400 hover:text-white transition-colors">Copyright</Link></li>
              <li><Link to="/licensing" className="text-gray-400 hover:text-white transition-colors">Licensing</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} The Wesean Times. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <Link to="/admin" className="text-gray-500 text-sm hover:text-white transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
