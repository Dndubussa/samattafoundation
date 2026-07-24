import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import RouteErrorBoundary from "@/components/layout/RouteErrorBoundary";
import RouteTransition from "@/components/layout/RouteTransition";
import { Skeleton } from "@/components/ui/skeleton";
import { queryClient } from "@/lib/query-client";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Programs = lazy(() => import("./pages/Programs"));
const Contact = lazy(() => import("./pages/Contact"));
const Volunteer = lazy(() => import("./pages/Volunteer"));
const Apply = lazy(() => import("./pages/Apply"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Donate = lazy(() => import("./pages/Donate"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

const PageLoader = () => (
  <div
    className="min-h-screen flex flex-col items-center justify-center gap-8"
    style={{
      background:
        "linear-gradient(135deg, hsl(230 78% 10%) 0%, hsl(230 78% 16%) 55%, hsl(205 70% 20%) 100%)",
    }}
  >
    {/* Spinning ring */}
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 rounded-full border-2 border-white/10" />
      <div
        className="absolute inset-0 rounded-full border-2 border-transparent border-t-amber-400"
        style={{ animation: "spin 1s linear infinite" }}
      />
      {/* Inner pulsing dot */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-amber-400 opacity-80 animate-pulse" />
      </div>
    </div>

    {/* Wordmark */}
    <div className="flex flex-col items-center gap-2">
      <p className="text-white font-heading font-black text-base tracking-widest uppercase">
        Samatta Foundation
      </p>
      <span className="text-white/40 text-[0.68rem] uppercase tracking-[0.35em]">Loading...</span>
    </div>

    {/* Progress bar */}
    <div className="w-40 h-0.5 rounded-full bg-white/10 overflow-hidden">
      <div
        className="h-full rounded-full bg-amber-400/70"
        style={{ animation: "progressPulse 1.5s ease-in-out infinite" }}
      />
    </div>

    <style>{`
      @keyframes progressPulse {
        0% { width: 15%; }
        50% { width: 75%; }
        100% { width: 15%; }
      }
    `}</style>
  </div>
);


const App = () => (
  <QueryClientProvider client={queryClient}>
    <HelmetProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Analytics />
          <Navbar />
          <RouteErrorBoundary>
            <RouteTransition>
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/programs" element={<Programs />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/volunteer" element={<Volunteer />} />
                  <Route path="/apply" element={<Apply />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/donate" element={<Donate />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </RouteTransition>
          </RouteErrorBoundary>
          <Footer />
        </BrowserRouter>
      </TooltipProvider>
    </HelmetProvider>
  </QueryClientProvider>
);

export default App;
