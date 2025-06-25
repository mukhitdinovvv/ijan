
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Check, Lock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import { submitBullyingReport } from '@/services/airtableService';

const ReportBullyingPage = () => {
  const [formData, setFormData] = useState({
    schoolName: '',
    bullyingType: '',
    description: '',
    victimName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const form = useForm();
  
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Submit data to AirTable
      await submitBullyingReport(formData);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Сообщение отправлено",
        description: "Спасибо за вашу информацию. Мы рассмотрим её как можно скорее.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      setIsSubmitting(false);
      toast({
        title: "Ошибка отправки",
        description: "Произошла ошибка при отправке данных. Пожалуйста, попробуйте снова.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  const resetForm = () => {
    setFormData({
      schoolName: '',
      bullyingType: '',
      description: '',
      victimName: ''
    });
    setIsSubmitted(false);
  };
  
  return (
    <Layout>
      <div className="page-container bg-gradient-to-b from-pastel-blue/30 to-white">
        <div className="container-narrow">
          <h1 className="text-3xl font-bold mb-6 text-center">Сообщить о буллинге</h1>
          <p className="text-center mb-8 text-gray-600">
            Если вы или кто-то из ваших знакомых столкнулся с буллингом, заполните эту форму. Вся информация останется конфиденциальной.
          </p>
          
          {!isSubmitted ? (
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8">
              <div className="flex items-center justify-center gap-2 mb-6 p-2 bg-lavender/50 rounded-md">
                <Lock className="h-5 w-5 text-primary" />
                <span className="text-sm">Ваша информация останется конфиденциальной.</span>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="schoolName">Название школы или организации</Label>
                    <Input
                      id="schoolName"
                      value={formData.schoolName}
                      onChange={(e) => handleChange('schoolName', e.target.value)}
                      placeholder="Введите название школы или организации"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bullyingType">Тип буллинга</Label>
                    <Select
                      value={formData.bullyingType}
                      onValueChange={(value) => handleChange('bullyingType', value)}
                    >
                      <SelectTrigger id="bullyingType">
                        <SelectValue placeholder="Выберите тип буллинга" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="physical">Физический</SelectItem>
                        <SelectItem value="psychological">Психологический</SelectItem>
                        <SelectItem value="cyberbullying">Кибербуллинг</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Подробности</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                      placeholder="Опишите ситуацию как можно подробнее"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="victimName">
                      Имя жертвы (необязательно)
                    </Label>
                    <Input
                      id="victimName"
                      value={formData.victimName}
                      onChange={(e) => handleChange('victimName', e.target.value)}
                      placeholder="Введите имя жертвы (если хотите)"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Вы можете оставить это поле пустым, если хотите.
                    </p>
                  </div>
                  
                  <div className="pt-2">
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary/80 text-white py-6"
                      disabled={isSubmitting || !formData.schoolName || !formData.bullyingType || !formData.description}
                    >
                      {isSubmitting ? 'Отправка...' : 'Сообщить анонимно'}
                    </Button>
                  </div>
                </div>
              </form>
              
              <div className="mt-8 flex items-center gap-2 border-t border-gray-100 pt-4">
                <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  Если вы находитесь в непосредственной опасности, пожалуйста, немедленно обратитесь в службу экстренной помощи по номеру <strong>112</strong>.
                </p>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-md p-6 md:p-8 text-center">
              <div className="mb-6 flex flex-col items-center">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold">Спасибо за вашу информацию</h2>
                <p className="text-gray-600 mt-2">
                  Ваше сообщение было отправлено анонимно. Наша команда рассмотрит его в ближайшее время.
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <p className="text-blue-700">
                  Мы относимся к каждому случаю буллинга очень серьезно. Если ситуация требует немедленного вмешательства, мы свяжемся с соответствующими органами.
                </p>
              </div>
              
              <Button onClick={resetForm} className="bg-primary hover:bg-primary/80 text-white">
                Отправить новое сообщение
              </Button>
            </div>
          )}
          
          <div className="mt-8 bg-mint-green/30 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-3">Что происходит после отправки сообщения?</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Наша команда рассматривает все поступившие сообщения.</li>
              <li>Мы связываемся с администрацией указанного учреждения (без раскрытия личности отправителя).</li>
              <li>Совместно с учреждением разрабатывается план действий для решения ситуации.</li>
              <li>При необходимости привлекаются психологи и другие специалисты.</li>
            </ol>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ReportBullyingPage;
