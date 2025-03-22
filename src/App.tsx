import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ArticleDetail from "./pages/ArticleDetail";
import CategoryPage from "./pages/CategoryPage";
import NotFound from "./pages/NotFound";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Pages */}
          <Route path="/" element={<Index />} />
          <Route path="/article/:slug" element={<ArticleDetail />} />
          <Route path="/politics" element={<CategoryPage />} />
          <Route path="/business" element={<CategoryPage />} />
          <Route path="/culture" element={<CategoryPage />} />
          <Route path="/opinion" element={<CategoryPage />} />
          <Route path="/science" element={<CategoryPage />} />
          <Route path="/technology" element={<CategoryPage />} />
          <Route path="/style" element={<CategoryPage />} />
          <Route path="/history" element={<CategoryPage />} />
          <Route path="/media" element={<CategoryPage />} />
          <Route path="/psychology" element={<CategoryPage />} />
          <Route path="/:category" element={<CategoryPage />} />
          
          {/* Legal Pages */}
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          
          {/* Admin Pages */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/github-callback" element={<AdminLogin />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
