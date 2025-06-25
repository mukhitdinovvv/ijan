
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="bg-white rounded-xl shadow-lg p-5 mb-4 w-72 animate-slide-up border border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-bold text-lg text-blue-600">ИИ Чат</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsOpen(false)}
              className="h-7 w-7 hover:bg-blue-50 text-gray-500 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-5">
            Здравствуйте! Чем могу помочь?
          </p>
          <Link 
            to="/ai-assistant"
            className="bg-blue-500 text-white px-4 py-3 rounded-xl text-sm font-medium block text-center transition-all hover:shadow-lg hover:-translate-y-1 shadow-md"
          >
            Начать разговор
          </Link>
        </div>
      )}
      
      <Button 
        className="rounded-full h-16 w-16 shadow-md bg-blue-500 hover:bg-blue-600 hover:-translate-y-1 transition-all flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-7 w-7" />
        ) : (
          <MessageCircle className="h-7 w-7" />
        )}
        <span className="absolute h-3 w-3 bg-green-500 rounded-full top-2 right-2 animate-pulse"></span>
      </Button>
    </div>
  );
};

export default FloatingChatButton;
