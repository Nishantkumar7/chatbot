import React, { useState } from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg shadow-xl max-w-3xl mx-auto mt-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="flex-1 p-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-700 transition-all duration-300 ease-in-out"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !message.trim()}
        className="flex justify-center items-center p-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full hover:from-purple-500 hover:to-indigo-500 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 ease-in-out shadow-lg"
      >
        <Send size={24} />
      </button>
    </form>
  );
};

export default ChatInput;
