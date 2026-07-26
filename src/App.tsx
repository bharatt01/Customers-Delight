import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Community from "./pages/Community";
import PrimeMembers from "./pages/PrimeMembers";
import DigitalPresence from "./pages/DigitalPresence";
import LoyaltySystems from "./pages/LoyaltySystems";
import NotFound from "./pages/NotFound";
import ScrollToTop from "./components/layout/ScrollToTop";
import BlogsPage from "./pages/superadmin/Blogs";
import BlogDetailPage from "./pages/BlogDetails";
import Login from "./pages/superadmin/Login";
import Dashboard from "./pages/superadmin/Dashboard";
import CreateBlog from "./pages/superadmin/CreateBlog";
import ProtectedRoute from "./components/ProtectedRoute";
import EditBlog from "./pages/superadmin/EditBlog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
      <ScrollToTop />
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/community" element={<Community />} />
            <Route path="/prime-members" element={<PrimeMembers />} />
            <Route path="/digital-presence" element={<DigitalPresence />} />
            <Route path="/loyalty-systems" element={<LoyaltySystems />} />
            
  <Route path="/latest-news" element={<BlogsPage />} />
        <Route path="/tech-trends/:slug" element={<BlogDetailPage />} />
        
        {/* Superadmin Auth */}
        <Route path="/superadmin/login" element={<Login />} />
        
        {/* Protected Superadmin Routes */}
        <Route
          path="/superadmin/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/create"
          element={
            <ProtectedRoute>
              <CreateBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/superadmin/edit/:id"
          element={
            <ProtectedRoute>
              <EditBlog />
            </ProtectedRoute>
          }
        />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
          
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
