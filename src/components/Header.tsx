
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  MessageCircle, Brain, Flag, BookOpen, 
  FileText, Phone, Menu, X 
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-600 shadow-lg sticky top-0 z-50 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-white p-2 rounded-full group-hover:scale-110 transition-all">
              <Brain className="text-blue-600 h-6 w-6" />
            </div>
            <span className="font-bold text-xl text-white">Душевный помощник</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-5">
            <Link to="/ai-assistant" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
              <MessageCircle className="w-5 h-5" />
              <span>ИИ чат</span>
            </Link>
            <Link to="/tests" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
              <Brain className="w-5 h-5" />
              <span>Тесты</span>
            </Link>
            <Link to="/report-bullying" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
              <Flag className="w-5 h-5" />
              <span>Буллинг</span>
            </Link>
            <Link to="/about-bullying" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
              <BookOpen className="w-5 h-5" />
              <span>Помощь</span>
            </Link>
            <Link to="/resources" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10">
              <FileText className="w-5 h-5" />
              <span>Материалы</span>
            </Link>
            <Link to="/contact" className="flex items-center gap-2 bg-white text-blue-600 font-medium px-4 py-2 rounded-full shadow-md hover:bg-opacity-90 transition-all">
              <Phone className="w-4 h-4" />
              <span>Связаться</span>
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
              className="text-white hover:bg-white/20"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-2 pb-4 animate-slide-up bg-blue-700 rounded-xl p-3">
            <Link 
              to="/ai-assistant" 
              className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/20 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span>ИИ чат</span>
            </Link>
            <Link 
              to="/tests" 
              className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/20 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <Brain className="w-5 h-5 text-white" />
              <span>Тесты</span>
            </Link>
            <Link 
              to="/report-bullying" 
              className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/20 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <Flag className="w-5 h-5 text-white" />
              <span>Буллинг</span>
            </Link>
            <Link 
              to="/about-bullying" 
              className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/20 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <BookOpen className="w-5 h-5 text-white" />
              <span>Помощь</span>
            </Link>
            <Link 
              to="/resources" 
              className="flex items-center gap-2 p-3 rounded-xl hover:bg-white/20 transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              <FileText className="w-5 h-5 text-white" />
              <span>Материалы</span>
            </Link>
            <Link 
              to="/contact" 
              className="flex items-center gap-2 mt-2 bg-white text-blue-600 font-medium p-3 rounded-xl transition-all text-center justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              <Phone className="w-4 h-4" />
              <span>Связаться с психологом</span>
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
