import { createBrowserRouter, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { AdminLayout } from '@/pages/admin/layout/AdminLayout';
import { LoginPage } from '@/pages/admin/LoginPage';
import { DashboardPage } from '@/pages/admin/DashboardPage';
import { RequestsPage } from '@/pages/admin/RequestsPage';
import { AnalyticsPage } from '@/pages/admin/AnalyticsPage';
import { ReportsPage } from '@/pages/admin/ReportsPage';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/admin/login" replace />;
};

export const adminRouter = createBrowserRouter([
  {
    path: '/admin',
    element: (
      <AuthProvider>
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'requests',
        element: <RequestsPage />,
      },
      {
        path: 'analytics',
        element: <AnalyticsPage />,
      },
      {
        path: 'reports',
        element: <ReportsPage />,
      },
      {
        path: '',
        element: <Navigate to="/admin/dashboard" replace />,
      },
    ],
  },
  {
    path: '/admin/login',
    element: (
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    ),
  },
]);
