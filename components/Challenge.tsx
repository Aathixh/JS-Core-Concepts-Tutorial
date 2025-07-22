import React, { useState, useEffect } from 'react';

interface ChallengeProps {
  question: string;
  options: string[];
  correctAnswer: string;
  codeSnippet?: string;
}

const Challenge: React.FC<ChallengeProps> = ({ question, options, correctAnswer, codeSnippet }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Reset state when props change (e.g., navigating to a new challenge)
  useEffect(() => {
    setSelectedOption(null);
    setIsAnswered(false);
  }, [question]);

  const handleOptionClick = (option: string) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);
  };

  const getButtonClass = (option: string) => {
    if (!isAnswered) {
      return 'border-slate-300 hover:border-cyan hover:bg-cyan/10';
    }
    if (option === correctAnswer) {
      return 'border-green-500 bg-green-100 text-green-700 font-semibold';
    }
    if (option === selectedOption) {
      return 'border-red-500 bg-red-100 text-red-700 font-semibold';
    }
    return 'border-slate-300 text-dark-text/60';
  };

  return (
    <div>
      <p className="font-semibold text-dark-text mb-4">{question}</p>
      {codeSnippet && (
        <pre className="p-4 mb-4 text-sm bg-light-navy rounded-md text-lightest-slate overflow-x-auto font-mono">
          <code>{codeSnippet}</code>
        </pre>
      )}
      <div className="space-y-3">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
            className={`w-full text-left p-3 border rounded-md transition-all duration-200 ${getButtonClass(option)} ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}`}
          >
            {option}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className="mt-4 text-right">
          <button 
             onClick={() => { setSelectedOption(null); setIsAnswered(false); }}
             className="text-sm text-cyan hover:underline"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

export default Challenge;
