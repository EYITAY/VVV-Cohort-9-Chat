
import React from 'react';

export const BotIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2a2 2 0 00-2 2v2a2 2 0 004 0V4a2 2 0 00-2-2zM6.75 8a.75.75 0 000 1.5h10.5a.75.75 0 000-1.5H6.75zM5 12a1 1 0 00-1 1v5a1 1 0 102 0v-5a1 1 0 00-1-1zM19 12a1 1 0 00-1 1v5a1 1 0 102 0v-5a1 1 0 00-1-1z" />
    <path
      fillRule="evenodd"
      d="M2.25 14.663V18.75a3 3 0 003 3h13.5a3 3 0 003-3v-4.087A3.75 3.75 0 0019.5 12.5H4.5a3.75 3.75 0 00-2.25 2.163zM8.25 15a.75.75 0 01.75.75v.01a.75.75 0 01-1.5 0v-.01a.75.75 0 01.75-.75zm.75 2.25a.75.75 0 00-1.5 0v.01a.75.75 0 001.5 0v-.01zM15 15.75a.75.75 0 01-1.5 0v-.01a.75.75 0 011.5 0v.01zM15.75 15a.75.75 0 000 1.5h.01a.75.75 0 000-1.5h-.01z"
      clipRule="evenodd"
    />
  </svg>
);

export const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
      clipRule="evenodd"
    />
  </svg>
);

export const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
  </svg>
);