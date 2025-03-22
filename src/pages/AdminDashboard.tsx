
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FilePlus, LogOut, FileText, Settings, Menu, X, Info } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import AdminArticleUpload from '@/components/AdminArticleUpload';
import AdminArticleList from '@/components/AdminArticleList';
import AdminSettings from '@/components/AdminSettings';

type Tab = 'upload' | 'list' | 'settings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>('upload');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showWelcome, setShowWelcome] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Check if admin is authenticated
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    if (!isAuthenticated) {
      navigate('/admin');
      toast({
        title: "Authentication required",
        description: "Please log in to access the admin dashboard",
        variant: "destructive",
      });
    }
    
    // Check if this is the first visit
    const hasVisitedBefore = localStorage.getItem('adminDashboardVisited');
    if (hasVisitedBefore) {
      setShowWelcome(false);
    }

    // Handle hash routing for GitHub Pages compatibility
    const hash = location.hash.replace('#', '');
    if (hash === 'upload' || hash === 'list' || hash === 'settings') {
      setActiveTab(hash as Tab);
    }
  }, [navigate, toast, location]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    // Update URL hash for GitHub Pages compatibility
    window.location.hash = tab;
  };

  const handleDismissWelcome = () => {
    setShowWelcome(false);
    localStorage.setItem('adminDashboardVisited', 'true');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Mobile header */}
      <div className="lg:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <h1 className="text-xl font-medium">Admin Dashboard</h1>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)} 
          className="p-2 rounded-md hover:bg-gray-100"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out flex flex-col`}>
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-medium">The Wesean Times</h1>
            <p className="text-sm text-gray-500">Admin Portal</p>
          </div>
          
          <nav className="flex-1 p-4 space-y-1">
            <button
              onClick={() => handleTabChange('upload')}
              className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${activeTab === 'upload' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <FilePlus className="mr-3 h-5 w-5" />
              Upload New Article
            </button>
            <button
              onClick={() => handleTabChange('list')}
              className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${activeTab === 'list' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <FileText className="mr-3 h-5 w-5" />
              Manage Articles
            </button>
            <button
              onClick={() => handleTabChange('settings')}
              className={`w-full flex items-center px-4 py-3 text-sm rounded-md ${activeTab === 'settings' ? 'bg-gray-100 text-black' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </button>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 text-sm text-red-600 rounded-md hover:bg-red-50"
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </button>
          </div>
        </aside>
        
        {/* Main content */}
        <main className="flex-1 overflow-auto p-6 transition-all duration-300">
          {showWelcome && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Welcome to the Admin Dashboard</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>This dashboard allows you to manage content for The Wesean Times website. Here you can:</p>
                    <ul className="list-disc list-inside mt-1 space-y-1">
                      <li>Upload new articles from Word documents</li>
                      <li>Manage existing articles (edit, delete, feature)</li>
                      <li>Update site settings</li>
                    </ul>
                    <p className="mt-2">All changes made here will be immediately reflected on the public website.</p>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="ml-auto flex-shrink-0 text-blue-500 hover:text-blue-700"
                  onClick={handleDismissWelcome}
                >
                  <span className="sr-only">Dismiss</span>
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'upload' && <AdminArticleUpload />}
          {activeTab === 'list' && <AdminArticleList />}
          {activeTab === 'settings' && <AdminSettings />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
