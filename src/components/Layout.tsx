import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingChatButton from './FloatingChatButton';
import { ShieldCheck } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <FloatingChatButton />
        
        {/* Admin Panel Link with new design */}
        {/*
        <Link 
          to="/admin" 
          className="fixed bottom-4 left-4 bg-blue-500 text-white p-3 rounded-full shadow-md transition-all hover:scale-105"
          title="Панель администратора"
        >
          <ShieldCheck className="h-5 w-5" />
        </Link>
        */}
      </div>
    </div>
  );
};

export default Layout;
