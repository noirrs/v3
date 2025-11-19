"use client";

import { useState, useEffect } from "react";
import { config } from "@/lib/config";

export default function Home() {
  const [activeSection, setActiveSection] = useState("skills");
  const [projects, setProjects] = useState([]);
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedWork, setExpandedWork] = useState(null);

  useEffect(() => {
    // Fetch data when projects or experience section is accessed
    if (
      (activeSection === "projects" || activeSection === "experience") &&
      projects.length === 0 &&
      works.length === 0
    ) {
      fetchData();
    }
  }, [activeSection]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(config.data.dataUrl);
      if (!response.ok) throw new Error("Failed to fetch data");
      const data = await response.json();
      setProjects(data.projects || []);
      setWorks(data.works || []);
    } catch (error) {
      console.error("Error fetching data:", error);
      setProjects([]);
      setWorks([]);
    } finally {
      setLoading(false);
    }
  };

  const skillCategories = [
    {
      title: "Languages",
      skills: ["TypeScript", "Go", "Dart", "Python", "JavaScript"],
    },
    {
      title: "Backend & Frameworks",
      skills: ["Node.js", "NestJS", "Express.js", "Fastify"],
    },
    {
      title: "Frontend & UI",
      skills: ["React.js", "Next.js", "Flutter", "Tailwind CSS"],
    },
    {
      title: "DevOps & Infrastructure",
      skills: [
        "Docker",
        "Git",
        "GitHub Actions",
        "Azure",
        "AWS",
        "MongoDB",
        "Firebase",
      ],
    },
    {
      title: "Real-time & APIs",
      skills: ["WebSockets", "Socket.io", "REST APIs"],
    },
  ];

  const sections = [
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "resume", label: "Resume" },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      <div className="mt-16 md:mt-24 flex justify-center px-4 sm:px-6 md:px-0">
        <div className="w-full sm:w-11/12 md:w-6/12 max-w-4xl">
          {/* Profile Section - Always Visible */}
          <div className="mb-8 md:mb-12">
            <p
              className="text-3xl sm:text-4xl font-bold mb-2"
              style={{ color: "var(--foreground)" }}
            >
              Taha Kaçmaz
            </p>
            <p
              className="text-base sm:text-lg font-semibold mb-4 drop-shadow-lg"
              style={{ color: "var(--foreground)" }}
            >
              Backend Developer
            </p>
            <p
              className="text-sm sm:text-base leading-relaxed mb-6 md:mb-8"
              style={{ color: "var(--foreground)", opacity: 0.8 }}
            >
              Backend developer with 5+ years of experience building scalable
              applications. Passionate about creating efficient, maintainable
              systems and exploring emerging technologies.
            </p>

            {/* Social Links */}
            <div className="flex gap-4 mb-6 md:mb-8">
              <a
                href={`https://github.com/${config.social.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs sm:text-sm transition-all duration-300"
                title="GitHub"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
              </a>
              <a
                href={`https://linkedin.com/in/${config.social.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs sm:text-sm transition-all duration-300"
                title="LinkedIn"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.722-2.004 1.418-.103.249-.129.597-.129.946v5.441h-3.554s.05-8.807 0-9.72h3.554v1.378c.43-.664 1.195-1.61 2.91-1.61 2.126 0 3.714 1.389 3.714 4.372v5.58zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.955.77-1.715 1.968-1.715 1.197 0 1.916.76 1.94 1.715 0 .953-.743 1.715-1.993 1.715zm1.581 11.597H3.635V9.732h3.283v10.72zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
                </svg>
                LinkedIn
              </a>
              <a
                href={`mailto:${config.social.email}`}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs sm:text-sm transition-all duration-300"
                title="Email"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                Email
              </a>
            </div>

            {/* Navigation Tabs */}
            <div className="flex gap-2 sm:gap-3 pb-6 overflow-x-auto scrollbar-hide">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap rounded-lg cursor-pointer transition-all duration-300 ${
                    activeSection === section.id
                      ? "bg-white/10 text-white border border-white/20 shadow-lg backdrop-blur-md"
                      : "text-zinc-400 border border-transparent hover:text-zinc-300 hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>
          </div>

          {/* Skills Section */}
          {activeSection === "skills" && (
            <div className="animate-fadeIn mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8">
                Skills
              </h2>
              <div className="space-y-4 md:space-y-6">
                {skillCategories.map((category, idx) => (
                  <div key={idx}>
                    <h3 className="text-xs sm:text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-3">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 sm:gap-2.5">
                      {category.skills.map((skill, skillIdx) => (
                        <div
                          key={skillIdx}
                          className="px-2.5 sm:px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs sm:text-sm text-zinc-300 hover:text-white transition-all duration-300 backdrop-blur-sm cursor-default"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education Section */}
          {activeSection === "education" && (
            <div className="animate-fadeIn mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8">
                Education
              </h2>
              <div className="space-y-6">
                {/* Primary Education */}
                <div className="border-l-2 border-white/20 pl-4 sm:pl-6 py-2">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2 sm:gap-0">
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white">
                        Lycée Français de Galatasaray
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 mt-1">
                        Label FrancEducation • Bilingual Secondary Education
                        (French-Turkish)
                      </p>
                      <p className="text-xs sm:text-sm text-zinc-400">
                        Science and Mathematics Track
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <span className="text-xs sm:text-sm text-zinc-400">
                          DELF B2
                        </span>
                        <span className="text-xs font-semibold bg-white/5 px-2.5 py-1 rounded-full text-zinc-300 border border-white/10">
                          French Proficiency
                        </span>
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm text-zinc-500 font-medium whitespace-nowrap">
                      2022 - 2026
                    </span>
                  </div>
                </div>

                {/* AP Section */}
                <div className="border-l-2 border-white/20 pl-4 sm:pl-6 py-2">
                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
                      Advanced Placement (AP)
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mb-3">
                      Self-study student
                    </p>

                    {/* AP Scores */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-zinc-300">AP Calculus BC</span>
                        <span className="font-semibold bg-white/5 px-3 py-1 rounded-full text-zinc-300 border border-white/10">
                          5
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-zinc-300">
                          AP Computer Science
                        </span>
                        <span className="font-semibold bg-white/5 px-3 py-1 rounded-full text-zinc-300 border border-white/10">
                          4
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-zinc-300">
                          AP Comparative Government & Politics
                        </span>
                        <span className="font-semibold bg-white/5 px-3 py-1 rounded-full text-zinc-300 border border-white/10">
                          4
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-zinc-300">
                          AP French Language & Culture
                        </span>
                        <span className="font-semibold bg-white/5 px-3 py-1 rounded-full text-zinc-300 border border-white/10">
                          4
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* SAT Score */}
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 gap-2 sm:gap-0">
                      <span className="text-base sm:text-lg font-semibold text-white">
                        SAT
                      </span>
                      <span className="text-2xl font-bold text-white">
                        1440
                      </span>
                    </div>
                    <div className="space-y-1 text-xs sm:text-sm">
                      <div className="flex justify-between text-zinc-400">
                        <span>Reading & Writing</span>
                        <span className="text-zinc-300">700</span>
                      </div>
                      <div className="flex justify-between text-zinc-400">
                        <span>Math</span>
                        <span className="text-zinc-300">740</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Section */}
          {activeSection === "projects" && (
            <div className="animate-fadeIn mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8">
                Projects
              </h2>
              {loading && projects.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-zinc-400">Loading projects...</div>
                </div>
              ) : (
                <div className="space-y-3">
                  {/* Research Projects */}
                  {config.research &&
                    config.research.map((project, idx) => (
                      <div
                        key={`research-${idx}`}
                        className="rounded-lg border border-white/10 bg-white/2 hover:bg-white/5 transition-all duration-300 overflow-hidden relative"
                      >
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 min-h-32">
                          {/* Emoji Section */}
                          <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-md overflow-hidden flex items-center justify-center bg-white/5 text-3xl sm:text-4xl">
                            {project.emoji}
                          </div>

                          {/* Content Section */}
                          <div className="flex-1 min-w-0 pr-10 sm:pr-12 flex flex-col">
                            <div className="flex-1">
                              <h3 className="text-sm sm:text-base font-semibold text-white">
                                {project.name}
                              </h3>
                              <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                                {project.description}
                              </p>
                            </div>
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center mt-2 sm:mt-3 text-xs">
                              <span className="px-1.5 py-0.5 rounded-full bg-white/5 text-zinc-500 border border-white/10">
                                {project.status}
                              </span>
                              <span className="text-zinc-600">•</span>
                              <span className="text-zinc-500">
                                {project.type}
                              </span>
                              <span className="text-zinc-600">•</span>
                              <span className="text-zinc-500">
                                {project.title}
                              </span>
                            </div>
                          </div>

                          {/* Visit Icon Button - Bottom Right */}
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 h-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300"
                            title="Visit project"
                          >
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                            </svg>
                          </a>
                        </div>
                      </div>
                    ))}

                  {/* Regular Projects from GitHub */}
                  {[...projects].reverse().map((project, idx) => (
                    <div
                      key={`project-${idx}`}
                      className="rounded-lg border border-white/10 bg-white/2 hover:bg-white/5 transition-all duration-300 overflow-hidden relative"
                    >
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 p-3 sm:p-4 min-h-32">
                        {/* Image Section */}
                        {project.image && (
                          <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-md overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        {/* Content Section */}
                        <div className="flex-1 min-w-0 pr-10 sm:pr-12 flex flex-col">
                          <div className="flex-1">
                            <h3 className="text-sm sm:text-base font-semibold text-white">
                              {project.name}
                            </h3>
                            <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                              {project.description}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2 items-center mt-2 sm:mt-3 text-xs">
                            <span className="px-1.5 py-0.5 rounded-full bg-white/5 text-zinc-500 border border-white/10">
                              {project.status}
                            </span>
                            <span className="text-zinc-600">•</span>
                            <span className="text-zinc-500">
                              {project.type}
                            </span>
                            <span className="text-zinc-600">•</span>
                            <span className="text-zinc-500">
                              {project.title}
                            </span>
                          </div>
                        </div>

                        {/* Visit Icon Button - Bottom Right */}
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 w-8 h-8 flex items-center justify-center rounded-md bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all duration-300"
                          title="Visit project"
                        >
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {projects.length === 0 && config.research.length === 0 && (
                <div className="text-zinc-400">
                  <p>No projects found. Check back soon!</p>
                </div>
              )}
            </div>
          )}

          {/* Experience Section */}
          {activeSection === "experience" && (
            <div className="animate-fadeIn mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8">
                Work Experience
              </h2>
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-zinc-400">Loading experience...</div>
                </div>
              ) : works.length > 0 ? (
                <div className="space-y-3">
                  {works.map((work, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        setExpandedWork(expandedWork === idx ? null : idx)
                      }
                      className="w-full text-left rounded-lg border border-white/10 bg-white/2 hover:bg-white/5 transition-all duration-300 p-3 sm:p-4 pb-2.5 sm:pb-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm sm:text-base font-semibold text-white">
                            {work.position}
                          </h3>
                          <p className="text-xs text-zinc-500 mt-0.5">
                            {work.company}
                          </p>
                        </div>
                        <div className="flex items-start justify-between sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto shrink-0">
                          <span className="text-xs text-zinc-600">
                            {work.duration}
                          </span>
                          <span
                            className={`text-zinc-400 transition-transform duration-300 shrink-0 ${
                              expandedWork === idx ? "rotate-180" : ""
                            }`}
                          >
                            ▼
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-500 mb-2">
                        {work.location}
                      </p>

                      {expandedWork === idx && (
                        <div className="mt-3 pt-3 border-t border-white/10 space-y-3 animate-fadeIn">
                          <p className="text-sm text-zinc-300 leading-relaxed">
                            {work.description}
                          </p>
                          {work.technologies &&
                            work.technologies.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {work.technologies.map((tech, techIdx) => (
                                  <span
                                    key={techIdx}
                                    className="text-xs px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-zinc-300 border border-white/10 hover:border-white/20 transition-all duration-300 font-medium"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            )}
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="text-zinc-400">
                  <p>No experience found.</p>
                </div>
              )}
            </div>
          )}

          {/* Resume Section */}
          {activeSection === "resume" && (
            <div className="animate-fadeIn mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 md:mb-8">
                Resume
              </h2>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm sm:text-base transition-all duration-300"
              >
                Download CV
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Add CSS for fade-in animation */}
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
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
