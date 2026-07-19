"use client";

import React, { useState, useEffect, useRef } from "react";

// Virtual File Contents
const VIRTUAL_FILES: Record<string, string> = {
  "about.md": `# Giovani A. Alday

Web and AI Automation Developer
San Leonardo, Nueva Ecija, Philippines

## Education
- **Bachelor of Science in Information Technology**
  *Major: Web System Technology*
  Nueva Ecija University of Science and Technology (NEUST) | 2022 – 2026 (Graduated in 2026)
  *Relevant Coursework:* Data Structures & Algorithms, Operating Systems, Database Systems, Web Development

## Strengths
- Fast learner & self-taught developer
- Strong focus on AI, Web development, and workflow automation
- Hardware/software troubleshooting & support experience
- UI/UX design and graphic design
- Strong troubleshooting skills`,

  "certifications.md": `# Certifications

- **IT Specialist - HTML and CSS**
  *Issued by:* Certiport (a Pearson VUE business)
  *Credential Link:* [Verify on Credly](https://www.credly.com/badges/8aff742b-77f4-4eda-b776-60f6afd5bb33)

- **Computer Systems Servicing (CSS) NC II**
  *Issued by:* TESDA (Technical Education and Skills Development Authority)
  *Training Center:* City College of Technology and Trade Inc.
  *Year:* 2024
  *Skills covered:* Computer assembly, networking setups, OS installation, system diagnostics, and hardware/software troubleshooting.`,

  "experience.md": `# Work Experience

- **AI Automation Developer (Personal Projects)** | *Work From Home*
  *August 2025 – Present*
  - Design workflow automations using n8n and connect cloud APIs.
  - Build webhook-driven, AI-assisted business automations.
  - Integrate databases and optimize workflow performance.

- **IT Support** | *Santa Rosa, Nueva Ecija*
  *June 2025 – August 2025*
  - Provided technical support and OS troubleshooting.
  - Handled Level 1 Help Desk / Service Desk operations and networking.

- **OJT Trainee** | *LGU Santa Rosa*
  *January 2026 – April 2026*
  - Assisted clients with Cedula forms and business permits.
  - Maintained/repaired computer hardware and software.

- **Redrawer / Cleaner** | *Work From Home*
  *August 2020 – Present*
  - Redraw manhwa panels and clean dialogue bubbles.

- **Website UI/UX Redesigner** | *Independent Clients*
  *February 2024 – Present*

- **Graphic Designer** | *Independent Clients*
  *February 2024 – Present*`,

  "projects.json": `[
  {
    "name": "IT Help Desk Ticketing System",
    "description": "A comprehensive ticket logging and tracking system.",
    "tech": ["C#", ".NET", "SQL Server"],
    "features": [
      "Ticket logging and tracking",
      "Technician reports",
      "Resolution time reports"
    ]
  },
  {
    "name": "Spotify UI Inside Stardew Valley",
    "description": "An in-game Spotify integration overlay.",
    "tech": ["C#", "Stardew Modding API (SMAPI)"],
    "features": [
      "Spotify search",
      "Queue management",
      "Play/Pause integrated inside the game"
    ]
  },
  {
    "name": "Web-Based Voting System",
    "description": "Local deployment voting management system for Colegio de San Leonardo Supreme Student Council.",
    "tech": ["PHP", "MySQL", "Tailwind CSS"],
    "features": [
      "Local deployment",
      "Voting management"
    ]
  },
  {
    "name": "Chrome Extension + n8n Automation",
    "description": "Automated system to extract highlighted text and store it in spreadsheets.",
    "tech": ["JavaScript", "n8n", "Webhooks"],
    "features": [
      "Detect highlighted text and extract fields",
      "Send data to n8n webhook",
      "Format data and store into Excel / Google Sheets"
    ]
  },
  {
    "name": "Server Backup Verification System",
    "description": "Automated system for monitoring and sending alerts for server backups.",
    "tech": ["Python", "API Integrations"],
    "features": [
      "Backup monitoring and automated logging",
      "Email and Microsoft Teams alerts"
    ]
  },
  {
    "name": "New File Notifier",
    "description": "Auto-notify teams when new files are uploaded to Google Drive.",
    "tech": ["Node.js", "Google Drive API"],
    "features": [
      "Monitor Google Drive folders",
      "Notify team when new files are uploaded"
    ]
  }
]`,

  "skills.csv": `Category,Skills,Level
Programming Languages,"C#, JavaScript, TypeScript, PHP, Python (Basic)",Advanced
Frontend,"React, Next.js, Angular, Ionic, HTML, CSS, Tailwind CSS",Expert
Backend,"Node.js, Laravel, .NET",Advanced
Database,"MySQL, SQL Server, MariaDB",Advanced
Automation,"n8n, Workflow Automation, AI Integration, Webhooks, REST APIs, JSON",Expert
Cloud,"AWS (Basic)",Basic
Development Tools,"Git, GitHub, Docker, VS Code, Visual Studio",Advanced
Design,"Figma, Adobe Photoshop, Adobe Illustrator",Advanced
Office,"Microsoft Word, Microsoft Excel, Microsoft PowerPoint",Expert`,

  "interests.json": `{
  "development_interests": [
    "AI Automation",
    "Workflow Automation",
    "Web Development",
    "Full Stack Development",
    "Game Development",
    "Chrome Extension Development",
    "AI Integrations",
    "Desktop Applications",
    "System Utilities"
  ],
  "gaming_and_modding": {
    "games": [
      "Stardew Valley",
      "Genshin Impact",
      "Persona 4 Golden"
    ],
    "modding": [
      "Stardew Valley (SMAPI)",
      "C# Mods"
    ]
  },
  "career_goals": [
    "AI Automation Developer",
    "Full Stack Developer",
    "Software Engineer",
    "Web Developer",
    "Workflow Automation Engineer",
    "Freelance Developer",
    "Upwork Freelancer"
  ],
  "languages": [
    "English",
    "Filipino"
  ],
  "activities": [
    {
      "event": "Regional Assembly on Information Technology Education (RAITE)",
      "location": "Cabanatuan City",
      "date": "October 17, 2025"
    }
  ]
}`,

  "contact.sh": `#!/bin/bash
# Giovani Alday's Contact & Socials

echo "===================================================="
echo "                GIOVANI ALDAY                       "
echo "===================================================="
echo "Email:     aldaygiovani@gmail.com"
echo "LinkedIn:  https://www.linkedin.com/in/giovani-alday-096a2a3a3"
echo "Phone:     +63 929 594 3822"
echo "Location:  San Leonardo, Nueva Ecija, Philippines"
echo "===================================================="`
};

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "system";
}

