
// This simulates an API or database that would store article information
// Default articles data
const defaultArticles = [
  {
    id: 1,
    title: "The Evolving Landscape of Modern Journalism in the Digital Age",
    excerpt: "As traditional media faces unprecedented challenges, innovative approaches to storytelling and distribution are reshaping how we consume news and information in society.",
    content: "Full article content would go here...",
    category: "Media",
    date: "April 12, 2023",
    author: "Emma Richardson",
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1170",
    slug: "evolving-landscape-modern-journalism",
    featured: true
  },
  {
    id: 2,
    title: "Economic Policies Shift as Global Markets Respond to New Regulations",
    excerpt: "Financial experts analyze the implications of recent regulatory changes on international trade and investment strategies.",
    content: "Full article content would go here...",
    category: "Business",
    date: "April 10, 2023",
    author: "Michael Chen",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1115",
    slug: "economic-policies-shift",
    featured: false
  },
  {
    id: 3,
    title: "Cultural Renaissance: How Art Movements Are Reflecting Social Change",
    excerpt: "From galleries to street art, creative expressions are increasingly becoming platforms for commentary on contemporary issues.",
    content: "Full article content would go here...",
    category: "Culture",
    date: "April 8, 2023",
    author: "Sophia Williams",
    image: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?q=80&w=1170",
    slug: "cultural-renaissance-art-movements",
    featured: false
  },
  {
    id: 4,
    title: "Technology Pioneers Address Ethical Challenges in AI Development",
    excerpt: "Leading researchers and industry leaders convene to establish frameworks for responsible artificial intelligence advancement.",
    content: "Full article content would go here...",
    category: "Technology",
    date: "April 7, 2023",
    author: "James Rodriguez",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=765",
    slug: "technology-pioneers-ethical-challenges",
    featured: false
  },
  {
    id: 5,
    title: "Democracy's Resilience in an Age of Information Warfare",
    excerpt: "As disinformation campaigns become more sophisticated, democratic institutions face crucial tests of their adaptability and strength.",
    content: "Full article content would go here...",
    category: "Opinion",
    date: "April 6, 2023",
    author: "Jonathan Harper",
    image: "https://images.unsplash.com/photo-1569281731124-eb3a9350b19e?q=80&w=687",
    slug: "democracy-resilience-information-warfare",
    featured: true
  },
  {
    id: 6,
    title: "Reconsidering Urban Planning for Post-Pandemic Communities",
    excerpt: "The pandemic has forced us to rethink our relationship with public spaces, commuting, and community design for healthier cities.",
    content: "Full article content would go here...",
    category: "Opinion",
    date: "April 5, 2023",
    author: "Alexandra Miller",
    image: "https://images.unsplash.com/photo-1519999482648-25049ddd37b1?q=80&w=1152",
    slug: "reconsidering-urban-planning-post-pandemic",
    featured: true
  },
  {
    id: 7,
    title: "The Rise of Sustainable Fashion in Luxury Markets",
    excerpt: "High-end brands are increasingly embracing environmental responsibility in their supply chains and design processes.",
    content: "Full article content would go here...",
    category: "Style",
    date: "April 4, 2023",
    author: "Claire Johnson",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1074",
    slug: "sustainable-fashion-luxury-markets",
    featured: false
  },
  {
    id: 8,
    title: "New Research Challenges Understanding of Deep Ocean Ecosystems",
    excerpt: "Marine biologists document unexpected species interactions in previously unexplored abyssal habitats.",
    content: "Full article content would go here...",
    category: "Science",
    date: "April 3, 2023",
    author: "Robert Thompson",
    image: "https://images.unsplash.com/photo-1551244072-5d12893278ab?q=80&w=1035",
    slug: "research-challenges-deep-ocean-ecosystems",
    featured: false
  },
  {
    id: 9,
    title: "Historical Analysis Reveals Forgotten Influences on Modern Governance",
    excerpt: "Scholars uncover overlooked connections between ancient political structures and contemporary democratic systems.",
    content: "Full article content would go here...",
    category: "History",
    date: "April 2, 2023",
    author: "Emily Patterson",
    image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?q=80&w=1171",
    slug: "historical-analysis-governance",
    featured: false
  },
  {
    id: 10,
    title: "The Psychology Behind Decision-Making in Crisis Situations",
    excerpt: "Researchers identify critical factors that shape leadership choices under extreme pressure and uncertainty.",
    content: "Full article content would go here...",
    category: "Psychology",
    date: "April 1, 2023",
    author: "Daniel Martinez",
    image: "https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?q=80&w=1073",
    slug: "psychology-decision-making-crisis",
    featured: false
  },
  // Politics articles
  {
    id: 11,
    title: "New Legislation Aims to Address Climate Change Through Economic Incentives",
    excerpt: "Lawmakers introduce a comprehensive bill that would create tax benefits for clean energy adoption and sustainable business practices.",
    content: "Full article content would go here...",
    category: "Politics",
    date: "March 30, 2023",
    author: "Richard Walker",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1074",
    slug: "legislation-climate-change-economic-incentives",
    featured: false
  },
  {
    id: 12,
    title: "International Summit Focuses on Diplomatic Solutions to Regional Conflicts",
    excerpt: "World leaders gather to discuss multilateral approaches to resolving ongoing tensions in key geopolitical hotspots.",
    content: "Full article content would go here...",
    category: "Politics",
    date: "March 28, 2023",
    author: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?q=80&w=1170",
    slug: "international-summit-diplomatic-solutions",
    featured: false
  },
  {
    id: 13,
    title: "Local Elections Show Shifting Priorities Among Suburban Voters",
    excerpt: "Recent polling indicates changing demographic patterns and issue concerns in traditionally predictable voting districts.",
    content: "Full article content would go here...",
    category: "Politics",
    date: "March 26, 2023",
    author: "Thomas Nelson",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=1170",
    slug: "local-elections-suburban-voters",
    featured: false
  },
  {
    id: 14,
    title: "Supreme Court Decision Redefines Regulatory Authority Boundaries",
    excerpt: "Recent ruling has significant implications for federal agency powers and business compliance requirements.",
    content: "Full article content would go here...",
    category: "Politics",
    date: "March 24, 2023",
    author: "Jennifer Adams",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1170",
    slug: "supreme-court-regulatory-authority",
    featured: false
  },
  // Business articles
  {
    id: 15,
    title: "Tech Startups Focus on Sustainable Solutions for Manufacturing Sector",
    excerpt: "Venture capital increasingly flows toward innovations that promise to reduce industrial environmental impact while improving efficiency.",
    content: "Full article content would go here...",
    category: "Business",
    date: "March 22, 2023",
    author: "Kevin Zhang",
    image: "https://images.unsplash.com/photo-1664575602276-acd073f104c1?q=80&w=1170",
    slug: "tech-startups-sustainable-manufacturing",
    featured: false
  },
  {
    id: 16,
    title: "Retail Industry Navigates Supply Chain Disruptions with New Strategies",
    excerpt: "Major brands implement innovative inventory management and sourcing approaches to mitigate ongoing logistical challenges.",
    content: "Full article content would go here...",
    category: "Business",
    date: "March 20, 2023",
    author: "Melissa Rodriguez",
    image: "https://images.unsplash.com/photo-1481487196290-c152efe083f5?q=80&w=1162",
    slug: "retail-supply-chain-disruptions",
    featured: false
  },
  {
    id: 17,
    title: "Financial Markets Respond to Central Bank Policy Announcements",
    excerpt: "Investors recalibrate expectations following statements on interest rates and quantitative easing measures.",
    content: "Full article content would go here...",
    category: "Business",
    date: "March 18, 2023",
    author: "David Goldberg",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1170",
    slug: "financial-markets-central-bank-policy",
    featured: false
  },
  // Culture articles
  {
    id: 18,
    title: "Independent Filmmakers Embrace New Distribution Models",
    excerpt: "Digital platforms open up unprecedented opportunities for creators outside the traditional studio system.",
    content: "Full article content would go here...",
    category: "Culture",
    date: "March 16, 2023",
    author: "Lauren Soto",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1159",
    slug: "independent-filmmakers-distribution-models",
    featured: false
  },
  {
    id: 19,
    title: "Literary Festival Celebrates Diverse Voices in Contemporary Fiction",
    excerpt: "Annual event showcases emerging authors exploring themes of identity, technology, and global interconnection.",
    content: "Full article content would go here...",
    category: "Culture",
    date: "March 14, 2023",
    author: "Mark Johnson",
    image: "https://images.unsplash.com/photo-1519682577862-22b62b24e493?q=80&w=1170",
    slug: "literary-festival-diverse-voices",
    featured: false
  },
  {
    id: 20,
    title: "Virtual Reality Installations Push Boundaries of Immersive Art",
    excerpt: "Museums and galleries incorporate cutting-edge technology to create powerful multi-sensory experiences.",
    content: "Full article content would go here...",
    category: "Culture",
    date: "March 12, 2023",
    author: "Nina Patel",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1028",
    slug: "virtual-reality-immersive-art",
    featured: false
  }
];

