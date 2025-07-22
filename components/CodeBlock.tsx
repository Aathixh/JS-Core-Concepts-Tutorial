
import React, { useState } from 'react';

interface CodeBlockProps {
  code: string;
}

const CopyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
  </svg>
);

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);


const CodeBlock: React.FC<CodeBlockProps> = ({ code }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="relative group bg-light-navy rounded-lg border border-lightest-navy/20 shadow-lg overflow-hidden">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 p-2 bg-slate-900/50 rounded-md text-slate hover:text-cyan focus:outline-none focus:ring-2 focus:ring-cyan focus:ring-opacity-50 transition-all duration-200 opacity-0 group-hover:opacity-100"
        aria-label="Copy code"
      >
        {isCopied ? <CheckIcon className="w-5 h-5 text-cyan" /> : <CopyIcon className="w-5 h-5" />}
      </button>
      <pre className="p-6 text-sm md:text-base text-lightest-slate overflow-x-auto font-mono">
        <code>
          {code}
        </code>
      </pre>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-cyan/20">
         <div className="h-full bg-cyan" style={{width: '40%'}}></div>
      </div>
    </div>
  );
};

export default CodeBlock;
