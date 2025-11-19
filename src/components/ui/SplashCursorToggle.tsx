"use client";

import { useEffect, useState } from "react";
import SplashCursor from "./SplashCursor";

const STORAGE_KEY = "splash-cursor-enabled";

export default function SplashCursorToggle() {
  const [isEnabled, setIsEnabled] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) {
      setIsEnabled(stored === "true");
    }
    setIsMounted(true);
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem(STORAGE_KEY, String(isEnabled));
    }
  }, [isEnabled, isMounted]);

  const toggleAnimation = () => {
    setIsEnabled(!isEnabled);
  };

  return (
    <>
      {isEnabled && <SplashCursor />}
      <button
        onClick={toggleAnimation}
        className="fixed bottom-8 right-8 z-40 p-4 rounded-2xl bg-white/10 dark:bg-black/10 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-200 backdrop-blur-md border border-white/20 dark:border-white/10 shadow-lg hover:shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
        aria-label={isEnabled ? "Disable animation" : "Enable animation"}
        title={isEnabled ? "Disable animation" : "Enable animation"}
      >
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="text-white/80 dark:text-white/80 transition-all duration-300"
        >
          {isEnabled ? (
            
            <>
              <rect x="6" y="4" width="3" height="16" rx="1"></rect>
              <rect x="15" y="4" width="3" height="16" rx="1"></rect>
            </>
          ) : (
            
            <>
              <polygon points="5 3 19 12 5 21"></polygon>
            </>
          )}
        </svg>
      </button>
    </>
  );
}
