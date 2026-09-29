
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AI_SYSTEM_INSTRUCTION } from '../constants';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: 'Hi! I\'m Suyeon\'s AI assistant. Ask me anything about my work!' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.text }]
        })), { role: 'user', parts: [{ text: userMessage }] }],
        config: {
          systemInstruction: AI_SYSTEM_INSTRUCTION,
          maxOutputTokens: 150,
        },
      });

      const aiText = response.text || "I'm sorry, I couldn't process that.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Error connecting to AI. Please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-[70] w-14 h-14 bg-primary text-white rounded-full shadow-2xl flex items-center justify-center active:scale-90 transition-transform"
      >
        <span className="material-icons-round text-2xl">{isOpen ? 'close' : 'chat'}</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 z-[70] w-[calc(100%-48px)] max-w-[340px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-primary p-4 text-white flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <span className="material-icons-round text-sm">smart_toy</span>
            </div>
            <div>
              <p className="font-bold text-sm">Portfolio Assistant</p>
              <p className="text-[10px] text-white/70">Powered by Gemini</p>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="h-80 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-50/50"
          >
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${m.role === 'user'
                    ? 'bg-primary text-white rounded-tr-none'
                    : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                  }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-slate-100 flex gap-1">
                  <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce"></span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me something..."
              className="flex-1 bg-slate-100 border-none rounded-xl px-4 py-2 text-xs focus:ring-2 focus:ring-primary/20 outline-none"
            />
            <button
              onClick={handleSend}
              className="w-9 h-9 bg-primary/10 text-primary rounded-xl flex items-center justify-center active:bg-primary active:text-white transition-colors"
            >
              <span className="material-icons-round text-sm">send</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AiAssistant;
