import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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

import ProtectedRoute from "./components/ProtectedRoute";

   import ShopForm from "./pages/superadmin/ShopForm";
import BlogForm from "./pages/superadmin/BlogForm";
import ShopPage from "./pages/shop/ShopPage";
import WhatsAppRedirect from "./pages/WhatsAppRedirect";

// Shop owner auth + analytics — login only, no self-serve signup
import OwnerLoginPage from "./pages/Ownerloginpage";
import OwnerDashboardPage from "./pages/Ownerdashboardpage";

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
            <Route path="/shops/:slug" element={<ShopPage />} />
  <Route path="/latest-news" element={<BlogsPage />} />
        <Route path="/tech-trends/:slug" element={<BlogDetailPage />} />
        
<Route path="/r/:slug/whatsapp" element={<WhatsAppRedirect />} />

{/* Shop owner login + dashboard — dashboard gates itself via useOwnerShop,
    matching the signed-in user's email against shops.ownerEmail. */}
<Route path="/owner/login" element={<OwnerLoginPage />} />
<Route path="/owner/dashboard" element={<OwnerDashboardPage />} />

<Route
  path="/superadmin/shops/create"
  element={
    <ProtectedRoute>
      <ShopForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/superadmin/shops/edit/:id"
  element={
    <ProtectedRoute>
      <ShopForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/superadmin/blogs/create"
  element={
    <ProtectedRoute>
      <BlogForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/superadmin/blogs/edit/:id"
  element={
    <ProtectedRoute>
      <BlogForm />
    </ProtectedRoute>
  }
/>
<Route path="/superadmin" element={<Navigate to="/superadmin/dashboard" replace />} />
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
      
      
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
          
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;