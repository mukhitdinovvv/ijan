import { Link } from 'react-router-dom';
import { Brain, MessageCircle, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const motivationalQuotes = [
  "Самое важное — это верить в себя.",
  "Каждый новый день — это новая возможность.",
  "Ты сильнее, чем ты думаешь.",
  "Забота о себе — это не эгоизм.",
  "Не бойся просить о помощи."
];

const HomePage = () => {
  const randomQuote = motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-blue-500 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5" />
        <div className="container mx-auto px-4 text-center relative">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-8 text-white">
              Добро пожаловать в Душевный помощник
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto mb-12">
              Безопасная онлайн-платформа для психологической поддержки и борьбы с буллингом
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link to="/tests">
                <Button 
                  className="group bg-white/90 hover:bg-white text-blue-600 text-lg px-8 py-6 rounded-2xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-white/50"
                  size="lg"
                >
                  <Brain className="mr-2 h-5 w-5 group-hover:animate-bounce text-blue-600" />
                  Пройти психологический тест
                </Button>
              </Link>
              <Link to="/ai-assistant">
                <Button 
                  className="group bg-white/90 hover:bg-white text-blue-600 text-lg px-8 py-6 rounded-2xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl border border-white/50"
                  size="lg"
                >
                  <MessageCircle className="mr-2 h-5 w-5 group-hover:animate-pulse text-blue-600" />
                  Поговорить с ИИ помощником
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Banner */}
      <section className="relative py-16 bg-blue-500/10">
        <div className="container mx-auto px-4">
          <div className="bg-white/20 rounded-3xl p-8 shadow-lg border border-white/10">
            <blockquote className="text-2xl md:text-3xl italic font-medium text-white text-center">
              <Sparkles className="inline-block h-8 w-8 text-blue-400 mb-4 animate-pulse" />
              <p>"{randomQuote}"</p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-blue-600">
            Наши сервисы
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-white/5 rounded-2xl shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/10">
              <div className="mb-6 bg-white/10 p-4 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-600">ИИ Помощник</h3>
              <p className="text-gray-300 mb-6">
                Поговорите с нашим ИИ помощником, который поможет вам разобраться в своих чувствах.
              </p>
              <Link to="/ai-assistant" className="inline-flex items-center text-blue-400 font-medium hover:underline group-hover:translate-x-2 transition-transform">
                Подробнее <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="group bg-white/5 rounded-2xl shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/10">
              <div className="mb-6 bg-white/10 p-4 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
                <Brain className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-600">Психологические тесты</h3>
              <p className="text-gray-300 mb-6">
                Пройдите наши научно-обоснованные психологические тесты, чтобы лучше понять себя.
              </p>
              <Link to="/tests" className="inline-flex items-center text-blue-400 font-medium hover:underline group-hover:translate-x-2 transition-transform">
                Подробнее <span className="ml-2">→</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="group bg-white/5 rounded-2xl shadow-md p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-white/10">
              <div className="mb-6 bg-white/10 p-4 rounded-2xl inline-block group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-blue-600">Поддержка специалистов</h3>
              <p className="text-gray-300 mb-6">
                Получите консультацию профессионального психолога, который поможет вам в сложной ситуации.
              </p>
              <Link to="/contact" className="inline-flex items-center text-blue-400 font-medium hover:underline group-hover:translate-x-2 transition-transform">
                Подробнее <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-blue-500/50">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-white/20 rounded-3xl p-12 shadow-lg border border-white/10">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-blue-600">
              Нуждаетесь в помощи прямо сейчас?
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
              Если вы или кто-то из ваших знакомых столкнулся с буллингом, не оставайтесь в одиночестве. Сообщите нам об этом, и мы поможем.
            </p>
            <Link to="/report-bullying">
              <Button className="bg-blue-600/90 hover:bg-blue-600 text-white text-lg px-10 py-6 rounded-2xl font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                Сообщить о буллинге
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
