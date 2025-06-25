import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import Index from "./pages/Index";
import AIAssistant from "./pages/AIAssistant";
import PsychologicalTests from "./pages/PsychologicalTests";
import ReportBullying from "./pages/ReportBullying";
import AboutBullying from "./pages/AboutBullying";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { MaterialsPage } from "./pages/MaterialsPage";
import ArticlePage from "./pages/ArticlePage";
import MediaPage from "./pages/MediaPage";
import ArticleDetailPage from './pages/ArticleDetailPage';
import { LoginPage } from "./pages/admin/LoginPage";
import { AdminLayout } from "./pages/admin/layout/AdminLayout";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { RequestsPage } from "./pages/admin/RequestsPage";
import { AnalyticsPage } from "./pages/admin/AnalyticsPage";
import { ReportsPage } from "./pages/admin/ReportsPage";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/ai-assistant" element={<AIAssistant />} />
            <Route path="/tests" element={<PsychologicalTests />} />
            <Route path="/report-bullying" element={<ReportBullying />} />
            <Route path="/about-bullying" element={<AboutBullying />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/media/:id" element={<MediaPage />} />
            <Route path="/resources/article/:articleId" element={<ArticleDetailPage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/materials" element={<MaterialsPage />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<LoginPage />} />
            <Route
              path="/admin/*"
              element={
                <ProtectedRoute>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="requests" element={<RequestsPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route index element={<Navigate to="dashboard" replace />} />
            </Route>
            
            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
