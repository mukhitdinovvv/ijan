
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/components/ui/use-toast';
import { User, Mail, Phone, Calendar, Clock, Check, Shield } from 'lucide-react';
import Layout from '@/components/Layout';
import { submitContactRequest } from '@/services/airtableService';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    contactPreference: 'email',
    consultationType: '',
    message: '',
    preferredDate: '',
    preferredTime: '',
    consentToTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { toast } = useToast();
  const form = useForm();
  
  const handleChange = (field: string, value: any) => {
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
      await submitContactRequest(formData);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast({
        title: "Запрос отправлен",
        description: "Спасибо за запрос. Мы скоро свяжемся с вами.",
        duration: 5000,
      });
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      setIsSubmitting(false);
      toast({
        title: "Ошибка отправки",
        description: "Произошла ошибка. Пожалуйста, попробуйте снова.",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  return (
    <Layout>
      <div className="page-container bg-lavender/10">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">Связаться с психологом</h1>
          <p className="text-center mb-8 text-gray-600 max-w-2xl mx-auto">
            Заполните форму для консультации у профессионального психолога
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold mb-6 text-primary">Контакты</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary p-3 rounded-full text-white">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Телефон</p>
                      <p className="font-medium">+7 (707) 640-186</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-primary p-3 rounded-full text-white">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">психолог@dushevny-pomoshnik.ru</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="bg-primary p-3 rounded-full text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Часы работы</p>
                      <p className="font-medium">Пн-Пт: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-medium mb-4">Наши специалисты</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-lavender/10 transition-colors">
                      <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">Айсулу Нуржанова</p>
                        <p className="text-sm text-gray-500">Клинический психолог</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-lavender/10 transition-colors">
                      <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">Арман Казбеков</p>
                        <p className="text-sm text-gray-500">Психолог-консультант</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-lavender/10 transition-colors">
                      <div className="h-12 w-12 bg-primary rounded-full flex items-center justify-center text-white">
                        <User className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-medium">Жанар Абишева</p>
                        <p className="text-sm text-gray-500">Детский психолог</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              {!isSubmitted ? (
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8 border border-gray-100">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Имя *</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                          <Input
                            id="name"
                            className="pl-10 bg-white border-primary/20 focus:border-primary"
                            value={formData.name}
                            onChange={(e) => handleChange('name', e.target.value)}
                            placeholder="Ваше имя"
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                          <Input
                            id="email"
                            className="pl-10 bg-white border-primary/20 focus:border-primary"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleChange('email', e.target.value)}
                            placeholder="email@example.com"
                            required
                          />
                        </div>
                      </div>
                      
                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Телефон</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                          <Input
                            id="phone"
                            className="pl-10 bg-white border-primary/20 focus:border-primary"
                            value={formData.phone}
                            onChange={(e) => handleChange('phone', e.target.value)}
                            placeholder="+7 (___) ___-____"
                          />
                        </div>
                      </div>
                      
                      {/* Consultation Type */}
                      <div className="space-y-2">
                        <Label htmlFor="consultationType">Тип консультации *</Label>
                        <Select
                          value={formData.consultationType}
                          onValueChange={(value) => handleChange('consultationType', value)}
                          required
                        >
                          <SelectTrigger id="consultationType" className="bg-white border-primary/20">
                            <SelectValue placeholder="Выберите тип" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="individual">Индивидуальная</SelectItem>
                            <SelectItem value="group">Групповая</SelectItem>
                            <SelectItem value="family">Семейная</SelectItem>
                            <SelectItem value="child">Для ребенка</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      {/* Preferred Date */}
                      <div className="space-y-2">
                        <Label htmlFor="preferredDate">Дата</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                          <Input
                            id="preferredDate"
                            className="pl-10 bg-white border-primary/20 focus:border-primary"
                            type="date"
                            value={formData.preferredDate}
                            onChange={(e) => handleChange('preferredDate', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      {/* Preferred Time */}
                      <div className="space-y-2">
                        <Label htmlFor="preferredTime">Время</Label>
                        <div className="relative">
                          <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-primary h-5 w-5" />
                          <Input
                            id="preferredTime"
                            className="pl-10 bg-white border-primary/20 focus:border-primary"
                            type="time"
                            value={formData.preferredTime}
                            onChange={(e) => handleChange('preferredTime', e.target.value)}
                          />
                        </div>
                      </div>
                      
                      {/* Message */}
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="message">Сообщение *</Label>
                        <Textarea
                          id="message"
                          placeholder="Опишите вашу проблему"
                          rows={4}
                          className="bg-white border-primary/20 focus:border-primary"
                          value={formData.message}
                          onChange={(e) => handleChange('message', e.target.value)}
                          required
                        />
                      </div>
                      
                      {/* Consent */}
                      <div className="md:col-span-2">
                        <div className="flex items-start space-x-3 bg-lavender/10 p-3 rounded-lg">
                          <Checkbox
                            id="terms"
                            checked={formData.consentToTerms}
                            onCheckedChange={(checked) => handleChange('consentToTerms', checked)}
                            required
                            className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <div className="grid gap-1.5 leading-none">
                            <Label
                              htmlFor="terms"
                              className="text-sm text-gray-700 font-normal"
                            >
                              Я согласен на обработку персональных данных
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary/90 text-white py-6 rounded-xl shadow-md"
                        disabled={isSubmitting || !formData.name || !formData.email || !formData.consultationType || !formData.message || !formData.consentToTerms}
                      >
                        {isSubmitting ? 'Отправка...' : 'Запросить консультацию'}
                      </Button>
                    </div>
                  </form>
                  
                  <div className="mt-6 flex items-center gap-2 p-3 bg-blue-50 rounded-md">
                    <Shield className="h-5 w-5 text-primary flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      Вся информация защищена и не будет передана третьим лицам.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-md p-6 md:p-8 text-center border border-gray-100">
                  <div className="mb-6 flex flex-col items-center">
                    <div className="h-20 w-20 bg-green-500 rounded-full flex items-center justify-center mb-4 text-white">
                      <Check className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold">Спасибо за запрос!</h2>
                    <p className="text-gray-600 mt-2">
                      Мы получили вашу заявку и скоро свяжемся с вами.
                    </p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg mb-6 text-left">
                    <h3 className="font-medium text-primary mb-2">Что дальше?</h3>
                    <ol className="list-decimal list-inside space-y-1 text-gray-700 text-sm">
                      <li>Специалист свяжется с вами в течение 24 часов</li>
                      <li>Вы выберете удобное время для консультации</li>
                      <li>Получите инструкции для подключения</li>
                    </ol>
                  </div>
                  
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-primary hover:bg-primary/90 text-white"
                  >
                    Отправить новый запрос
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ContactPage;
