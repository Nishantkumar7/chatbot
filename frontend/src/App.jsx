import React, { useState } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { Bot } from 'lucide-react';

function App() {
  const [state, setState] = useState({
    messages: [],
    isLoading: false,
    error: null,
  });

  const handleSendMessage = async (text) => {
    const userMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      const response = await fetch('https://chatbot-backend-a855.onrender.com/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: text }),
      });

      const data = await response.json();

      const botMessage = {
        id: Date.now().toString(),
        text: data.response,
        sender: 'bot',
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false,
      }));
    } catch (error) {
      setState((prev) => ({
        ...prev,
        error: 'Failed to send message. Please try again.',
        isLoading: false,
      }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <header className="bg-gradient-to-r from-indigo-500 to-purple-500 shadow-xl p-6">
        <div className="max-w-4xl mx-auto text-white">
          <div className="flex items-center gap-3">
            <Bot size={32} />
            <h1 className="text-3xl font-extrabold tracking-wide">Chatbot</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-6 overflow-y-auto bg-white rounded-lg shadow-lg">
        <div className="space-y-6">
          {state.messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {state.isLoading && (
            <div className="flex items-center gap-2 text-gray-500 animate-pulse">
              <div>Thinking...</div>
            </div>
          )}
          {state.error && (
            <div className="p-4 bg-red-100 text-red-800 rounded-lg shadow">
              {state.error}
            </div>
          )}
        </div>
      </main>

      <footer className="max-w-4xl w-full mx-auto p-4 bg-white shadow-md rounded-lg">
        <ChatInput onSendMessage={handleSendMessage} isLoading={state.isLoading} />
      </footer>
    </div>
  );
}

export default App;
