
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info, ShieldAlert, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

const AboutBullyingPage = () => {
  return (
    <Layout>
      <div className="page-container bg-gradient-to-b from-mint-green/30 to-white">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Что такое буллинг</h1>
          <p className="text-center mb-10 text-gray-600 max-w-3xl mx-auto">
            Буллинг — это агрессивное и нежелательное поведение среди школьников и других групп, которое включает реальный или предполагаемый дисбаланс сил. Это поведение повторяется или имеет потенциал повторяться со временем.
          </p>

          {/* Types of Bullying Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Типы буллинга</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <ShieldAlert className="h-6 w-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Физический буллинг</h3>
                  <p className="text-gray-600">
                    Включает в себя удары, толчки, пинки, щипки, повреждение имущества и другие формы физического насилия.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                    <ShieldAlert className="h-6 w-6 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Психологический буллинг</h3>
                  <p className="text-gray-600">
                    Включает обзывания, насмешки, запугивание, изоляцию от группы, распространение слухов и другие формы эмоционального насилия.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="card-hover">
                <CardContent className="p-6">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                    <ShieldAlert className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Кибербуллинг</h3>
                  <p className="text-gray-600">
                    Происходит через электронные устройства и включает в себя отправку, публикацию или распространение негативного, вредоносного или ложного контента о ком-либо.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Signs of Bullying Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Признаки буллинга</h2>
            
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div>
                  <h3 className="text-xl font-bold mb-3">Как распознать жертву буллинга:</h3>
                  <ul className="space-y-2 list-disc pl-5 text-gray-700">
                    <li>Необъяснимые ранения или повреждения</li>
                    <li>Потерянные или поврежденные вещи, одежда или учебные материалы</li>
                    <li>Частые головные боли, боли в животе или симуляция болезни</li>
                    <li>Изменения в привычках питания</li>
                    <li>Трудности со сном или частые кошмары</li>
                    <li>Снижение успеваемости, потеря интереса к школе</li>
                    <li>Внезапная потеря друзей или избегание социальных ситуаций</li>
                    <li>Чувство беспомощности или снижение самооценки</li>
                    <li>Самоповреждающее поведение или разговоры о самоубийстве</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-3">Как распознать буллера:</h3>
                  <ul className="space-y-2 list-disc pl-5 text-gray-700">
                    <li>Участие в физических или словесных драках</li>
                    <li>Дружба с детьми, которые известны буллингом других</li>
                    <li>Растущая агрессивность</li>
                    <li>Частые наказания в школе</li>
                    <li>Наличие лишних денег или новых вещей без объяснения их происхождения</li>
                    <li>Обвинение других в своих проблемах</li>
                    <li>Отказ принимать ответственность за свои действия</li>
                    <li>Конкуренция и забота о своей репутации или популярности</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* What to Do Section */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Что делать, если вы столкнулись с буллингом</h2>
            
            <div className="bg-gradient-to-r from-pastel-blue/50 to-lavender/50 rounded-2xl shadow-md p-6 md:p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-3">Если вы жертва буллинга:</h3>
                  <ul className="space-y-2 list-disc pl-5 text-gray-700">
                    <li>Расскажите об этом взрослому, которому доверяете (родителю, учителю, школьному психологу)</li>
                    <li>Держитесь рядом с друзьями или взрослыми</li>
                    <li>Проявите уверенность — отвечайте буллеру спокойно и четко</li>
                    <li>Запишите все случаи буллинга с указанием дат, времени и мест</li>
                    <li>Если буллинг происходит в интернете, сохраните доказательства (скриншоты)</li>
                    <li>Не мстите — это может только ухудшить ситуацию</li>
                    <li>Помните: это не ваша вина и вы не одни</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-bold mb-3">Если вы стали свидетелем буллинга:</h3>
                  <ul className="space-y-2 list-disc pl-5 text-gray-700">
                    <li>Не поощряйте буллеров своим вниманием</li>
                    <li>Если это безопасно, встаньте на защиту жертвы</li>
                    <li>Предложите жертве уйти вместе с вами из ситуации</li>
                    <li>Расскажите об инциденте взрослому</li>
                    <li>Поддержите жертву — покажите, что вы на их стороне</li>
                    <li>Сообщите о буллинге анонимно через нашу форму или школьную администрацию</li>
                  </ul>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-xl font-bold mb-3">Если вы родитель:</h3>
                  <ul className="space-y-2 list-disc pl-5 text-gray-700">
                    <li>Внимательно слушайте своего ребенка</li>
                    <li>Скажите ребенку, что он не виноват и что вы его поддерживаете</li>
                    <li>Не советуйте "просто игнорировать" или "дать сдачи"</li>
                    <li>Свяжитесь со школой и расскажите о ситуации</li>
                    <li>Следите за поведением и эмоциональным состоянием ребенка</li>
                    <li>При необходимости обратитесь к психологу</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Emergency Contacts Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Экстренная помощь</h2>
            
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="bg-red-100 p-6">
                <div className="flex items-center gap-3">
                  <Info className="h-6 w-6 text-red-600" />
                  <h3 className="text-xl font-bold text-red-800">В случае непосредственной опасности</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-red-50 p-4 rounded-lg flex items-center gap-4">
                    <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-red-600" />
                    </div>
                    <div>
                      <p className="font-bold text-red-800">Экстренные службы</p>
                      <p className="text-3xl font-bold">112</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg flex items-center gap-4">
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-bold text-blue-800">Детский телефон доверия</p>
                      <p className="text-3xl font-bold">8 800 2000 122</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button className="bg-primary hover:bg-primary/80 text-white flex items-center gap-2">
                    Сообщить о буллинге
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default AboutBullyingPage;
