import React from 'react';

interface SuggestionChipsProps {
  suggestions: string[];
  onSuggestionClick: (suggestion: string) => void;
}

const SuggestionChips: React.FC<SuggestionChipsProps> = ({ suggestions, onSuggestionClick }) => {
  return (
    <div className="px-4 pt-2 pb-4">
      <p className="text-sm text-slate-400 mb-2 px-1">Try asking:</p>
      <div className="flex flex-wrap justify-start items-center gap-3">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-4 py-2 bg-slate-800 border border-slate-700 rounded-full text-sm text-slate-300 hover:bg-slate-700 hover:border-sky-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-500 transition-all duration-200 ease-in-out"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestionChips;
