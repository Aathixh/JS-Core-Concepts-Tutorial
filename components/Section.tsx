import React from 'react';
import CodeBlock from './CodeBlock';
import Challenge from './Challenge';
import { ChallengeContent } from '../constants';

interface SectionProps {
  title: string;
  code: string;
  children: React.ReactNode;
  index: number;
  challenge?: ChallengeContent;
}

const LightningIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
);


const Section: React.FC<SectionProps> = ({ title, code, children, index, challenge }) => {
  const sectionId = title.toLowerCase().replace(/\s+/g, '-');
  
  // A special case for the last section which has no number
  const isLastSection = index > 6; 

  return (
    <section id={sectionId} className="min-h-[60vh] flex items-center">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start w-full">
        <div className="lg:sticky top-24">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-text mb-6 flex items-center">
             {!isLastSection && <span className="text-cyan font-mono mr-3 text-2xl md:text-3xl">0{index}.</span>}
            {title}
          </h2>
          <div className="text-dark-text/80 max-w-none">
            {children}
          </div>
        </div>
        <div className="mt-8 lg:mt-0">
          <CodeBlock code={code} />
          {challenge && (
            <div className="mt-12 p-6 bg-white rounded-lg border border-slate-200 shadow-sm">
                <h3 className="text-xl font-bold text-dark-text mb-2 flex items-center">
                    <LightningIcon className="h-6 w-6 mr-3 text-cyan" />
                    <span>Test Your Knowledge</span>
                </h3>
                <p className="text-dark-text/70 mb-6">Select the correct option to see if you've mastered this topic.</p>
                <Challenge
                    question={challenge.question}
                    options={challenge.options}
                    correctAnswer={challenge.correctAnswer}
                    codeSnippet={challenge.codeSnippet}
                />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Section;