export default function Home() {
  // App States
  const [activeFile, setActiveFile] = useState<string>("about.md");
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([
    { text: "port-OS Kernel Version 1.0.0 (x86_64)", type: "system" },
    { text: "Copyright (c) 2026 Giovani Alday. All rights reserved.", type: "system" },
    { text: "Mounting virtual file system /dev/sda1 ... OK", type: "system" },
    { text: "Type 'help' for a list of commands, or click files in the Sidebar.", type: "system" },
    { text: "", type: "output" }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);


  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalLines]);

  // Focus terminal input
  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusTerminal();
    setIsInputFocused(true);
  }, []);


  // Format file contents for neat screen printing
  const getFileFormattedOutput = (fileName: string): string => {
    const raw = VIRTUAL_FILES[fileName];
    if (!raw) return `cat: ${fileName}: No such file or directory`;
    return raw;
  };

  // Command Executor
  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) {
      setTerminalLines(prev => [...prev, { text: "guest@portfolio:~$ ", type: "input" }]);
      return;
    }

    const args = trimmed.split(/\s+/);
    const cmd = args[0].toLowerCase();
    const commandArg = args[1];

    let responseLines: TerminalLine[] = [];

    // Add to history
    setHistory(prev => [trimmed, ...prev.filter(h => h !== trimmed)]);
    setHistoryIndex(-1);

    // Prompt line in stdout
    const promptLine: TerminalLine = { text: `guest@portfolio:~$ ${trimmed}`, type: "input" };

    switch (cmd) {
      case "help":
        responseLines = [
          { text: "Available commands:", type: "output" },
          { text: "  ls             List virtual files available", type: "output" },
          { text: "  cat [file]     Display contents of a file (e.g., cat about.md)", type: "output" },
          { text: "  about          Short profile info", type: "output" },
          { text: "  certifications Show professional certifications", type: "output" },
          { text: "  experience     Show detailed work experience", type: "output" },
          { text: "  projects       List personal & software projects", type: "output" },
          { text: "  skills         Show matrix of skills", type: "output" },
          { text: "  interests      Show career goals, languages, activities & gaming info", type: "output" },
          { text: "  contact        Show social links and email", type: "output" },
          { text: "  clear          Clear the terminal screen", type: "output" },
          { text: "  help           Show this list of commands", type: "output" }
        ];
        break;
      case "ls":
        responseLines = [{ text: "Mode        Size      Name", type: "system" }];
        Object.keys(VIRTUAL_FILES).forEach(name => {
          const isSh = name.endsWith(".sh");
          const size = `${VIRTUAL_FILES[name].length} B`.padEnd(9);
          const mode = isSh ? "-rwxr-xr-x" : "-rw-r--r--";
          responseLines.push({ text: `${mode}  ${size} ${name}`, type: isSh ? "success" : "output" });
        });
        break;
      case "cat":
        if (!commandArg) {
          responseLines = [{ text: "Usage: cat [filename] (e.g. cat about.md)", type: "error" }];
        } else if (VIRTUAL_FILES[commandArg]) {
          setActiveFile(commandArg);
          const lines = getFileFormattedOutput(commandArg).split("\n");
          responseLines = lines.map(line => ({ text: line, type: "output" }));
        } else {
          responseLines = [{ text: `cat: ${commandArg}: No such file or directory`, type: "error" }];
        }
        break;
      case "about":
        setActiveFile("about.md");
        responseLines = getFileFormattedOutput("about.md")
          .split("\n")
          .map(line => ({ text: line, type: "output" }));
        break;
      case "certifications":
        setActiveFile("certifications.md");
        responseLines = getFileFormattedOutput("certifications.md")
          .split("\n")
          .map(line => ({ text: line, type: "output" }));
        break;
      case "experience":
        setActiveFile("experience.md");
        responseLines = getFileFormattedOutput("experience.md")
          .split("\n")
          .map(line => ({ text: line, type: "output" }));
        break;
      case "projects":
        setActiveFile("projects.json");
        try {
          const parsed = JSON.parse(VIRTUAL_FILES["projects.json"]);
          responseLines = [{ text: "--- Selected Projects ---", type: "system" }];
          parsed.forEach((proj: any) => {
            responseLines.push({ text: `[${proj.name}]`, type: "success" });
            responseLines.push({ text: `  Description: ${proj.description}`, type: "output" });
            responseLines.push({ text: `  Tech Stack:  ${proj.tech.join(", ")}`, type: "output" });
            if (proj.features) {
              responseLines.push({ text: `  Features:`, type: "system" });
              proj.features.forEach((feat: string) => {
                responseLines.push({ text: `    - ${feat}`, type: "output" });
              });
            }
            responseLines.push({ text: "", type: "output" });
          });
        } catch (e) {
          responseLines = [{ text: "Error parsing projects.json", type: "error" }];
        }
        break;
      case "skills":
        setActiveFile("skills.csv");
        const csvLines = VIRTUAL_FILES["skills.csv"].split("\n");
        responseLines = [];
        csvLines.forEach((line, idx) => {
          if (!line.trim()) return;
          const parts: string[] = [];
          let current = "";
          let inQuotes = false;
          for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '"') {
              inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
              parts.push(current);
              current = "";
            } else {
              current += char;
            }
          }
          parts.push(current);

          if (idx === 0) {
            const col1 = parts[0]?.padEnd(23);
            const col2 = parts[1]?.padEnd(50);
            const col3 = parts[2] || "Level";
            responseLines.push({ text: `${col1} | ${col2} | ${col3}`, type: "system" });
            responseLines.push({ text: `${"-".repeat(23)}+${"-".repeat(52)}+${"-".repeat(15)}`, type: "system" });
          } else {
            const col1 = parts[0]?.padEnd(23);
            const col2 = parts[1]?.padEnd(50);
            const level = parts[2]?.trim() || "";
            let progress = "[░░░░░░░░]";
            if (level.toLowerCase().includes("expert")) progress = "[████████] Expert";
            else if (level.toLowerCase().includes("advanced")) progress = "[███████░] Advanced";
            else if (level.toLowerCase().includes("intermediate")) progress = "[█████░░░] Intermediate";
            else if (level.toLowerCase().includes("basic")) progress = "[██░░░░░░] Basic";
            responseLines.push({ text: `${col1} | ${col2} | ${progress}`, type: "output" });
          }
        });
        break;
      case "interests":
        setActiveFile("interests.json");
        responseLines = getFileFormattedOutput("interests.json")
          .split("\n")
          .map(line => ({ text: line, type: "output" }));
        break;
      case "contact":
        setActiveFile("contact.sh");
        responseLines = getFileFormattedOutput("contact.sh")
          .split("\n")
          .map(line => ({ text: line, type: "output" }));
        break;
      case "clear":
        setTerminalLines([]);
        setInputValue("");
        return;
      default:
        responseLines = [
          { text: `port-OS: command not found: '${cmd}'.`, type: "error" },
          { text: "Type 'help' to see list of valid commands.", type: "output" }
        ];
        break;
    }

    setTerminalLines(prev => [...prev, promptLine, ...responseLines, { text: "", type: "output" }]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputValue);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInputValue(history[nextIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputValue(history[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputValue("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = ["help", "ls", "cat", "about", "certifications", "experience", "projects", "skills", "interests", "contact", "clear"].filter(
        c => c.startsWith(inputValue.toLowerCase())
      );
      if (matches.length === 1) {
        setInputValue(matches[0] + " ");
      } else if (matches.length > 1) {
        // Show options
        setTerminalLines(prev => [
          ...prev,
          { text: `guest@portfolio:~$ ${inputValue}`, type: "input" },
          { text: matches.join("   "), type: "output" }
        ]);
      }
    }
  };

  // Click file from Explorer
  const handleFileClick = (fileName: string) => {
    setActiveFile(fileName);
    let runCommandName = `cat ${fileName}`;
    const baseName = fileName.substring(0, fileName.indexOf("."));
    if (["about", "certifications", "experience", "projects", "skills", "interests", "contact"].includes(baseName)) {
      runCommandName = baseName;
    }
    handleCommand(runCommandName);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-4 md:p-8 min-h-screen bg-slate-300">

      {/* Portfolio Main Window */}
      <div
        className="flex flex-col w-full max-w-6xl h-[85vh] min-h-[550px] bg-slate-100 border-2 border-slate-900 rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
        onClick={focusTerminal}
      >

        {/* Window Top Titlebar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-200 border-b-2 border-slate-900 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3.5 h-3.5 rounded-full border border-slate-950 bg-red-400 cursor-pointer hover:opacity-80" onClick={() => handleCommand("clear")} title="Clear Terminal" />
            <div className="w-3.5 h-3.5 rounded-full border border-slate-950 bg-yellow-400 cursor-pointer hover:opacity-80" onClick={() => setIsSidebarOpen(!isSidebarOpen)} title="Toggle Sidebar" />
            <div className="w-3.5 h-3.5 rounded-full border border-slate-950 bg-green-400 cursor-pointer hover:opacity-80" onClick={() => handleCommand("help")} title="Show Help" />
          </div>
          <div className="text-xs md:text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>guest@port-os:~</span>
            <span className="px-1 text-[10px] bg-slate-900 text-slate-100 rounded">SESSION ACTIVE</span>
          </div>
          <div className="text-xs text-slate-600 hidden sm:block">
            Ping: 12ms | VFS: /dev/sda1
          </div>
        </div>

        {/* Window Sub-navigation / Shortcut Buttons */}
        <div className="flex items-center justify-between gap-2 px-4 py-1.5 bg-slate-50 border-b border-slate-900/10 text-xs overflow-x-auto select-none">
          <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
            <button
              onClick={() => handleCommand("help")}
              className="px-2 py-0.5 border border-slate-900/20 hover:border-slate-900 hover:bg-slate-200 rounded text-slate-800 transition"
            >
              ? help
            </button>
            {Object.keys(VIRTUAL_FILES).map((fileName) => {
              const isExecutable = fileName.endsWith(".sh");
              const icon = isExecutable ? "⚙️" : "📄";
              const isSelected = activeFile === fileName;
              return (
                <button
                  key={fileName}
                  onClick={() => handleFileClick(fileName)}
                  className={`px-2 py-0.5 border rounded transition ${isSelected ? "border-slate-900 bg-slate-900 text-slate-100" : "border-slate-900/20 hover:border-slate-900 hover:bg-slate-200 text-slate-800"}`}
                >
                  {icon} {fileName}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => handleCommand("clear")}
            className="px-2 py-0.5 border border-red-900/20 text-red-700 hover:border-red-950 hover:bg-red-50 rounded whitespace-nowrap"
          >
            clear screen
          </button>
        </div>

        {/* Outer Split Pane Layout */}
        <div className="flex flex-1 overflow-hidden min-h-0">

          {/* Collapsible Left Sidebar (Workspace Explorer) */}
          {isSidebarOpen && (
            <div className="hidden md:flex flex-col w-56 bg-slate-200/60 border-r border-slate-900 select-none">
              <div className="px-3 py-2 bg-slate-200 border-b border-slate-900 text-xs font-bold uppercase tracking-wider text-slate-800">
                Workspace Explorer
              </div>
              <div className="flex-1 p-2 space-y-1 overflow-y-auto text-sm text-slate-800 font-mono">
                <div className="flex items-center gap-1 font-bold text-slate-900 py-1">
                  <span>📂</span>
                  <span>portfolio-v1</span>
                </div>
                <div className="pl-4 space-y-1">
                  {Object.keys(VIRTUAL_FILES).map((fileName) => {
                    const isExecutable = fileName.endsWith(".sh");
                    const icon = isExecutable ? "⚙️" : "📄";
                    const activeClass = activeFile === fileName ? "bg-slate-300 font-bold" : "hover:bg-slate-200";
                    const textClass = isExecutable ? "text-green-800 font-semibold" : "";
                    return (
                      <button
                        key={fileName}
                        onClick={() => handleFileClick(fileName)}
                        className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded transition-colors ${activeClass}`}
                      >
                        <span>{icon}</span>
                        <span className={`truncate ${textClass}`}>{fileName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="p-2 border-t border-slate-900/10 text-[10px] text-slate-500 font-mono">
                System: Localhost<br />
                User: guest
              </div>
            </div>
          )}

          {/* Right Area: Text Editor (Top) & Terminal console (Bottom) */}
          <div className="flex flex-col flex-1 min-w-0">

            {/* Top Pane: Vim/Nano Mock Text File Viewer */}
            <div className="flex flex-col flex-1 bg-slate-50 border-b border-slate-900 overflow-hidden min-h-0">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-200 border-b border-slate-900 select-none text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-bold">📝 FILE VIEWER</span>
                  <span className="text-slate-900/40">|</span>
                  <span className="font-mono text-slate-900 bg-slate-300/60 px-1.5 rounded">{activeFile}</span>
                </div>
                <div className="text-[10px] font-mono uppercase bg-slate-900/10 px-1 rounded text-slate-800">
                  Read Only
                </div>
              </div>

              {/* Mock Editor Contents */}
              <div className="flex-1 p-4 font-mono text-xs md:text-sm overflow-y-auto bg-slate-50 text-slate-900 leading-relaxed whitespace-pre-wrap select-text">
                {activeFile.endsWith(".json") ? (
                  // Simple syntax highlit mockup for JSON
                  <div className="text-slate-900">
                    {VIRTUAL_FILES[activeFile].split("\n").map((line, idx) => (
                      <div key={idx} className="flex">
                        <span className="w-8 select-none text-slate-400 text-right pr-3">{idx + 1}</span>
                        <span>
                          {line.split(/(:\s*".*?"|:\s*\d+|:\s*\[|:\s*\{)/).map((part, pIdx) => {
                            if (part.startsWith(': "') || part.startsWith(': ')) {
                              return <span key={pIdx} className="text-blue-800 font-bold">{part}</span>;
                            }
                            if (part.trim().startsWith('"')) {
                              return <span key={pIdx} className="text-violet-850 font-bold">{part}</span>;
                            }
                            return <span key={pIdx}>{part}</span>;
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : activeFile.endsWith(".sh") ? (
                  // Shell highlighting
                  <div>
                    {VIRTUAL_FILES[activeFile].split("\n").map((line, idx) => (
                      <div key={idx} className="flex">
                        <span className="w-8 select-none text-slate-400 text-right pr-3">{idx + 1}</span>
                        <span>
                          {line.startsWith("#") ? (
                            <span className="text-slate-500 italic">{line}</span>
                          ) : line.startsWith("echo") ? (
                            <span>
                              <span className="text-blue-900 font-bold">echo</span>{" "}
                              <span className="text-emerald-950 font-semibold">{line.slice(5)}</span>
                            </span>
                          ) : (
                            line
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  // Plain text or markdown
                  <div>
                    {VIRTUAL_FILES[activeFile].split("\n").map((line, idx) => (
                      <div key={idx} className="flex">
                        <span className="w-8 select-none text-slate-400 text-right pr-3">{idx + 1}</span>
                        <span className={line.startsWith("#") ? "text-slate-950 font-bold text-base border-b border-slate-900/10 pb-0.5" : line.startsWith("-") ? "text-slate-800" : ""}>{line}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vim-like Statusbar */}
              <div className="flex items-center justify-between px-3 py-1 bg-slate-900 text-slate-100 font-mono text-[10px] select-none">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 font-extrabold px-1">VIEW</span>
                  <span>{activeFile}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span>UTF-8</span>
                  <span>LF</span>
                  <span>{VIRTUAL_FILES[activeFile]?.split("\n").length} Lines</span>
                  <span className="bg-slate-800 px-1">100%</span>
                </div>
              </div>
            </div>

            {/* Bottom Pane: Interactive Terminal Screen */}
            <div className="flex flex-col h-56 md:h-64 bg-slate-950 text-slate-200 border-t border-slate-900 overflow-hidden font-mono text-xs md:text-sm select-text">

              <div className="flex items-center justify-between px-3 py-1 bg-slate-900 text-slate-300 text-[10px] select-none">
                <span>🐚 BASH INTERACTIVE SHELL</span>
                <span className="text-[9px] text-slate-500">Press [TAB] for autocomplete | ↑↓ history</span>
              </div>

              {/* Scrollable output lines */}
              <div className="flex-1 p-3 overflow-y-auto space-y-1">
                {terminalLines.map((line, index) => {
                  let colorClass = "text-slate-300";
                  if (line.type === "input") colorClass = "text-slate-100 font-semibold";
                  else if (line.type === "system") colorClass = "text-slate-500";
                  else if (line.type === "error") colorClass = "text-red-400";
                  else if (line.type === "success") colorClass = "text-green-400 font-medium";

                  return (
                    <div key={index} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
                      {line.text}
                    </div>
                  );
                })}
                <div ref={terminalEndRef} />
              </div>

              {/* Command Input Area */}
              <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border-t border-slate-800">
                <span className="text-green-400 font-bold select-none whitespace-nowrap">guest@portfolio:~$</span>
                <div className="flex-1 relative flex items-center">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    className="w-full bg-transparent text-slate-100 focus:outline-none caret-transparent"
                    autoFocus
                    placeholder="Type command here..."
                    maxLength={100}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                  />
                  {/* Custom blinking terminal cursor */}
                  <span
                    className="absolute h-4 w-2.5 bg-slate-100 animate-cursor-blink"
                    style={{
                      left: `${Math.min(inputValue.length, 60) * 8.4}px`, // Simple estimation for char offset
                      display: isInputFocused ? "inline-block" : "none"
                    }}
                  />
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Info Sub-Label */}
      <p className="mt-4 text-xs font-mono text-slate-700/60 select-none text-center">
        port-OS terminal-portfolio (c) 2026. Hit [Tab] for options. Click the file list in sidebar to navigate quickly.
      </p>

    </div>
  );
}
