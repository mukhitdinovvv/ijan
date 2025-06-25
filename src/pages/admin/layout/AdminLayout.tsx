import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, AlertCircle, BarChart, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';

export const AdminLayout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const navItems = [
    {
      name: 'Обзор',
      icon: LayoutDashboard,
      href: '/admin/dashboard',
    },
    {
      name: 'Запросы',
      icon: AlertCircle,
      href: '/admin/requests',
    },
    {
      name: 'Анализ',
      icon: BarChart,
      href: '/admin/analytics',
    },
    {
      name: 'Отчеты',
      icon: Users,
      href: '/admin/reports',
    },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-primary">iJAN Admin</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                'flex items-center px-6 py-3 text-gray-600 hover:bg-gray-50',
                location.pathname === item.href && 'bg-gray-50 text-primary border-r-4 border-primary'
              )}
            >
              <item.icon className="w-5 h-5 mr-3" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Выйти
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white shadow-sm z-10">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {navItems.find(item => location.pathname.startsWith(item.href))?.name || 'Панель управления'}
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {new Date().toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
