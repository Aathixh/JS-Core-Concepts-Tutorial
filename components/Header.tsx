import React from "react";

const ScrollDownIcon = () => (
  <svg
    className="w-6 h-6 text-slate"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const Header: React.FC = () => {
  return (
    <header className="h-full flex flex-col justify-center items-start relative px-6 md:px-12 lg:px-24">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-dark-navy"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[80vh] h-[80vh] bg-cyan/5 rounded-full filter blur-3xl opacity-60" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-lightest-navy/10 rounded-full filter blur-2xl" />
      </div>

      <div className="relative z-10 animate-fade-in-up">
        <p className="text-cyan font-mono text-lg mb-4">
          A Presentation by Aathish R Viswam
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-lightest-slate mb-4">
          JavaScript: The Core Concepts.
        </h1>
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate mb-8">
          From Variables to Functions.
        </h2>
        <p className="max-w-xl text-lg text-slate">
          Welcome! This is a quick journey through the fundamental building
          blocks of JavaScript. Scroll down to begin the presentation.
        </p>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow z-10">
        <a href="#intro" aria-label="Scroll to content">
          <ScrollDownIcon />
        </a>
      </div>
    </header>
  );
};

export default Header;
