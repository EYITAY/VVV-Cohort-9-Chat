
import React from 'react';
import type { ChatMessage } from '../types';
import { UserIcon, BotIcon } from './icons';

interface MessageProps {
  message: ChatMessage;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const { role, text } = message;
  const isUser = role === 'user';

  const containerClasses = isUser
    ? 'flex items-end justify-end'
    : 'flex items-end justify-start';

  const bubbleClasses = isUser
    ? 'bg-sky-600 text-white rounded-l-2xl rounded-tr-2xl'
    : 'bg-slate-700 text-slate-200 rounded-r-2xl rounded-tl-2xl';
  
  const formattedText = text.split('\n').map((line, index) => (
    <span key={index}>
      {line}
      <br />
    </span>
  ));

  return (
    <div className={`px-4 py-2 ${containerClasses}`}>
      <div className="flex items-start gap-3 max-w-2xl">
        {!isUser && (
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-slate-800 flex items-center justify-center">
            <BotIcon className="w-5 h-5 text-sky-400" />
          </div>
        )}
        <div
          className={`px-4 py-3 ${bubbleClasses} transition-colors duration-300 ease-in-out`}
        >
          <p className="text-sm leading-relaxed">{formattedText}</p>
        </div>
        {isUser && (
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-slate-800 flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-slate-400" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
