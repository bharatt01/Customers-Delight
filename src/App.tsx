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
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
          
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
