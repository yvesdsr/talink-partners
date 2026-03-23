import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";

const Entreprise = lazy(() => import("./pages/Entreprise"));
const Particuliers = lazy(() => import("./pages/Particuliers"));
const Offres = lazy(() => import("./pages/Offres"));
const APropos = lazy(() => import("./pages/APropos"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Postuler = lazy(() => import("./pages/Postuler"));
const Admin = lazy(() => import("./pages/Admin"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/entreprise" element={<Entreprise />} />
              <Route path="/particuliers" element={<Particuliers />} />
              <Route path="/offres" element={<Offres />} />
              <Route path="/a-propos" element={<APropos />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/postuler" element={<Postuler />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
