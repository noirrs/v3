"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Check if user has theme preference saved
    const savedTheme = localStorage.getItem("theme");
    const prefersDark =
      savedTheme === "dark" ||
      (!savedTheme &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(prefersDark);
    applyTheme(prefersDark);
  }, []);

  const applyTheme = (isDark: boolean) => {
    const html = document.documentElement;
    const body = document.body;

    if (isDark) {
      html.classList.remove("light");
      html.classList.add("dark");
      html.style.setProperty("--background", "black");
      html.style.setProperty("--foreground", "white");
      body.style.backgroundColor = "black";
      body.style.color = "white";
    } else {
      html.classList.remove("dark");
      html.classList.add("light");
      html.style.setProperty("--background", "#ffffff");
      html.style.setProperty("--foreground", "#0f172a");
      body.style.backgroundColor = "#ffffff";
      body.style.color = "#0f172a";
    }
  };

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    applyTheme(newIsDark);
  };

  if (!isMounted) return null;

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-300"
      style={{
        backgroundColor: isDark
          ? "rgba(255,255,255,0.1)"
          : "rgba(15,23,42,0.1)",
        border: isDark
          ? "1px solid rgba(255,255,255,0.2)"
          : "1px solid rgba(15,23,42,0.15)",
        color: isDark ? "white" : "#0f172a",
      }}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: isDark ? "white" : "#0f172a" }}
        >
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          style={{ color: isDark ? "white" : "#0f172a" }}
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      )}
    </button>
  );
}