// Get articles from localStorage if available, otherwise use default
const getArticlesData = () => {
  const savedArticles = localStorage.getItem('weseanArticles');
  if (savedArticles) {
    try {
      return JSON.parse(savedArticles);
    } catch (e) {
      console.error("Error parsing saved articles:", e);
      return defaultArticles;
    }
  }
  return defaultArticles;
};

// Export articles dynamically from localStorage or defaults
export const articles = getArticlesData();

export const getLatestArticles = (count = 6) => {
  // Make sure we're getting the latest data
  const currentArticles = getArticlesData();
  return [...currentArticles].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  }).slice(0, count);
};

export const getFeaturedArticles = (count = 5) => {
  // Make sure we're getting the latest data
  const currentArticles = getArticlesData();
  return currentArticles.filter(article => article.featured).slice(0, count);
};

export const getArticlesByCategory = (category: string, count = 4) => {
  // Make sure we're getting the latest data and logging for debugging
  const currentArticles = getArticlesData();
  console.log(`Getting articles for category: ${category}, found ${currentArticles.length} total articles`);
  
  // Case-insensitive comparison for category names
  const filteredArticles = currentArticles.filter(article => 
    article.category.toLowerCase() === category.toLowerCase()
  );
  
  console.log(`Found ${filteredArticles.length} articles for category: ${category}`);
  
  // If count is 0, return all articles, otherwise limit to the specified count
  return count > 0 ? filteredArticles.slice(0, count) : filteredArticles;
};
