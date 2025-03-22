import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would perform a search
    console.log("Searching for:", searchQuery);
    setSearchOpen(false);
    setSearchQuery("");
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-white"
      }`}>
      <div className="container mx-auto">
        <div className="flex items-center justify-between py-6 px-4">
          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 -ml-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu">
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          {/* Logo */}
          <div className="text-left flex-shrink-0">
            <Link to="/" className="inline-block">
              <h1 className="text-2xl font-medium tracking-tight">
                The Wesean Times
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">
              Home
            </Link>
            <Link
              to="/politics"
              className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">
              Politics
            </Link>
            <Link
              to="/business"
              className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">
              Business
            </Link>
            <Link
              to="/culture"
              className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">
              Culture
            </Link>
            <Link
              to="/opinion"
              className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors">
              Opinion
            </Link>
            <div className="relative group">
              <button className="text-sm uppercase tracking-widest hover:text-gray-500 transition-colors flex items-center">
                More <ChevronDown size={14} className="ml-1" />
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-sm py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <Link
                  to="/science"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                  Science
                </Link>
                <Link
                  to="/technology"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                  Technology
                </Link>
                <Link
                  to="/style"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                  Style
                </Link>
                <Link
                  to="/history"
                  className="block px-4 py-2 text-sm hover:bg-gray-100 transition-colors">
                  History
                </Link>
              </div>
            </div>
          </nav>

          {/* Search button */}
          <button
            className="p-2 mr-2 md:mr-0"
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search">
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-24 px-6 animate-fade-in md:hidden">
          <nav className="flex flex-col">
            <Link
              to="/"
              className="py-4 border-b border-gray-100 text-lg uppercase tracking-widest">
              Home
            </Link>
            <Link
              to="/politics"
              className="py-4 border-b border-gray-100 text-lg uppercase tracking-widest">
              Politics
            </Link>
            <Link
              to="/business"
              className="py-4 border-b border-gray-100 text-lg uppercase tracking-widest">
              Business
            </Link>
            <Link
              to="/culture"
              className="py-4 border-b border-gray-100 text-lg uppercase tracking-widest">
              Culture
            </Link>
            <Link
              to="/opinion"
              className="py-4 border-b border-gray-100 text-lg uppercase tracking-widest">
              Opinion
            </Link>
            <Link
              to="/science"
              className="py-4 border-b border-gray-100 text-lg uppercase tracking-widest">
              Science
            </Link>
            <Link
              to="/technology"
              className="py-4 border-b border-gray-100 text-lg uppercase tracking-widest">
              Technology
            </Link>
            <Link
              to="/style"
              className="py-4 border-b border-gray-100 text-lg uppercase tracking-widest">
              Style
            </Link>
            <Link
              to="/history"
              className="py-4 border-b border-gray-100 text-lg uppercase tracking-widest">
              History
            </Link>

            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-wider font-sans font-semibold mb-4">
                Company
              </h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-black transition-colors">
                  About
                </Link>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-black transition-colors">
                  Contact
                </Link>
                <Link
                  to="/careers"
                  className="text-gray-600 hover:text-black transition-colors">
                  Careers
                </Link>
                <Link
                  to="/subscribe"
                  className="text-gray-600 hover:text-black transition-colors">
                  Subscribe
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}

      {/* Search modal */}
      {searchOpen && (
        <div className="fixed inset-0 bg-white/98 z-40 flex items-start justify-center pt-36 px-6 animate-fade-in">
          <div className="w-full max-w-2xl">
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setSearchOpen(false)}
                aria-label="Close search">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full border-b-2 border-black py-3 px-2 text-xl outline-none bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                aria-label="Submit search">
                <Search size={24} />
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
