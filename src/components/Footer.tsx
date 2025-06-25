
import { Link } from 'react-router-dom';
import { Heart, Mail, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="animate-slide-up">
            <h3 className="font-bold text-xl mb-4 text-blue-600">Душевный помощник</h3>
            <p className="text-sm text-gray-700">
              Платформа поддержки против буллинга
            </p>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h3 className="font-bold text-xl mb-4 text-blue-600">Разделы</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              <li><Link to="/ai-assistant" className="hover:text-blue-600 transition-colors">ИИ чат</Link></li>
              <li><Link to="/tests" className="hover:text-blue-600 transition-colors">Тесты</Link></li>
              <li><Link to="/report-bullying" className="hover:text-blue-600 transition-colors">Буллинг</Link></li>
              <li><Link to="/about-bullying" className="hover:text-blue-600 transition-colors">Помощь</Link></li>
              <li><Link to="/resources" className="hover:text-blue-600 transition-colors">Материалы</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 transition-colors">Связаться</Link></li>
            </ul>
          </div>

          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="font-bold text-xl mb-4 text-blue-600">Контакты</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors group">
                <div className="bg-blue-100 group-hover:bg-blue-600 p-2 rounded-md group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+7 (707) 640-186</span>
              </div>
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/50 transition-colors group">
                <div className="bg-blue-100 group-hover:bg-blue-600 p-2 rounded-md group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span>info@dushevny-pomoshnik.ru</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200 text-center text-sm text-gray-600">
          <p className="flex items-center justify-center gap-2">
            Создано с <Heart className="w-4 h-4 text-red-500 animate-pulse" /> для оказания помощи
          </p>
          <p className="mt-2">© 2025 Душевный помощник. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
