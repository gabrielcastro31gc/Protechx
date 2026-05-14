import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import TrackingScripts from "./components/TrackingScripts";
import PageTracker from "./components/PageTracker";

const Planos = lazy(() => import("./pages/Planos"));
const QuemAtendemos = lazy(() => import("./pages/QuemAtendemos"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const DashboardPage = lazy(() => import("./pages/admin/DashboardPage"));
const CmsPage = lazy(() => import("./pages/admin/CmsPage"));
const FormsPage = lazy(() => import("./pages/admin/FormsPage"));
const AnalyticsPage = lazy(() => import("./pages/admin/AnalyticsPage"));
const TagsPage = lazy(() => import("./pages/admin/TagsPage"));
const SettingsPage = lazy(() => import("./pages/admin/SettingsPage"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <TrackingScripts />
          <PageTracker />
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/planos" element={<Planos />} />
              <Route path="/quem-atendemos" element={<QuemAtendemos />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="cms" element={<CmsPage />} />
                <Route path="forms" element={<FormsPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="tags" element={<TagsPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
