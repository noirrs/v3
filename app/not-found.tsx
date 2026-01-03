"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen transition-colors duration-300 flex items-center justify-center px-4"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="w-full sm:w-11/12 md:w-6/12 max-w-4xl text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1
            className="text-8xl sm:text-9xl font-bold mb-4"
            style={{
              background:
                "linear-gradient(135deg, var(--foreground) 0%, var(--foreground) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              opacity: 0.8,
            }}
          >
            404
          </h1>
        </div>

        {/* Error Message */}
        <div className="mb-12">
          <h2
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: "var(--foreground)" }}
          >
            Page Not Found
          </h2>
          <p
            className="text-base sm:text-lg leading-relaxed mb-2"
            style={{ color: "var(--foreground)", opacity: 0.8 }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
          <p
            className="text-sm sm:text-base leading-relaxed"
            style={{ color: "var(--foreground)", opacity: 0.6 }}
          >
            Don&apos;t worry, even the best developers get lost sometimes.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white text-sm sm:text-base font-medium transition-all duration-300 shadow-lg backdrop-blur-md"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-sm sm:text-base font-medium transition-all duration-300"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Go Back
          </button>
        </div>

        {/* Decorative Element */}
        <div className="mt-16 opacity-20">
          <div
            className="inline-flex items-center gap-2 text-xs sm:text-sm"
            style={{ color: "var(--foreground)" }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>Error Code: 404</span>
          </div>
        </div>
      </div>
    </div>
  );
}
