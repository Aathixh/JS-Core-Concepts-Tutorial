import React from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import { SECTIONS_DATA } from "./constants";
import Rat3D from "./components/3DRat";

const App: React.FC = () => {
  return (
    <div className="bg-dark-navy">
      {/* Sticky Header container */}
      <div className="h-screen sticky top-0 z-0">
        <Header />
      </div>

      {/* Content that scrolls over the header */}
      <div className="relative z-10 bg-off-white rounded-t-3xl shadow-2xl -mt-4">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 py-24">
          <div className="space-y-32 md:space-y-48">
            {SECTIONS_DATA.map((section, index) => (
              <Section
                key={section.id}
                title={section.title}
                code={section.code}
                challenge={section.challenge}
                index={index + 1}
              >
                {section.description.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="text-dark-text/80 mb-4 text-base md:text-lg"
                  >
                    {paragraph}
                  </p>
                ))}
              </Section>
            ))}
            <footer className="text-center text-dark-text/60">
              <div className="mx-auto w-full max-w-4xl mb-8">
                <div className="flex justify-center">
                  <Rat3D width={900} height={500} />
                </div>
              </div>
              <p>You've reached the end! Keep practicing and building.</p>
              <p className="text-cyan mt-2 text-sm">
                Created for Web Development Class
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
