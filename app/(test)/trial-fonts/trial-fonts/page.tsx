"use client";

import { useState } from "react";

export default function TrialFonts() {
  const [selectedFont, setSelectedFont] = useState("sora-jetbrains");

  const fontConfigs = {
    "inter-jetbrains": {
      name: "Inter + JetBrains Mono",
      headingClass: "font-inter",
      bodyClass: "font-inter",
      monoClass: "font-jetbrains",
      description: "Clean, geometric sans-serif with excellent readability",
      imports: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');`,
    },
    "sora-jetbrains": {
      name: "Sora + JetBrains Mono (Recommended)",
      headingClass: "font-sora",
      bodyClass: "font-sora",
      monoClass: "font-jetbrains",
      description: "Modern, friendly with developer-focused monospace",
      imports: `@import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');`,
    },
    "outfit-ibm": {
      name: "Outfit + IBM Plex Mono",
      headingClass: "font-outfit",
      bodyClass: "font-outfit",
      monoClass: "font-ibm",
      description: "Contemporary, geometric with technical feel",
      imports: `@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');`,
    },
    "space-grotesk": {
      name: "Space Grotesk + Inconsolata",
      headingClass: "font-space-grotesk",
      bodyClass: "font-space-grotesk",
      monoClass: "font-inconsolata",
      description: "Bold, futuristic, distinctive aesthetic",
      imports: `@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inconsolata:wght@400;500;600&display=swap');`,
    },
    "poppins-roboto": {
      name: "Poppins + Roboto Mono",
      headingClass: "font-poppins",
      bodyClass: "font-poppins",
      monoClass: "font-roboto-mono",
      description: "Friendly, rounded geometric with reliable monospace",
      imports: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600&display=swap');`,
    },
  };

  const current = fontConfigs[selectedFont as keyof typeof fontConfigs];

  return (
    <div className="min-h-screen bg-black">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Sora:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&family=Inconsolata:wght@400;500;600&family=Roboto+Mono:wght@400;500;600&display=swap');
        
        .font-inter { font-family: 'Inter', sans-serif; }
        .font-sora { font-family: 'Sora', sans-serif; }
        .font-outfit { font-family: 'Outfit', sans-serif; }
        .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-jetbrains { font-family: 'JetBrains Mono', monospace; }
        .font-ibm { font-family: 'IBM Plex Mono', monospace; }
        .font-inconsolata { font-family: 'Inconsolata', monospace; }
        .font-roboto-mono { font-family: 'Roboto Mono', monospace; }
      `}</style>

      <div className="mt-16 md:mt-24 flex justify-center px-4 sm:px-6 md:px-0">
        <div className="w-full sm:w-11/12 md:w-6/12 max-w-4xl">
          {/* Font Selector */}
          <div className="mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Font Pairing Trial
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {Object.entries(fontConfigs).map(([key, config]) => (
                <button
                  key={key}
                  onClick={() => setSelectedFont(key)}
                  className={`p-4 rounded-lg border-2 transition-all duration-300 text-left ${
                    selectedFont === key
                      ? "border-white/40 bg-white/10"
                      : "border-white/10 bg-white/5 hover:bg-white/7 hover:border-white/20"
                  }`}
                >
                  <p className="font-semibold text-white text-sm">
                    {config.name}
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    {config.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Preview Section */}
          <div className={`${current.bodyClass}`}>
            <div className="mb-12 md:mb-16">
              <p
                className={`${current.headingClass} text-3xl sm:text-4xl font-bold text-white mb-2`}
              >
                Taha Kaçmaz
              </p>
              <p
                className={`${current.headingClass} text-base sm:text-lg text-white font-semibold mb-4 drop-shadow-lg`}
              >
                Backend Developer
              </p>
              <p
                className={`${current.bodyClass} text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 md:mb-8`}
              >
                Backend developer with 5+ years of experience building scalable
                applications. Passionate about creating efficient, maintainable
                systems and exploring emerging technologies.
              </p>

              {/* Social Links Preview */}
              <div className="flex gap-4 mb-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs sm:text-sm transition-all duration-300"
                >
                  GitHub
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs sm:text-sm transition-all duration-300"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs sm:text-sm transition-all duration-300"
                >
                  Email
                </a>
              </div>

              {/* Navigation Tabs Preview */}
              <div className="flex gap-2 sm:gap-3 pb-6 overflow-x-auto">
                {[
                  "Skills",
                  "Education",
                  "Projects",
                  "Experience",
                  "Resume",
                ].map((section) => (
                  <button
                    key={section}
                    className="px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap rounded-lg bg-white/10 text-white border border-white/20 transition-all duration-300"
                  >
                    {section}
                  </button>
                ))}
              </div>
            </div>

            {/* Section Preview */}
            <div className="space-y-8">
              <div>
                <h2
                  className={`${current.headingClass} text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8`}
                >
                  Skills
                </h2>
                <div className="space-y-4 md:space-y-6">
                  <div>
                    <h3
                      className={`${current.bodyClass} text-xs sm:text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3`}
                    >
                      Languages
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {["Python", "TypeScript", "Go", "Rust"].map((skill) => (
                        <div
                          key={skill}
                          className={`${current.bodyClass} px-2.5 sm:px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs sm:text-sm text-zinc-300 hover:text-white transition-all duration-300`}
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2
                  className={`${current.headingClass} text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8`}
                >
                  Project Card Sample
                </h2>
                <div className="rounded-lg border border-white/10 bg-white/2 hover:bg-white/5 transition-all duration-300 p-3 sm:p-4">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 min-h-32">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-md bg-white/5 flex items-center justify-center text-2xl sm:text-3xl">
                      🔬
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`${current.headingClass} text-sm sm:text-base font-semibold text-white`}
                      >
                        Football Analyzer
                      </h3>
                      <p
                        className={`${current.bodyClass} text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2`}
                      >
                        YOLOv8-based computer vision system for tracking
                        players...
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center mt-2 sm:mt-3 text-xs">
                        <span className="px-1.5 py-0.5 rounded-full bg-white/5 text-zinc-500">
                          In Publication
                        </span>
                        <span className="text-zinc-600">•</span>
                        <span className="text-zinc-500">Research</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2
                  className={`${current.headingClass} text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8`}
                >
                  Code Example
                </h2>
                <div
                  className={`${current.monoClass} bg-white/5 border border-white/10 rounded-lg p-4 text-xs sm:text-sm text-zinc-300 overflow-x-auto`}
                >
                  <pre>{`const config = {
  social: {
    github: "tahakacmaz",
    linkedin: "tahakacmaz",
    email: "hi@noir.land"
  }
};`}</pre>
                </div>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="mt-12 p-4 rounded-lg bg-white/5 border border-white/10">
            <p
              className={`${current.bodyClass} text-xs sm:text-sm text-zinc-300`}
            >
              <span className="font-semibold text-white">
                Current Selection:
              </span>{" "}
              {current.name}
            </p>
            <p className={`${current.bodyClass} text-xs text-zinc-500 mt-2`}>
              This trial page shows how different font pairings look across all
              portfolio elements.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
