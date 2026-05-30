"use client";

import { useState, useRef } from "react";
import { config } from "@/lib/config";
import { getDemographicsData } from "@/hooks/useVisitorTracking";

export default function SocialPage() {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showSnapchatQR, setShowSnapchatQR] = useState(false);

  // Verification & Bot Prevention states
  const [sliderPos, setSliderPos] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [honeypot, setHoneypot] = useState("");
  const trackRef = useRef<HTMLDivElement>(null);

  const maxChars = 300;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (!note.trim() || loading) return;
    e.preventDefault(); // Prevent default text selection behavior
    setIsDragging(true);
    setStartX(e.clientX - sliderPos);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || !trackRef.current) return;
    const track = trackRef.current;
    const maxPos = track.clientWidth - 40 - 8; // track width - handle width (40px) - padding (8px)
    const newPos = Math.max(0, Math.min(maxPos, e.clientX - startX));
    setSliderPos(newPos);
  };

  const handlePointerUp = async (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);

    if (!trackRef.current) return;
    const track = trackRef.current;
    const maxPos = track.clientWidth - 40 - 8;

    // If swiped past 90%, lock to end and trigger send
    if (sliderPos > maxPos * 0.9) {
      setSliderPos(maxPos);
      await triggerSendNote();
    } else {
      // Snap back smoothly
      setSliderPos(0);
    }
  };

  const triggerSendNote = async () => {
    setLoading(true);
    setError("");

    try {
      const demographics = await getDemographicsData();

      const response = await fetch("/api/note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          note: note.trim(),
          username_hp: honeypot, // Hidden Honeypot
          ...demographics,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        setNote("");
      } else {
        setError(data.error || "Failed to send note. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred. Please check your connection.");
    } finally {
      setLoading(false);
      setSliderPos(0);
    }
  };

  const socialLinks = [
    {
      name: "Main Portfolio",
      url: "/",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
      color: "hover:border-indigo-500/30 hover:shadow-[0_0_15px_rgba(99,102,241,0.1)]",
    },
    {
      name: "Instagram",
      url: `https://instagram.com/${config.social.instagram}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      ),
      color: "hover:border-rose-500/30 hover:shadow-[0_0_15px_rgba(244,63,94,0.1)]",
    },
    {
      name: "Snapchat",
      url: "#",
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        setShowSnapchatQR(true);
      },
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2.25c-.718 0-1.385.111-2.001.332-.616.221-1.14.561-1.573 1.018-.432.457-.753.992-.962 1.603-.209.612-.314 1.282-.314 2.012 0 .546.096 1.054.288 1.523.192.469.458.87.798 1.203a3.52 3.52 0 0 1-.951.378c-.378.112-.734.29-1.066.536-.332.246-.612.56-.839.943-.227.383-.393.847-.498 1.393-.105.546-.157 1.185-.157 1.916 0 .432.062.812.186 1.14.124.328.307.604.549.828a2.536 2.536 0 0 0 .861.479c.338.111.716.166 1.134.166.252 0 .504-.029.756-.086.252-.057.486-.145.702-.264-.024.228-.036.474-.036.738 0 .804.141 1.516.423 2.136.282.62.705 1.129 1.269 1.527.564.398 1.26.68 2.088.847.828.167 1.77.25 2.826.25s1.998-.083 2.826-.25c.828-.167 1.524-.449 2.088-.847.564-.398.987-.907 1.269-1.527.282-.62.423-1.332.423-2.136 0-.264-.012-.51-.036-.738.216.119.45.207.702.264s.504.086.756.086c.418 0 .796-.055 1.134-.166a2.536 2.536 0 0 0 .861-.479c.242-.224.425-.5.549-.828a2.433 2.433 0 0 0 .186-1.14c0-.731-.052-1.37-.157-1.916s-.271-1.01-.498-1.393c-.227-.383-.507-.697-.839-.943a3.46 3.46 0 0 0-1.066-.536 3.52 3.52 0 0 1-.951-.378c.34-.333.606-.734.798-1.203.192-.469.288-.977.288-1.523 0-.73-.105-1.4-.314-2.012a4.422 4.422 0 0 0-.962-1.603 4.148 4.148 0 0 0-1.573-1.018A5.727 5.727 0 0 0 12 2.25z" />
        </svg>
      ),
      color: "hover:border-yellow-500/30 hover:shadow-[0_0_15px_rgba(234,179,8,0.1)]",
    },
    {
      name: "GitHub",
      url: `https://github.com/${config.social.github}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      color: "hover:border-zinc-500/30 hover:shadow-[0_0_15px_rgba(113,113,122,0.1)]",
    },
    {
      name: "LinkedIn",
      url: `https://linkedin.com/in/${config.social.linkedin}`,
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.807 0-9.72h3.554v1.378c.43-.664 1.195-1.61 2.91-1.61 2.126 0 3.714 1.389 3.714 4.372v5.58zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.968-1.715 1.197 0 1.916.76 1.94 1.715 0 .953-.743 1.715-1.993 1.715zm1.581 11.597H3.635V9.732h3.283v10.72zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
        </svg>
      ),
      color: "hover:border-blue-500/30 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)]",
    },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300 flex flex-col justify-between py-12 px-4 sm:px-6"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="w-full max-w-md mx-auto flex-1 flex flex-col justify-center animate-fadeIn">
        {/* Profile Card */}
        <div className="text-center mb-8">
          <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-white/10 shadow-xl hover:scale-105 transition-transform duration-300">
            <img
              src="/assets/pp.png"
              alt="Taha Kaçmaz"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">Taha Kaçmaz</h1>
          <p className="text-sm text-zinc-400 font-medium">@tahakacmaz7</p>
          <p className="text-xs text-zinc-500 mt-3.5 max-w-xs mx-auto leading-relaxed">
            Computer Engineering Student at University of Toronto (2026-2030) • Backend Dev
          </p>
        </div>

        {/* Links Section */}
        <div className="space-y-3 mb-10">
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              onClick={link.onClick}
              target={link.url === "/" || link.onClick ? undefined : "_blank"}
              rel="noopener noreferrer"
              className={`w-full flex items-center justify-between p-4 rounded-xl border border-white/10 bg-white/5 dark:bg-white/2 hover:bg-white/10 dark:hover:bg-white/5 transition-all duration-300 group cursor-pointer ${link.color}`}
            >
              <div className="flex items-center gap-3.5">
                <span className="text-zinc-400 group-hover:text-white transition-colors duration-300">
                  {link.icon}
                </span>
                <span className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors duration-300">
                  {link.name}
                </span>
              </div>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all duration-300"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          ))}
        </div>

        {/* Anonymous Mini Note Widget */}
        <div className={`rounded-xl border border-white/10 bg-white/5 dark:bg-white/2 p-5 backdrop-blur-sm relative overflow-hidden ${isDragging ? 'select-none' : ''}`}>
          {/* Invisible Honeypot Field */}
          <input 
            type="text" 
            name="username_hp"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="absolute opacity-0 pointer-events-none" 
            style={{ left: "-9999px" }} 
            tabIndex={-1} 
            autoComplete="off" 
            aria-hidden="true" 
          />

          {!success ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span>Send Mini Note</span>
                </label>
                <span className="text-[10px] text-zinc-500 font-mono">
                  {note.length}/{maxChars}
                </span>
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, maxChars))}
                placeholder="Send an anonym note, feedback, question, or just say hi..."
                rows={3}
                disabled={loading}
                className="w-full text-sm p-3 rounded-lg border border-white/10 bg-white/5 dark:bg-black/20 text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 resize-none transition-all duration-300"
              />
              {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
              
              {/* iOS Style Swipe Slider Verification */}
              {note.trim() ? (
                <div 
                  ref={trackRef}
                  className="relative w-full h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-sm overflow-hidden select-none"
                >
                  {/* Sliding Hint Text */}
                  <span 
                    className="text-xs font-semibold select-none pointer-events-none animate-shimmer"
                    style={{ opacity: Math.max(0.1, 1 - (sliderPos * 1.5) / 100) }}
                  >
                    Slide to send 🚀
                  </span>

                  {/* Filled track reveal */}
                  <div 
                    className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-indigo-500/10 to-indigo-500/30 rounded-full pointer-events-none"
                    style={{ width: `${sliderPos + 40}px` }}
                  />

                  {/* Handle */}
                  <div
                    onPointerDown={handlePointerDown}
                    onPointerMove={handlePointerMove}
                    onPointerUp={handlePointerUp}
                    className="absolute left-1 w-10 h-10 bg-white text-zinc-900 rounded-full flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing select-none"
                    style={{ 
                      transform: `translateX(${sliderPos}px)`,
                      transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
                    }}
                  >
                    {loading ? (
                      <svg className="animate-spin h-4 w-4 text-zinc-950" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    )}
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  disabled={true}
                  className="w-full py-2.5 rounded-lg text-sm font-semibold bg-white/5 text-zinc-500 border border-transparent cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Send Mini Note
                </button>
              )}
            </div>
          ) : (
            <div className="text-center py-6 animate-fadeIn">
              <div className="text-3xl mb-3">📩</div>
              <h3 className="text-sm font-semibold text-white mb-1.5">Note Sent!</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto mb-4">
                Your mini note has been delivered successfully.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-4 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-zinc-300 hover:text-white transition-all duration-200 cursor-pointer"
              >
                Send another note
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Back to Home Link */}
      <div className="w-full max-w-md mx-auto text-center mt-8">
        <a
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Back to main site
        </a>
      </div>

      {/* Snapchat QR Modal */}
      {showSnapchatQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center shadow-2xl relative animate-scaleUp">
            <h3 className="text-lg font-bold text-white mb-2">Snapchat Code</h3>
            <p className="text-xs text-zinc-400 mb-4">Scan the code or click the button below</p>
            
            <div className="bg-[#fffc00] p-4 rounded-xl inline-block mb-6 border border-black/10">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=https://snapchat.com/add/${config.social.snapchat}&color=000000&bgcolor=fffc00`}
                alt="Snapchat QR Code"
                className="w-44 h-44 mx-auto"
              />
            </div>
            
            <div className="space-y-2">
              <a
                href={`https://snapchat.com/add/${config.social.snapchat}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full block py-2.5 rounded-lg bg-[#fffc00] hover:bg-[#e6e200] text-black text-sm font-semibold transition-all duration-200 text-center"
              >
                Add on Snapchat
              </a>
              <button
                onClick={() => setShowSnapchatQR(false)}
                className="w-full py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white border border-white/10 text-sm font-semibold transition-all duration-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes scaleUp {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.35s ease-out forwards;
        }
        .animate-scaleUp {
          animation: scaleUp 0.25s ease-out forwards;
        }
        .animate-shimmer {
          background: linear-gradient(90deg, #71717a 25%, #ffffff 50%, #71717a 75%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s infinite linear;
        }
      `}</style>
    </div>
  );
}
