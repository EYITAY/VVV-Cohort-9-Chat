import React, { useState, useEffect, useRef, useCallback } from 'react';
import { streamMessage } from './services/geminiService';
import type { ChatMessage } from './types';
import Message from './components/Message';
import MessageInput from './components/MessageInput';
import SuggestionChips from './components/SuggestionChips';

const Header: React.FC = () => (
  <header className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700 p-3 flex items-center justify-between">
    <h1 className="text-xl font-bold text-slate-100">VVV Cohort 9 Chat</h1>
  </header>
);

const LoadingIndicator: React.FC = () => (
    <div className="flex justify-start px-4 py-2">
      <div className="flex items-start gap-3 max-w-2xl">
        <div className="w-8 h-8 flex-shrink-0 rounded-full bg-slate-800 flex items-center justify-center">
          <div className="w-5 h-5 text-sky-400">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a2 2 0 00-2 2v2a2 2 0 004 0V4a2 2 0 00-2-2zM6.75 8a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75z" /></svg>
          </div>
        </div>
        <div className="px-4 py-3 bg-slate-700 text-slate-200 rounded-r-2xl rounded-tl-2xl">
          <div className="flex items-center space-x-1">
              <span className="text-sm text-slate-400">Thinking...</span>
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-sky-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
);


const ErrorDisplay: React.FC<{ message: string | null }> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="p-4">
        <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-center">
            <p><strong>Error:</strong> {message}</p>
        </div>
    </div>
  );
};


const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const suggestions = [
    "Where do I access recordings?",
    "How do I qualify for attendance credit?",
    "When is the in-person event?"
  ];

  useEffect(() => {
    setMessages([{ role: 'model', text: 'Welcome to the VVV Cohort 9 Chat! I\'m here to help answer your questions about the program. How can I assist you?' }]);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);
  
  const handleSendMessage = useCallback(async (text: string) => {
    if (isLoading || !text.trim()) return;

    const userMessage: ChatMessage = { role: 'user', text };
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    setIsLoading(true);
    setError(null);

    try {
      const stream = streamMessage(messages, text);
      
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullResponse;
          return newMessages;
        });
      }

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
      setError(errorMessage);
      setMessages(prev => prev.slice(0, -1)); // Remove the empty model message placeholder
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages]);

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-white">
      <Header />
      <main className="flex-1 overflow-y-auto">
        <div className="space-y-2 py-4">
          {messages.map((msg, index) => (
            <Message key={index} message={msg} />
          ))}
          {messages.length === 1 && !isLoading && (
            <SuggestionChips 
              suggestions={suggestions}
              onSuggestionClick={handleSendMessage}
            />
          )}
          {isLoading && <LoadingIndicator />}
          <div ref={messagesEndRef} />
        </div>
      </main>
      <ErrorDisplay message={error} />
      <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
};

export default App;