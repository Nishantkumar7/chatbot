import React from 'react';
import { Bot, User } from 'lucide-react';

const ChatMessage = ({ message }) => {
  const isBot = message.sender === 'bot';

  return (
    <div className={`flex items-start gap-3 ${isBot ? '' : 'flex-row-reverse'}`}>
  
      <div
        className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-transform transform ${
          isBot ? 'bg-blue-200' : 'bg-green-200'
        } hover:scale-110`}
      >
        {isBot ? <Bot size={20} className="text-blue-600" /> : <User size={20} className="text-green-600" />}
      </div>

      <div
        className={`max-w-[80%] p-4 rounded-lg shadow-md transition-all transform ${
          isBot ? 'bg-blue-100' : 'bg-green-100'
        } hover:shadow-lg hover:bg-opacity-90`}
      >
        <p className="text-md text-gray-800 leading-relaxed">{message.text}</p>

        <span className="text-xs text-gray-500 mt-2 block">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};

export default ChatMessage;
