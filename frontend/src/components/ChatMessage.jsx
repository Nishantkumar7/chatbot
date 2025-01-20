import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'} mb-6`}>
      <div
        className={`flex items-center justify-center w-12 h-12 rounded-full shadow-xl transform ${
          isBot ? 'bg-indigo-500' : 'bg-green-500'
        } text-white`}
      >
        {isBot ? <Bot size={24} /> : <User size={24} />}
      </div>

      <div
        className={`max-w-[75%] p-4 rounded-2xl shadow-lg transition-transform transform ${
          isBot ? 'bg-indigo-100 text-indigo-900' : 'bg-green-100 text-green-900'
        } hover:scale-105`}
      >
        <p className="text-md leading-relaxed">{message.text}</p>
        <span className="text-xs text-gray-500 mt-2 block">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
