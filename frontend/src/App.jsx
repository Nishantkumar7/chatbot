import React, { useState } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import { BotMessageSquare } from 'lucide-react';

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

    setState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
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

      setState(prev => ({
        ...prev,
        messages: [...prev.messages, botMessage],
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: 'Failed to send message. Please try again.',
        isLoading: false,
      }));
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-blue-500 shadow-lg p-4">
        <div className="max-w-4xl mx-auto text-white">
          <div className="flex items-center gap-2">
            <BotMessageSquare className="text-white" size={30} />
            <h1 className="text-2xl font-bold">Chatbot</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto p-4 overflow-y-auto bg-white rounded-lg shadow-lg">
        <div className="space-y-4">
          {state.messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {state.isLoading && (
            <div className="flex items-center gap-2 text-gray-500 animate-pulse">
              <div>Thinking...</div>
            </div>
          )}
          {state.error && (
            <div className="p-3 bg-red-100 text-red-700 rounded-lg">
              {state.error}
            </div>
          )}
        </div>
      </main>

      <div className="max-w-4xl w-full mx-auto p-4 bg-white shadow-md rounded-lg">
        <ChatInput onSendMessage={handleSendMessage} isLoading={state.isLoading} />
      </div>
    </div>
  );
}

export default App;
