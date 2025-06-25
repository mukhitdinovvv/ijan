
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  Brain, 
  ChevronRight, 
  Award, 
  BarChart, 
  Clock, 
  CheckCircle 
} from 'lucide-react';
import Layout from '@/components/Layout';

interface Question {
  id: number;
  text: string;
  options: string[];
}

interface Test {
  id: number;
  title: string;
  description: string;
  questions: Question[];
  duration: string;
  difficulty: 'Легкая' | 'Средняя' | 'Сложная';
  icon: JSX.Element;
}

const PsychologicalTests = () => {
  const getRecommendations = (testId: number, answers: Record<number, string>) => {
    const answerValues: Record<string, number> = {
      "Никогда": 0,
      "Очень легко": 0,
      "Определенно да": 0,
      "Спокойно принимаю": 0,
      "Определенно нет": 4,
      "Почти всегда": 3,
      "Очень сложно": 4,
      "Агрессивно защищаюсь": 4,
      "Иногда": 1,
      "Довольно легко": 1,
      "Скорее да": 1,
      "Стараюсь объяснить свою точку зрения": 1,
      "Часто": 2,
      "С некоторым трудом": 2,
      "Скорее нет": 2,
      "Обижаюсь": 2,
      "Редко": 1
    };

    // Рассчитываем общий балл
    const score = Object.values(answers).reduce((sum, answer) => {
      return sum + (answerValues[answer] || 0);
    }, 0);

    const maxScore = selectedTest?.questions.length * 4 || 1; // Максимально возможный балл
    const percentage = (score / maxScore) * 100;

    // Определяем уровень результата
    let resultLevel: 'low' | 'medium' | 'high';
    let resultText = '';
    
    if (percentage <= 33) {
      resultLevel = 'low';
      resultText = 'Низкий уровень';
    } else if (percentage <= 66) {
      resultLevel = 'medium';
      resultText = 'Средний уровень';
    } else {
      resultLevel = 'high';
      resultText = 'Высокий уровень';
    }

    // Рекомендации для каждого уровня
    const recommendations = {
      low: {
        title: 'Отличный результат!',
        description: 'Ваши показатели находятся в пределах нормы. Вы демонстрируете хороший уровень эмоционального благополучия.',
        tips: [
          'Продолжайте практиковать осознанность и самоконтроль',
          'Поддерживайте здоровый баланс работы и отдыха',
          'Делитесь позитивным настроем с окружающими'
        ]
      },
      medium: {
        title: 'Есть над чем поработать',
        description: 'Обнаружены некоторые аспекты, требующие внимания. Рекомендуем обратить на них особое внимание.',
        tips: [
          'Практикуйте техники релаксации 10-15 минут в день',
          'Ведите дневник эмоций для лучшего самопонимания',
          'Находите время для занятий, которые приносят вам радость'
        ]
      },
      high: {
        title: 'Рекомендуется консультация специалиста',
        description: 'Ваши ответы указывают на необходимость профессиональной поддержки. Рекомендуем обратиться к специалисту.',
        tips: [
          'Запишитесь на консультацию к психологу',
          'Практикуйте техники самопомощи ежедневно',
          'Не стесняйтесь обращаться за поддержкой к близким'
        ]
      }
    };

    return {
      ...recommendations[resultLevel],
      resultLevel,
      resultText,
      score,
      maxScore,
      percentage: Math.round(percentage)
    };
  };

  const renderTestResult = () => {
    console.log('Render test result - testCompleted:', testCompleted);
    console.log('Selected test:', selectedTest);
    if (!selectedTest) return null;
    
    // Force show results for testing
    // const forceTestCompleted = true;

    const result = getRecommendations(selectedTest.id, answers);
    const resultColor = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-red-600'
    }[result.resultLevel];

    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
        <div className="text-center mb-8">
          <CheckCircle className={`h-16 w-16 mx-auto mb-4 ${resultColor}`} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Тест завершен!</h2>
          <p className="text-gray-600">Спасибо за прохождение теста. Вот ваши результаты:</p>
        </div>

        <div className="bg-blue-50 rounded-xl p-6 mb-8 space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-800">Результаты анализа:</h3>
            <p className="text-gray-700 mt-2">
              <span className="font-medium">Уровень: </span>
              <span className={`font-bold ${resultColor}`}>{result.resultText}</span>
              <span className="mx-2">•</span>
              <span>{result.percentage}%</span>
            </p>
          </div>
          
          <Separator className="my-4" />
          
          <div>
            <h4 className="text-md font-medium text-blue-700 mb-2">{result.title}</h4>
            <p className="text-gray-700 mb-4">{result.description}</p>
            
            <h5 className="font-medium text-blue-800 mb-2">Рекомендации:</h5>
            <ul className="space-y-2">
              {result.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Button 
          onClick={handleBackToTests}
          className="w-full mt-6 bg-primary hover:bg-primary/90"
        >
          Вернуться к тестам
        </Button>
      </div>
    );
  };

  const renderTestInProgress = () => {
    if (!selectedTest || testCompleted) return null;

    const currentQuestion = selectedTest.questions[currentQuestionIndex];
    const progress = ((currentQuestionIndex) / selectedTest.questions.length) * 100;

    return (
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Вопрос {currentQuestionIndex + 1} из {selectedTest.questions.length}</span>
            <span>{selectedTest.title}</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-6">{currentQuestion.text}</h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-start p-6 text-left h-auto whitespace-normal"
              onClick={() => handleSelectAnswer(option)}
            >
              <span className="text-left">{option}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  };


  const tests: Test[] = [
    {
      id: 1,
      title: "Тест на уровень тревожности",
      description: "Оцените свой уровень тревоги и узнайте способы справиться с ней",
      questions: [
        {
          id: 1,
          text: "Как часто вы испытываете беспокойство без видимой причины?",
          options: ["Никогда", "Иногда", "Часто", "Почти всегда"]
        },
        {
          id: 2,
          text: "Испытываете ли вы трудности с засыпанием из-за тревожных мыслей?",
          options: ["Никогда", "Иногда", "Часто", "Почти всегда"]
        },
        {
          id: 3,
          text: "Замечаете ли вы у себя физические проявления тревоги (учащенное сердцебиение, потливость)?",
          options: ["Никогда", "Иногда", "Часто", "Почти всегда"]
        }
      ],
      duration: "5-10 мин",
      difficulty: "Легкая",
      icon: <Brain className="text-primary" />
    },
    {
      id: 2,
      title: "Определение стиля общения",
      description: "Узнайте свой стиль коммуникации с окружающими",
      questions: [
        {
          id: 1,
          text: "Как вы реагируете на критику?",
          options: ["Спокойно принимаю", "Стараюсь объяснить свою точку зрения", "Обижаюсь", "Агрессивно защищаюсь"]
        },
        {
          id: 2,
          text: "Легко ли вам начать разговор с незнакомым человеком?",
          options: ["Очень легко", "Довольно легко", "С некоторым трудом", "Очень сложно"]
        },
        {
          id: 3,
          text: "Как часто вы перебиваете собеседника?",
          options: ["Никогда", "Редко", "Иногда", "Часто"]
        }
      ],
      duration: "7-12 мин",
      difficulty: "Средняя",
      icon: <BarChart className="text-deep-purple" />
    },
    {
      id: 3,
      title: "Самооценка и уверенность",
      description: "Проверьте уровень самооценки и уверенности в себе",
      questions: [
        {
          id: 1,
          text: "Насколько часто вы сомневаетесь в принятых решениях?",
          options: ["Почти никогда", "Иногда", "Часто", "Почти всегда"]
        },
        {
          id: 2,
          text: "Легко ли вам выступать перед группой людей?",
          options: ["Очень легко", "Довольно легко", "С некоторым трудом", "Очень сложно"]
        },
        {
          id: 3,
          text: "Считаете ли вы себя достойным успеха и признания?",
          options: ["Определенно да", "Скорее да", "Скорее нет", "Определенно нет"]
        }
      ],
      duration: "10-15 мин",
      difficulty: "Сложная",
      icon: <Award className="text-[#F97316]" />
    }
  ];

  const handleStartTest = (test: Test) => {
    setSelectedTest(test);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTestCompleted(false);
  };

  const handleSelectAnswer = (answer: string) => {
    if (!selectedTest) return;
    
    console.log('Current question index:', currentQuestionIndex);
    console.log('Total questions:', selectedTest.questions.length);
    
    const newAnswers = { ...answers };
    const currentQuestionId = selectedTest.questions[currentQuestionIndex].id;
    newAnswers[currentQuestionId] = answer;
    
    console.log('Updated answers:', newAnswers);
    
    setAnswers(newAnswers);
    
    const isLastQuestion = currentQuestionIndex >= selectedTest.questions.length - 1;
    console.log('Is last question?', isLastQuestion);
    
    if (isLastQuestion) {
      console.log('Test completed!');
      setTestCompleted(true);
    } else {
      setCurrentQuestionIndex(prev => {
        const newIndex = prev + 1;
        console.log('Moving to next question:', newIndex);
        return newIndex;
      });
    }
  };

  const handleBackToTests = () => {
    setSelectedTest(null);
    setTestCompleted(false);
  };

  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [testCompleted, setTestCompleted] = useState(false);

  // Временно выводим результаты, если тест завершен
  if (testCompleted && selectedTest) {
    const result = getRecommendations(selectedTest.id, answers);
    const resultColor = {
      low: 'text-green-600',
      medium: 'text-yellow-600',
      high: 'text-red-600'
    }[result.resultLevel];

    return (
      <Layout>
        <div className="page-container bg-gradient-to-b from-lavender/30 to-transparent py-12 min-h-screen">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 mt-8">
              <div className="text-center mb-8">
                <CheckCircle className={`h-16 w-16 mx-auto mb-4 ${resultColor}`} />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Тест завершен!</h2>
                <p className="text-gray-600">Спасибо за прохождение теста. Вот ваши результаты:</p>
              </div>

              <div className="bg-blue-50 rounded-xl p-6 mb-8 space-y-4">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-blue-800">Результаты анализа:</h3>
                  <p className="text-gray-700 mt-2">
                    <span className="font-medium">Уровень: </span>
                    <span className={`font-bold ${resultColor}`}>{result.resultText}</span>
                    <span className="mx-2">•</span>
                    <span>{result.percentage}%</span>
                  </p>
                </div>
                
                <Separator className="my-4" />
                
                <div>
                  <h4 className="text-md font-medium text-blue-700 mb-2">{result.title}</h4>
                  <p className="text-gray-700 mb-4">{result.description}</p>
                  
                  <h5 className="font-medium text-blue-800 mb-2">Рекомендации:</h5>
                  <ul className="space-y-2">
                    {result.tips.map((tip, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-2">•</span>
                        <span className="text-gray-700">{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Button 
                onClick={() => {
                  setSelectedTest(null);
                  setTestCompleted(false);
                }}
                className="w-full mt-6 bg-primary hover:bg-primary/90"
              >
                Вернуться к тестам
              </Button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="page-container bg-gradient-to-b from-lavender/30 to-transparent py-12 min-h-screen">
        <div className="container mx-auto px-4">
          {!selectedTest ? (
            <>
              <div className="max-w-4xl mx-auto text-center mb-10">
                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-deep-purple bg-clip-text text-transparent mb-6">
                  Психологические Тесты
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Пройдите наши тесты для лучшего понимания себя и своего эмоционального состояния
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {tests.map((test) => (
                  <div 
                    key={test.id}
                    className="bg-gradient-to-br from-white to-lavender/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group"
                  >
                    <div className="p-6">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                        {test.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-800">{test.title}</h3>
                      <p className="text-gray-600 text-sm mb-6">{test.description}</p>
                      
                      <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{test.duration}</span>
                        </div>
                        <div className="px-3 py-1 rounded-full text-xs" 
                          style={{
                            backgroundColor: 
                              test.difficulty === 'Легкая' ? 'rgba(74, 222, 128, 0.2)' : 
                              test.difficulty === 'Средняя' ? 'rgba(251, 191, 36, 0.2)' : 
                              'rgba(239, 68, 68, 0.2)',
                            color: 
                              test.difficulty === 'Легкая' ? 'rgb(22, 163, 74)' : 
                              test.difficulty === 'Средняя' ? 'rgb(217, 119, 6)' : 
                              'rgb(220, 38, 38)'
                          }}
                        >
                          {test.difficulty}
                        </div>
                      </div>
                      
                      <Button 
                        onClick={() => handleStartTest(test)}
                        className="w-full flex items-center justify-between group-hover:bg-primary/90"
                      >
                        <span>Начать тест</span>
                        <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="max-w-4xl mx-auto mt-16 p-6 bg-gradient-to-br from-white to-primary/5 backdrop-blur-md rounded-2xl shadow-lg border border-white/50">
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Почему стоит пройти эти тесты?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Brain className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium mb-2">Самопознание</h4>
                    <p className="text-gray-600 text-sm">Лучшее понимание своих эмоций и реакций</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <BarChart className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium mb-2">Аналитика</h4>
                    <p className="text-gray-600 text-sm">Подробные результаты с рекомендациями</p>
                  </div>
                  <div className="flex flex-col items-center text-center">
                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-medium mb-2">Развитие</h4>
                    <p className="text-gray-600 text-sm">Конкретные шаги для личностного роста</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="max-w-3xl mx-auto">
              {!testCompleted ? (
                <div className="bg-gradient-to-br from-white to-lavender/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-6">
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-2xl font-bold text-gray-800">{selectedTest.title}</h2>
                      <span className="text-sm text-gray-500">
                        Вопрос {currentQuestionIndex + 1} из {selectedTest.questions.length}
                      </span>
                    </div>
                    <Progress value={(currentQuestionIndex / selectedTest.questions.length) * 100} className="h-2" />
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-xl mb-6 text-gray-700">
                      {selectedTest.questions[currentQuestionIndex].text}
                    </h3>
                    
                    <div className="space-y-3">
                      {selectedTest.questions[currentQuestionIndex].options.map((option, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectAnswer(option)}
                          className="w-full text-left p-4 border rounded-xl transition-all duration-200 hover:bg-primary/5 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/30"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-white to-lavender/10 backdrop-blur-md rounded-2xl shadow-lg border border-white/50 p-8 text-center">
                  <div className="mb-6">
                    <div className="h-20 w-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center mb-4 text-white">
                      <CheckCircle className="h-10 w-10" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{selectedTest.title}</h2>
                    <p className="text-gray-600">Тест завершен</p>
                  </div>
                  
                  <div className="bg-lavender/20 p-6 rounded-xl mb-6 text-left">
                    <h3 className="font-semibold mb-4">Результаты анализа:</h3>
                    <p className="text-gray-700 mb-4">
                      На основе ваших ответов мы подготовили рекомендации, которые помогут вам лучше понять себя и улучшить эмоциональное состояние.
                    </p>
                    <Separator className="my-4" />
                  </div>
                  
                  <Button onClick={handleBackToTests} className="px-8">
                    Вернуться к тестам
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default PsychologicalTests;
