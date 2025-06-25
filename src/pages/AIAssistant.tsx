import React, { useState } from "react";
import { sendChatMessage, ChatMessage } from "../services/aiService";
import Layout from "../components/Layout";
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AIAssistantPage = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const aiReply = await sendChatMessage([...messages, userMessage]);
      setMessages((prev) => [...prev, { role: "assistant", content: aiReply }]);
    } catch (e) {
      setMessages((prev) => [...prev, { role: "assistant", content: "Ошибка при обращении к AI." }]);
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="page-container bg-gradient-to-b from-lavender/30 to-white">
        <div className="container-narrow">
          <h1 className="text-3xl font-bold mb-6 text-center">ИИ Помощник</h1>
          <p className="text-center mb-8 text-gray-600">
            Поделитесь своими мыслями и чувствами с нашим ИИ помощником. Он здесь, чтобы выслушать и поддержать вас.
          </p>
          
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            {/* Chat messages */}
            <div className="p-4 h-[50vh] overflow-y-auto flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx}
                  className={`max-w-[80%] ${msg.role === "user" ? 'ml-auto' : 'mr-auto'}`}
                >
                  <div 
                    className={`p-3 rounded-2xl ${
                      msg.role === "user" 
                        ? 'bg-primary text-white rounded-tr-none' 
                        : 'bg-lavender/50 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    {msg.content}
                  </div>
                  <div 
                    className={`text-xs text-gray-500 mt-1 ${
                      msg.role === "user" ? 'text-right' : 'text-left'
                    }`}
                  >
                    {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="max-w-[80%] mr-auto">
                  <div className="p-3 bg-lavender/50 text-gray-800 rounded-2xl rounded-tl-none flex items-center gap-1">
                    <span className="animate-pulse">•</span>
                    <span className="animate-pulse delay-100">•</span>
                    <span className="animate-pulse delay-200">•</span>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input form */}
            <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="border-t border-gray-200 p-4 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Напишите сообщение..."
                className="flex-grow"
                disabled={loading}
              />
              <Button type="submit" disabled={loading || !input.trim()}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
          
          <div className="mt-8 p-4 bg-mint-green/30 rounded-xl">
            <h3 className="font-medium mb-2">Примечание:</h3>
            <p className="text-sm text-gray-600">
              Этот ИИ помощник создан для эмоциональной поддержки, но не заменяет профессиональную психологическую помощь. Если вы испытываете серьезные эмоциональные трудности, пожалуйста, обратитесь к специалисту через раздел "Связаться с психологом".
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIAssistantPage;
