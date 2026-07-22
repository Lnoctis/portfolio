"use client";

import React, { useState, useEffect, useRef } from "react";

// --- VFS Data Models & Initial State ---
interface VFSNode {
  type: "file" | "dir";
  content?: string;
  children?: Record<string, VFSNode>;
  mode?: string;
}

const INITIAL_VFS: Record<string, VFSNode> = {
  home: {
    type: "dir",
    children: {
      gio: {
        type: "dir",
        children: {
          "about.md": {
            type: "file",
            mode: "-rw-r--r--",
            content: `# Giovani A. Alday

Web and AI Automation Developer
San Leonardo, Nueva Ecija, Philippines

## Education
- **Bachelor of Science in Information Technology**
  *Major: Web System Technology*
  Nueva Ecija University of Science and Technology (NEUST) | 2022 – 2026 (Graduated 2026)

## Strengths
- Fast learner & self-taught developer
- Strong focus on AI, Web development, and workflow automation
- Hardware/software troubleshooting & support experience
- UI/UX design and graphic design
- Strong troubleshooting skills`
          },
          "experience.md": {
            type: "file",
            mode: "-rw-r--r--",
            content: `# Work Experience

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
  *February 2024 – Present*`
          },
          "certifications.md": {
            type: "file",
            mode: "-rw-r--r--",
            content: `# Certifications

- **IT Specialist - HTML and CSS**
  *Issued by:* Certiport (a Pearson VUE business)
  *Credential Link:* https://www.credly.com/badges/8aff742b-77f4-4eda-b776-60f6afd5bb33

- **Computer Systems Servicing (CSS) NC II**
  *Issued by:* TESDA (Technical Education and Skills Development Authority)
  *Training Center:* City College of Technology and Trade Inc.
  *Year:* 2024
  *Skills covered:* Computer assembly, networking setups, OS installation, system diagnostics, hardware/software troubleshooting.`
          },
          "skills.csv": {
            type: "file",
            mode: "-rw-r--r--",
            content: `Category,Skills,Level
Programming Languages,"C#, JavaScript, TypeScript, PHP, Python (Basic)",Advanced
Frontend,"React, Next.js, Angular, Ionic, HTML, CSS, Tailwind CSS",Expert
Backend,"Node.js, Laravel, .NET",Advanced
Database,"MySQL, SQL Server, MariaDB",Advanced
Automation,"n8n, Workflow Automation, AI Integration, Webhooks, REST APIs, JSON",Expert
Cloud,"AWS (Basic)",Basic
Development Tools,"Git, GitHub, Docker, VS Code, Visual Studio",Advanced
Design,"Figma, Adobe Photoshop, Adobe Illustrator",Advanced
Office,"Microsoft Word, Microsoft Excel, Microsoft PowerPoint",Expert`
          },
          projects: {
            type: "dir",
            children: {
              "chrome-extension.json": {
                type: "file",
                mode: "-rw-r--r--",
                content: `{
  "id": "chrome-extension",
  "title": "Chrome Extension + n8n Automation",
  "github": "https://github.com/Lnoctis/cect-n8n",
  "description": "Automated system to extract highlighted text and store it in spreadsheets.",
  "tech": ["JavaScript", "n8n", "Webhooks"],
  "features": [
    "Detect highlighted text and extract fields",
    "Send data to n8n webhook",
    "Format data and store into Excel / Google Sheets"
  ]
}`
              },
              "voting-system.json": {
                type: "file",
                mode: "-rw-r--r--",
                content: `{
  "id": "voting-system",
  "title": "Web-Based Voting System",
  "github": "https://github.com/giovani-alday/voting-system",
  "description": "Local deployment voting management system for Colegio de San Leonardo Supreme Student Council.",
  "tech": ["PHP", "MySQL", "Tailwind CSS"],
  "features": [
    "Local deployment",
    "Voting management and tally reports"
  ]
}`
              },
              "memo-app.json": {
                type: "file",
                mode: "-rw-r--r--",
                content: `{
  "id": "memo-app",
  "title": "IT Help Desk & Memo App System",
  "github": "https://github.com/giovani-alday/memo-app",
  "description": "A comprehensive ticket logging, memo dispatching, and tracking system.",
  "tech": ["C#", ".NET", "SQL Server"],
  "features": [
    "Ticket logging and memo tracking",
    "Technician reports",
    "Resolution time reports"
  ]
}`
              },
              "spotify-tab.json": {
                type: "file",
                mode: "-rw-r--r--",
                content: `{
  "id": "spotify-tab",
  "title": "Spotify UI Inside Stardew Valley",
  "github": "https://github.com/giovani-alday/spotify-tab",
  "description": "An in-game Spotify integration overlay and custom tab interface.",
  "tech": ["C#", "Stardew Modding API (SMAPI)"],
  "features": [
    "Spotify search",
    "Queue management",
    "Play/Pause integrated inside the game"
  ]
}`
              }
            }
          },
          assets: {
            type: "dir",
            children: {
              "readme.txt": {
                type: "file",
                mode: "-rw-r--r--",
                content: `Assets & Media Directory\nContains project icons, avatars, and downloadable resume files.`
              }
            }
          },
          "contact.sh": {
            type: "file",
            mode: "-rwxr-xr-x",
            content: `#!/bin/bash
# Giovani Alday's Contact & Socials

echo "===================================================="
echo "                GIOVANI ALDAY                       "
echo "===================================================="
echo "Email:     aldaygiovani@gmail.com"
echo "LinkedIn:  https://www.linkedin.com/in/giovani-alday-096a2a3a3"
echo "GitHub:    https://github.com/Lnoctis"
echo "Facebook:  https://web.facebook.com/hawthorne02"
echo "Location:  San Leonardo, Nueva Ecija, Philippines"
echo "===================================================="`
          }
        }
      }
    }
  }
};

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "system" | "matrix" | "ascii";
}

export default function Home() {
  // --- VFS State ---
  const [vfs, setVfs] = useState<Record<string, VFSNode>>(INITIAL_VFS);
  const [currentPath, setCurrentPath] = useState<string[]>(["home", "gio"]);
  const [activeFile, setActiveFile] = useState<string>("about.md");

  // --- Terminal UI State ---
  const [isTerminalVisible, setIsTerminalVisible] = useState<boolean>(true);
  const [isBooting, setIsBooting] = useState<boolean>(false);
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // --- Helper VFS Functions ---
  const getNodeAtPath = (tree: Record<string, VFSNode>, pathParts: string[]): VFSNode | null => {
    let current: VFSNode | undefined = { type: "dir", children: tree };
    for (const part of pathParts) {
      if (current && current.type === "dir" && current.children && current.children[part]) {
        current = current.children[part];
      } else {
        return null;
      }
    }
    return current;
  };

  const getPromptPath = (): string => {
    if (currentPath.length === 2 && currentPath[0] === "home" && currentPath[1] === "gio") {
      return "~";
    }
    if (currentPath.length >= 2 && currentPath[0] === "home" && currentPath[1] === "gio") {
      return "~/" + currentPath.slice(2).join("/");
    }
    return "/" + currentPath.join("/");
  };

  const resolvePath = (target: string): string[] => {
    if (target === "~" || target === "") return ["home", "gio"];
    if (target.startsWith("~/")) {
      const sub = target.slice(2).split("/").filter(Boolean);
      return ["home", "gio", ...sub];
    }
    if (target.startsWith("/")) {
      return target.split("/").filter(Boolean);
    }
    const parts = target.split("/").filter(Boolean);
    const result = [...currentPath];
    for (const p of parts) {
      if (p === "..") {
        if (result.length > 0) result.pop();
      } else if (p !== ".") {
        result.push(p);
      }
    }
    return result;
  };

  // Get active file content for Viewer
  const getActiveFileContent = (): string => {
    // If activeFile contains slash (e.g. projects/chrome-extension.json)
    if (activeFile.includes("/")) {
      const parts = activeFile.split("/").filter(Boolean);
      const fullPath = ["home", "gio", ...parts];
      const node = getNodeAtPath(vfs, fullPath);
      if (node && node.type === "file") return node.content || "";
    }

    // Direct root file
    const gioNode = getNodeAtPath(vfs, ["home", "gio"]);
    if (gioNode && gioNode.children && gioNode.children[activeFile] && gioNode.children[activeFile].type === "file") {
      return gioNode.children[activeFile].content || "";
    }

    // Search in projects subfolder
    const projectsNode = getNodeAtPath(vfs, ["home", "gio", "projects"]);
    if (projectsNode && projectsNode.children && projectsNode.children[activeFile]) {
      return projectsNode.children[activeFile].content || "";
    }

    return "# File Not Found\nThe requested file could not be located in virtual filesystem.";
  };

  // --- Initial Boot Sequence Animation ---
  const startBootAnimation = () => {
    setIsBooting(true);
    setTerminalLines([]);

    const bootSequence: { text: string; delay: number; type: "system" | "success" }[] = [
      { text: "[ 0.000000 ] Linux version 6.8.0-port-os (gio@neust) (gcc 13.2.0) #1 SMP PREEMPT", delay: 100, type: "system" },
      { text: "[ 0.015200 ] CPU0: Giovani Dev Core (x86_64) @ 3.40GHz", delay: 250, type: "system" },
      { text: "[ 0.041000 ] Memory: 16384MB Available, Virtual Swap 4096MB", delay: 400, type: "system" },
      { text: "[ OK ] Mounted virtual filesystem /dev/sda1 at portfolio-v1 (~)", delay: 600, type: "success" },
      { text: "[ OK ] Loaded Projects: chrome-extension, voting-system, memo-app, spotify-tab", delay: 850, type: "success" },
      { text: "[ OK ] Environment ready. Interactive shell initialized.", delay: 1100, type: "success" },
      { text: "----------------------------------------------------------------------", delay: 1250, type: "system" },
      { text: " Welcome to port-OS Kernel v2.4.0 (x86_64-pc-linux-gnu)", delay: 1400, type: "success" },
      { text: " Type 'help' to view available commands, or click files in Explorer.", delay: 1550, type: "system" },
      { text: "", delay: 1650, type: "system" }
    ];

    bootSequence.forEach(step => {
      setTimeout(() => {
        setTerminalLines(prev => [...prev, { text: step.text, type: step.type }]);
        if (step.delay === 1650) {
          setIsBooting(false);
        }
      }, step.delay);
    });
  };

  useEffect(() => {
    startBootAnimation();
  }, []);

  // Auto-scroll terminal to bottom
  useEffect(() => {
    if (isTerminalVisible) {
      terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalLines, isTerminalVisible]);

  const focusTerminal = () => {
    inputRef.current?.focus();
  };

  // --- Command Processor ---
  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) {
      setTerminalLines(prev => [...prev, { text: `gio@port-os:${getPromptPath()}$ `, type: "input" }]);
      return;
    }

    const promptText = `gio@port-os:${getPromptPath()}$ ${trimmed}`;
    const promptLine: TerminalLine = { text: promptText, type: "input" };

    // Record command history
    setHistory(prev => [trimmed, ...prev.filter(h => h !== trimmed)]);
    setHistoryIndex(-1);

    const args = trimmed.split(/\s+/);
    const cmd = args[0].toLowerCase();
    const commandArg = args[1];
    const restArgs = args.slice(1).join(" ");

    let responseLines: TerminalLine[] = [];

    switch (cmd) {
      // --- Standard Terminal Commands ---
      case "help":
        responseLines = [
          { text: "=== PORT-OS INTERACTIVE COMMAND LIST ===", type: "system" },
          { text: "FileSystem Commands:", type: "success" },
          { text: "  ls [-l]          List contents of current directory", type: "output" },
          { text: "  cd <dir>         Change working directory (e.g. cd projects, cd ..)", type: "output" },
          { text: "  pwd              Print working directory path", type: "output" },
          { text: "  cat <file>       Read file content (also activates in File Viewer)", type: "output" },
          { text: "  mkdir <dir>      Create a new virtual directory", type: "output" },
          { text: "  touch <file>     Create a new virtual file", type: "output" },
          { text: "  rm <file>        Delete a virtual file", type: "output" },
          { text: "  echo <text>      Print text to console", type: "output" },
          { text: "", type: "output" },
          { text: "Portfolio Shortcuts:", type: "success" },
          { text: "  about            Show profile & summary", type: "output" },
          { text: "  certifications   Show verified credentials", type: "output" },
          { text: "  experience       Show career & work experience", type: "output" },
          { text: "  projects         List all personal projects", type: "output" },
          { text: "  skills           Show skill set matrix", type: "output" },
          { text: "  contact          Run contact info script", type: "output" },
          { text: "", type: "output" },
          { text: "Execution & Utilities:", type: "success" },
          { text: "  run <proj>       Execute project demo or script", type: "output" },
          { text: "  open <link/file> Open GitHub, Credly, LinkedIn, or file", type: "output" },
          { text: "  clear            Clear terminal screen", type: "output" },
          { text: "  whoami           Show current logged in user", type: "output" },
          { text: "  date             Display system date and time", type: "output" },
          { text: "  uname -a         Display system architecture info", type: "output" },
          { text: "  history          Display executed command history", type: "output" },
          { text: "  reboot           Restart system & trigger boot sequence", type: "output" },
          { text: "", type: "output" },
          { text: "Fun / Easter Eggs:", type: "success" },
          { text: "  neofetch         Display ASCII system specs banner", type: "output" },
          { text: "  sl               Run steam locomotive train animation", type: "output" },
          { text: "  matrix           Stream falling green code matrix", type: "output" },
          { text: "  cowsay <text>    ASCII cow speaks your custom text", type: "output" },
          { text: "  sudo             Try running root privileges", type: "output" },
          { text: "  rickroll         Play classic easter egg track", type: "output" }
        ];
        break;

      case "pwd":
        responseLines = [{ text: "/" + currentPath.join("/"), type: "output" }];
        break;

      case "cd": {
        const target = commandArg || "~";
        const newPath = resolvePath(target);
        const node = getNodeAtPath(vfs, newPath);
        if (!node) {
          responseLines = [{ text: `cd: ${target}: No such file or directory`, type: "error" }];
        } else if (node.type !== "dir") {
          responseLines = [{ text: `cd: ${target}: Not a directory`, type: "error" }];
        } else {
          setCurrentPath(newPath);
          responseLines = [{ text: `Changed directory to /${newPath.join("/")}`, type: "system" }];
        }
        break;
      }

      case "ls": {
        const targetPath = commandArg && !commandArg.startsWith("-") ? resolvePath(commandArg) : currentPath;
        const targetNode = getNodeAtPath(vfs, targetPath);
        const isLong = args.includes("-l");

        if (!targetNode || targetNode.type !== "dir" || !targetNode.children) {
          responseLines = [{ text: `ls: cannot access '${commandArg || ""}': No such directory`, type: "error" }];
        } else {
          const keys = Object.keys(targetNode.children);
          if (isLong) {
            responseLines = [{ text: "Mode        Size    Name", type: "system" }];
            keys.forEach(k => {
              const child = targetNode.children![k];
              const isDir = child.type === "dir";
              const mode = child.mode || (isDir ? "drwxr-xr-x" : "-rw-r--r--");
              const size = (child.content?.length || 0).toString().padEnd(7);
              const icon = isDir ? "📁 " : child.mode?.includes("x") ? "⚙️ " : "📄 ";
              const nameText = isDir ? `${k}/` : k;
              responseLines.push({
                text: `${mode} ${size} ${icon}${nameText}`,
                type: isDir ? "system" : child.mode?.includes("x") ? "success" : "output"
              });
            });
          } else {
            const formatted = keys.map(k => {
              const child = targetNode.children![k];
              return child.type === "dir" ? `[📁 ${k}/]` : k.endsWith(".sh") ? `[⚙️ ${k}]` : k;
            });
            responseLines = [{ text: formatted.join("   "), type: "output" }];
          }
        }
        break;
      }

      case "cat": {
        if (!commandArg) {
          responseLines = [{ text: "Usage: cat <filename> (e.g. cat about.md)", type: "error" }];
        } else {
          const filePath = resolvePath(commandArg);
          const parentPath = filePath.slice(0, -1);
          const fileName = filePath[filePath.length - 1];
          const parentNode = getNodeAtPath(vfs, parentPath);

          if (parentNode && parentNode.children && parentNode.children[fileName]) {
            const targetNode = parentNode.children[fileName];
            if (targetNode.type === "dir") {
              responseLines = [{ text: `cat: ${commandArg}: Is a directory`, type: "error" }];
            } else {
              setActiveFile(commandArg);
              const content = targetNode.content || "";
              responseLines = content.split("\n").map((l): TerminalLine => ({ text: l, type: "output" }));
            }
          } else {
            responseLines = [{ text: `cat: ${commandArg}: No such file or directory`, type: "error" }];
          }
        }
        break;
      }

      case "mkdir": {
        if (!commandArg) {
          responseLines = [{ text: "Usage: mkdir <directory_name>", type: "error" }];
        } else {
          const dirName = commandArg;
          const currentDirNode = getNodeAtPath(vfs, currentPath);
          if (currentDirNode && currentDirNode.type === "dir") {
            if (currentDirNode.children && currentDirNode.children[dirName]) {
              responseLines = [{ text: `mkdir: cannot create directory '${dirName}': File exists`, type: "error" }];
            } else {
              const updatedVfs = JSON.parse(JSON.stringify(vfs));
              let node = updatedVfs;
              for (const p of currentPath) {
                node = node[p].children;
              }
              node[dirName] = { type: "dir", children: {} };
              setVfs(updatedVfs);
              responseLines = [{ text: `Directory '${dirName}' created successfully.`, type: "success" }];
            }
          }
        }
        break;
      }

      case "touch": {
        if (!commandArg) {
          responseLines = [{ text: "Usage: touch <filename>", type: "error" }];
        } else {
          const fileName = commandArg;
          const updatedVfs = JSON.parse(JSON.stringify(vfs));
          let node = updatedVfs;
          for (const p of currentPath) {
            node = node[p].children;
          }
          if (node[fileName]) {
            responseLines = [{ text: `Updated timestamp for '${fileName}'.`, type: "system" }];
          } else {
            node[fileName] = { type: "file", mode: "-rw-r--r--", content: `# ${fileName}\nCreated via touch command.` };
            setVfs(updatedVfs);
            responseLines = [{ text: `Created new virtual file '${fileName}'.`, type: "success" }];
          }
        }
        break;
      }

      case "rm": {
        if (!commandArg) {
          responseLines = [{ text: "Usage: rm <filename>", type: "error" }];
        } else {
          const fileName = commandArg;
          const updatedVfs = JSON.parse(JSON.stringify(vfs));
          let node = updatedVfs;
          for (const p of currentPath) {
            node = node[p].children;
          }
          if (!node[fileName]) {
            responseLines = [{ text: `rm: cannot remove '${fileName}': No such file`, type: "error" }];
          } else if (node[fileName].type === "dir") {
            responseLines = [{ text: `rm: cannot remove '${fileName}': Is a directory (use rm -r)`, type: "error" }];
          } else {
            delete node[fileName];
            setVfs(updatedVfs);
            responseLines = [{ text: `Removed file '${fileName}'.`, type: "system" }];
          }
        }
        break;
      }

      case "echo": {
        responseLines = [{ text: restArgs, type: "output" }];
        break;
      }

      case "whoami":
        responseLines = [
          { text: "gio (Giovani Alday - Web & AI Automation Developer)", type: "success" },
          { text: "Role: Portfolio Guest / Evaluator", type: "system" }
        ];
        break;

      case "date":
        responseLines = [{ text: new Date().toUTCString(), type: "output" }];
        break;

      case "uname":
        responseLines = [{ text: "Linux port-os 6.8.0-custom-gio x86_64 GNU/Linux", type: "output" }];
        break;

      case "history":
        responseLines = history.map((h, i): TerminalLine => ({ text: `  ${history.length - i}  ${h}`, type: "output" })).reverse();
        break;

      case "clear":
        setTerminalLines([]);
        setInputValue("");
        return;

      case "reboot":
        startBootAnimation();
        return;

      // --- Portfolio Shortcuts ---
      case "about":
        setActiveFile("about.md");
        responseLines = (getNodeAtPath(vfs, ["home", "gio", "about.md"])?.content || "").split("\n").map((l): TerminalLine => ({ text: l, type: "output" }));
        break;

      case "certifications":
        setActiveFile("certifications.md");
        responseLines = (getNodeAtPath(vfs, ["home", "gio", "certifications.md"])?.content || "").split("\n").map((l): TerminalLine => ({ text: l, type: "output" }));
        break;

      case "experience":
        setActiveFile("experience.md");
        responseLines = (getNodeAtPath(vfs, ["home", "gio", "experience.md"])?.content || "").split("\n").map((l): TerminalLine => ({ text: l, type: "output" }));
        break;

      case "projects": {
        const projectsNode = getNodeAtPath(vfs, ["home", "gio", "projects"]);
        if (projectsNode && projectsNode.children) {
          responseLines = [{ text: "--- Portfolio Projects Directory ---", type: "system" }];
          Object.keys(projectsNode.children).forEach(pName => {
            const pNode = projectsNode.children![pName];
            try {
              const data = JSON.parse(pNode.content || "{}");
              responseLines.push({ text: `🚀 [${data.title || pName}]`, type: "success" });
              responseLines.push({ text: `   GitHub: ${data.github || "N/A"}`, type: "system" });
              responseLines.push({ text: `   Description: ${data.description || ""}`, type: "output" });
              responseLines.push({ text: `   Tech: ${(data.tech || []).join(", ")}`, type: "output" });
              responseLines.push({ text: "", type: "output" });
            } catch {
              responseLines.push({ text: `📄 projects/${pName}`, type: "output" });
            }
          });
        }
        break;
      }

      case "skills":
        setActiveFile("skills.csv");
        const rawCsv = getNodeAtPath(vfs, ["home", "gio", "skills.csv"])?.content || "";
        const lines = rawCsv.split("\n");
        responseLines = [];
        lines.forEach((line, idx) => {
          if (!line.trim()) return;
          if (idx === 0) {
            responseLines.push({ text: "CATEGORY               | SKILLS                                             | LEVEL", type: "system" });
            responseLines.push({ text: "-----------------------+----------------------------------------------------+----------------", type: "system" });
          } else {
            responseLines.push({ text: line.replace(/"/g, ""), type: "output" });
          }
        });
        break;

      case "contact":
      case "./contact.sh":
        setActiveFile("contact.sh");
        responseLines = [
          { text: "Executing contact script...", type: "system" },
          { text: "====================================================", type: "success" },
          { text: "                GIOVANI ALDAY                       ", type: "success" },
          { text: "====================================================", type: "success" },
          { text: "Email:     aldaygiovani@gmail.com", type: "output" },
          { text: "LinkedIn:  https://www.linkedin.com/in/giovani-alday-096a2a3a3", type: "output" },
          { text: "GitHub:    https://github.com/giovani-alday", type: "output" },
          { text: "Credly:    https://www.credly.com/badges/8aff742b-77f4-4eda-b776-60f6afd5bb33", type: "output" },
          { text: "Location:  San Leonardo, Nueva Ecija, Philippines", type: "output" },
          { text: "====================================================", type: "success" }
        ];
        break;

      // --- Executable Commands (`run`, `open`) ---
      case "run":
        if (!commandArg) {
          responseLines = [
            { text: "Usage: run <project_name>", type: "error" },
            { text: "Projects: chrome-extension | voting-system | memo-app | spotify-tab", type: "system" }
          ];
        } else if (commandArg === "contact.sh" || commandArg === "contact") {
          handleCommand("contact");
          return;
        } else if (commandArg.includes("chrome-extension") || commandArg.includes("n8n")) {
          responseLines = [
            { text: "▶ Launching Chrome Extension + n8n Webhook Automation...", type: "system" },
            { text: "[Extension] Captured active page text snippet.", type: "output" },
            { text: "[POST Webhook] Sending payload to n8n Cloud Instance...", type: "system" },
            { text: "[HTTP 200 OK] Repository: https://github.com/Lnoctis/cect-n8n", type: "success" }
          ];
        } else if (commandArg.includes("voting")) {
          responseLines = [
            { text: "▶ Launching Web-Based Voting System simulation...", type: "system" },
            { text: "[PHP/MySQL] SSC Elections Database Connected.", type: "success" },
            { text: "[HTTP 200 OK] Repository: https://github.com/giovani-alday/voting-system", type: "success" }
          ];
        } else if (commandArg.includes("memo") || commandArg.includes("helpdesk")) {
          responseLines = [
            { text: "▶ Launching IT Help Desk & Memo App System...", type: "system" },
            { text: "[C#/.NET Core] Database Connection Established to MSSQL Server.", type: "success" },
            { text: "[HTTP 200 OK] Repository: https://github.com/giovani-alday/memo-app", type: "success" }
          ];
        } else if (commandArg.includes("spotify")) {
          responseLines = [
            { text: "▶ Launching Spotify UI Inside Stardew Valley mod...", type: "system" },
            { text: "[SMAPI 4.0.0] Loading mod: 'SpotifyTabMod.dll' ... OK", type: "success" },
            { text: "[HTTP 200 OK] Repository: https://github.com/giovani-alday/spotify-tab", type: "success" }
          ];
        } else {
          responseLines = [{ text: `run: project '${commandArg}' not found. Type 'projects' for list.`, type: "error" }];
        }
        break;

      case "open":
        if (!commandArg) {
          responseLines = [
            { text: "Usage: open <target>", type: "error" },
            { text: "Targets: github | credly | linkedin | email | <filename>", type: "system" }
          ];
        } else if (commandArg === "github") {
          window.open("https://github.com/giovani-alday", "_blank");
          responseLines = [{ text: "Opening GitHub profile in new tab...", type: "success" }];
        } else if (commandArg === "credly") {
          window.open("https://www.credly.com/badges/8aff742b-77f4-4eda-b776-60f6afd5bb33", "_blank");
          responseLines = [{ text: "Opening Credly badge credential in new tab...", type: "success" }];
        } else if (commandArg === "linkedin") {
          window.open("https://www.linkedin.com/in/giovani-alday-096a2a3a3", "_blank");
          responseLines = [{ text: "Opening LinkedIn profile in new tab...", type: "success" }];
        } else if (commandArg === "email" || commandArg === "mail") {
          window.open("mailto:aldaygiovani@gmail.com", "_blank");
          responseLines = [{ text: "Opening mail composer to aldaygiovani@gmail.com...", type: "success" }];
        } else {
          setActiveFile(commandArg);
          responseLines = [{ text: `Opened '${commandArg}' in top File Viewer screen.`, type: "success" }];
        }
        break;

      // --- Easter Eggs ---
      case "neofetch":
      case "fetch":
        responseLines = [
          { text: "         .----------------.          gio@port-os", type: "success" },
          { text: "        |   G I O V A N I  |         -----------", type: "success" },
          { text: "        |     A L D A Y    |         OS: port-OS 2026.1 LTS x86_64", type: "output" },
          { text: "         '----------------'          Kernel: Linux 6.8.0-custom-gio", type: "output" },
          { text: "               /    \\                Education: BS Information Technology (NEUST)", type: "output" },
          { text: "              /      \\               Specialization: Web System Technology", type: "output" },
          { text: "             /        \\              Role: AI Automation & Full Stack Web Dev", type: "output" },
          { text: "            '----------'             Shell: zsh 5.9 (x86_64-port-os)", type: "output" },
          { text: "                                     Stack: C#, React, Next.js, PHP, Python, n8n", type: "output" },
          { text: "                                     Uptime: 24 years, 5 months", type: "system" }
        ];
        break;

      case "sl":
        responseLines = [
          { text: "      ==== i_i_i_i_i_i_i_i_i_i_i_i_i_i_i ====", type: "matrix" },
          { text: "     .-'-----------------------------------'-.", type: "matrix" },
          { text: "    (   [O]  [O]  [O]  [O]  [O]  [O]  [O]  [O]   )", type: "matrix" },
          { text: "    ='---------------------------------------'=", type: "matrix" },
          { text: "       (o) (o)   (o) (o)   (o) (o)   (o) (o)", type: "matrix" },
          { text: "Choo Choo! Steam Locomotive passing through port-OS!", type: "success" }
        ];
        break;

      case "matrix":
        responseLines = [
          { text: "01000111 01001001 01001111 01010110 01000001 01001110 01001001", type: "matrix" },
          { text: "10101010 11010010 10101011 00101010 11100101 01010101 11001010", type: "matrix" },
          { text: "=== MATRIX SYSTEM CONNECTED: AUTOMATION PROTOCOLS ACTIVE ===", type: "success" },
          { text: "01101110 00111000 01101110 00100000 01000001 01010000 01001001", type: "matrix" }
        ];
        break;

      case "cowsay": {
        const msg = restArgs || "Moo! Hire Giovani Alday today!";
        const border = "-".repeat(msg.length + 2);
        responseLines = [
          { text: ` ${border} `, type: "output" },
          { text: `< ${msg} >`, type: "success" },
          { text: ` ${border} `, type: "output" },
          { text: "        \\   ^__^", type: "output" },
          { text: "         \\  (oo)\\_______", type: "output" },
          { text: "            (__)\\       )\\/\\", type: "output" },
          { text: "                ||----w |", type: "output" },
          { text: "                ||     ||", type: "output" }
        ];
        break;
      }

      case "sudo":
        responseLines = [
          { text: "[sudo] password for guest: ", type: "input" },
          { text: "gio is not in the sudoers file. This incident will be reported to Giovani Alday.", type: "error" }
        ];
        break;

      case "rickroll":
        responseLines = [
          { text: "🎵 Never gonna give you up, never gonna let you down...", type: "success" },
          { text: "🎵 Never gonna run around and desert you...", type: "success" },
          { text: "🔗 https://www.youtube.com/watch?v=dQw4w9WgXcQ", type: "system" }
        ];
        break;

      default:
        responseLines = [
          { text: `port-OS: command not found: '${cmd}'.`, type: "error" },
          { text: "Type 'help' to see list of valid commands or press [Tab] for autocomplete.", type: "output" }
        ];
        break;
    }

    setTerminalLines(prev => [...prev, promptLine, ...responseLines, { text: "", type: "output" }]);
    setInputValue("");
  };

  // --- Keyboard Events: Autocomplete (Tab) & History (Up/Down) ---
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
      handleAutocomplete();
    }
  };

  const handleAutocomplete = () => {
    const trimmed = inputValue.toLowerCase().trim();

    const availableCommands = [
      "help", "ls", "cd", "pwd", "cat", "mkdir", "touch", "rm", "echo",
      "about", "certifications", "experience", "projects", "skills", "contact",
      "run", "open", "clear", "whoami", "date", "uname", "history", "reboot",
      "neofetch", "sl", "matrix", "cowsay", "sudo", "rickroll"
    ];

    const currentNode = getNodeAtPath(vfs, currentPath);
    const folderItems = currentNode && currentNode.children ? Object.keys(currentNode.children) : [];

    const allOptions = Array.from(new Set([...availableCommands, ...folderItems]));

    if (!trimmed) {
      setTerminalLines(prev => [
        ...prev,
        { text: `gio@port-os:${getPromptPath()}$ `, type: "input" },
        { text: availableCommands.slice(0, 15).join("   ") + " ...", type: "system" }
      ]);
      return;
    }

    const matches = allOptions.filter(opt => opt.toLowerCase().startsWith(trimmed));

    if (matches.length === 1) {
      setInputValue(matches[0] + " ");
    } else if (matches.length > 1) {
      setTerminalLines(prev => [
        ...prev,
        { text: `gio@port-os:${getPromptPath()}$ ${inputValue}`, type: "input" },
        { text: matches.join("   "), type: "system" }
      ]);
    }
  };

  // --- Click File from Sidebar / Explorer ---
  const handleFileClick = (fileName: string) => {
    setActiveFile(fileName);
    if (isTerminalVisible) {
      let runCommandName = `cat ${fileName}`;
      const baseName = fileName.substring(fileName.lastIndexOf("/") + 1, fileName.indexOf("."));
      if (["about", "certifications", "experience", "projects", "skills", "contact"].includes(baseName)) {
        runCommandName = baseName;
      }
      handleCommand(runCommandName);
    }
  };

  const currentFileContent = getActiveFileContent();

  // Helper to render text with interactive links
  const renderFormattedLine = (line: string) => {
    const urlRegex = /(https?:\/\/[^\s"'\)]+)/g;
    const parts = line.split(urlRegex);
    return parts.map((part, pIdx) => {
      if (part.match(/^https?:\/\//)) {
        return (
          <a
            key={pIdx}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 font-bold underline hover:text-blue-800 transition"
            onClick={(e) => e.stopPropagation()}
          >
            {part}
          </a>
        );
      }
      return <span key={pIdx}>{part}</span>;
    });
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-3 md:p-6 min-h-screen bg-slate-300 font-sans">

      {/* Main OS Window Container */}
      <div
        className="flex flex-col w-full max-w-6xl h-[90vh] min-h-[580px] bg-slate-100 border-2 border-slate-900 rounded-lg overflow-hidden shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
        onClick={focusTerminal}
      >

        {/* --- Top Titlebar & Toggle Header --- */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-200 border-b-2 border-slate-900 select-none">
          <div className="flex items-center gap-2">
            <div
              className="w-3.5 h-3.5 rounded-full border border-slate-950 bg-red-400 cursor-pointer hover:opacity-80 transition"
              onClick={(e) => { e.stopPropagation(); setIsTerminalVisible(false); }}
              title="Close/Hide Terminal"
            />
            <div
              className="w-3.5 h-3.5 rounded-full border border-slate-950 bg-yellow-400 cursor-pointer hover:opacity-80 transition"
              onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(!isSidebarOpen); }}
              title="Toggle Sidebar Explorer"
            />
            <div
              className="w-3.5 h-3.5 rounded-full border border-slate-950 bg-green-400 cursor-pointer hover:opacity-80 transition"
              onClick={(e) => { e.stopPropagation(); setIsTerminalVisible(true); handleCommand("help"); }}
              title="Show Terminal & Help"
            />
          </div>

          <div className="text-xs md:text-sm font-bold text-slate-900 flex items-center gap-2">
            <span>gio@port-os:{getPromptPath()}</span>
            <span className={`px-1.5 py-0.5 text-[10px] rounded font-mono uppercase ${isTerminalVisible ? "bg-emerald-800 text-emerald-100" : "bg-slate-700 text-slate-200"}`}>
              {isTerminalVisible ? "SHELL ACTIVE" : "READER MODE"}
            </span>
          </div>

          {/* Terminal Toggle Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsTerminalVisible(!isTerminalVisible);
              }}
              className="px-2.5 py-1 text-xs font-mono font-bold bg-slate-900 text-slate-100 hover:bg-slate-800 rounded border border-slate-950 transition flex items-center gap-1.5 shadow-sm"
              title="Toggle Terminal visibility"
            >
              <span>{isTerminalVisible ? "🙈 Hide Terminal" : "🖥️ Show Terminal"}</span>
            </button>
          </div>
        </div>

        {/* --- Toolbar / Shortcut Navbar --- */}
        <div className="flex items-center justify-between gap-2 px-3 py-1.5 bg-slate-50 border-b border-slate-900/15 text-xs overflow-x-auto select-none">
          <div className="flex items-center gap-1.5 whitespace-nowrap font-mono">
            <button
              onClick={() => { setIsTerminalVisible(true); handleCommand("help"); }}
              className="px-2 py-0.5 border border-slate-900/30 hover:border-slate-900 hover:bg-slate-200 rounded text-slate-800 transition"
            >
              ? help
            </button>
            {Object.keys(INITIAL_VFS.home.children!.gio.children!).map((fileName) => {
              const node = INITIAL_VFS.home.children!.gio.children![fileName];
              const isExecutable = fileName.endsWith(".sh");
              const isDir = node.type === "dir";
              const icon = isDir ? "📂" : isExecutable ? "⚙️" : "📄";
              const isSelected = activeFile === fileName || activeFile.startsWith(fileName + "/");
              return (
                <button
                  key={fileName}
                  onClick={() => handleFileClick(fileName)}
                  className={`px-2 py-0.5 border rounded transition ${isSelected ? "border-slate-900 bg-slate-900 text-slate-100 font-semibold" : "border-slate-900/20 hover:border-slate-900 hover:bg-slate-200 text-slate-800"}`}
                >
                  {icon} {fileName}
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 whitespace-nowrap">
            {isTerminalVisible && (
              <button
                onClick={() => handleCommand("clear")}
                className="px-2 py-0.5 border border-red-900/30 text-red-700 hover:border-red-950 hover:bg-red-100 rounded transition font-mono text-[11px]"
              >
                clear screen
              </button>
            )}
          </div>
        </div>

        {/* --- Main Outer Layout (Sidebar + Editor + Terminal) --- */}
        <div className="flex flex-1 overflow-hidden min-h-0">

          {/* Left Sidebar Explorer */}
          {isSidebarOpen && (
            <div className="hidden md:flex flex-col w-60 bg-slate-200/70 border-r border-slate-900 select-none">
              <div className="px-3 py-2 bg-slate-200 border-b border-slate-900 text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center justify-between">
                <span>Workspace Explorer</span>
                <span className="text-[10px] text-slate-500 font-mono">vfs:/</span>
              </div>
              <div className="flex-1 p-2 space-y-1 overflow-y-auto text-sm text-slate-800 font-mono">
                <div className="flex items-center gap-1 font-bold text-slate-900 py-1">
                  <span>📂</span>
                  <span>portfolio-v1</span>
                </div>
                <div className="pl-3 space-y-1">
                  {Object.keys(INITIAL_VFS.home.children!.gio.children!).map((fileName) => {
                    const node = INITIAL_VFS.home.children!.gio.children![fileName];
                    if (node.type === "dir") {
                      return (
                        <div key={fileName} className="pt-1">
                          <div className="flex items-center gap-1.5 text-xs text-slate-800 font-bold px-2 py-0.5">
                            <span>📂</span>
                            <span>{fileName}</span>
                          </div>
                          <div className="pl-4 space-y-1 border-l border-slate-400 ml-2">
                            {Object.keys(node.children!).map(subFile => {
                              const fullPath = `${fileName}/${subFile}`;
                              const isSelected = activeFile === fullPath || activeFile === subFile;
                              return (
                                <button
                                  key={subFile}
                                  onClick={() => handleFileClick(fullPath)}
                                  className={`flex items-center gap-1.5 w-full text-left px-2 py-0.5 rounded text-xs transition-colors ${isSelected ? "bg-slate-300 font-bold text-slate-950" : "hover:bg-slate-200 text-slate-700"}`}
                                >
                                  <span>📄</span>
                                  <span className="truncate">{subFile}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }
                    const isExecutable = fileName.endsWith(".sh");
                    const icon = isExecutable ? "⚙️" : "📄";
                    const isSelected = activeFile === fileName;
                    const activeClass = isSelected ? "bg-slate-300 font-bold text-slate-950" : "hover:bg-slate-200";
                    const textClass = isExecutable ? "text-emerald-800 font-semibold" : "";
                    return (
                      <button
                        key={fileName}
                        onClick={() => handleFileClick(fileName)}
                        className={`flex items-center gap-2 w-full text-left px-2 py-1 rounded transition-colors text-xs ${activeClass}`}
                      >
                        <span>{icon}</span>
                        <span className={`truncate ${textClass}`}>{fileName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="p-2 border-t border-slate-900/15 text-[10px] text-slate-600 font-mono">
                OS: port-OS 2026.1<br />
                User: guest@localhost
              </div>
            </div>
          )}

          {/* Right Main Split: Top File Viewer & Bottom Terminal */}
          <div className="flex flex-col flex-1 min-w-0">

            {/* Top Text File Viewer */}
            <div className="flex flex-col flex-1 bg-slate-50 overflow-hidden min-h-0 border-b border-slate-900">
              <div className="flex items-center justify-between px-3 py-1.5 bg-slate-200 border-b border-slate-900 select-none text-xs text-slate-700 font-mono">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900">📝 FILE VIEWER</span>
                  <span className="text-slate-400">|</span>
                  <span className="font-bold text-slate-900 bg-slate-300/80 px-2 py-0.5 rounded border border-slate-400">{activeFile}</span>
                </div>
                <div className="flex items-center gap-2">
                  {!isTerminalVisible && (
                    <button
                      onClick={() => setIsTerminalVisible(true)}
                      className="px-2 py-0.5 bg-slate-900 text-slate-100 rounded text-[10px] font-bold hover:bg-slate-800 transition"
                    >
                      ⌨️ Open Terminal Console
                    </button>
                  )}
                  <span className="text-[10px] uppercase bg-slate-900/10 px-1.5 py-0.5 rounded text-slate-800 font-bold">
                    Read Only
                  </span>
                </div>
              </div>

              {/* Document Code Viewer */}
              <div className="flex-1 p-4 font-mono text-xs md:text-sm overflow-y-auto bg-slate-50 text-slate-900 leading-relaxed whitespace-pre-wrap select-text">
                {activeFile.endsWith(".json") ? (
                  <div className="text-slate-900">
                    {currentFileContent.split("\n").map((line, idx) => (
                      <div key={idx} className="flex">
                        <span className="w-8 select-none text-slate-400 text-right pr-3 text-xs">{idx + 1}</span>
                        <span>
                          {line.split(/(:\s*".*?"|:\s*\d+|:\s*\[|:\s*\{)/).map((part, pIdx) => {
                            if (part.includes("http://") || part.includes("https://")) {
                              const urlMatch = part.match(/(https?:\/\/[^\s"]+)/);
                              if (urlMatch) {
                                const url = urlMatch[0];
                                const before = part.split(url)[0];
                                const after = part.split(url)[1];
                                return (
                                  <span key={pIdx}>
                                    {before}
                                    <a
                                      href={url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline font-bold hover:text-blue-800"
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      {url}
                                    </a>
                                    {after}
                                  </span>
                                );
                              }
                            }
                            if (part.startsWith(': "') || part.startsWith(': ')) {
                              return <span key={pIdx} className="text-blue-800 font-semibold">{part}</span>;
                            }
                            if (part.trim().startsWith('"')) {
                              return <span key={pIdx} className="text-purple-800 font-bold">{part}</span>;
                            }
                            return <span key={pIdx}>{part}</span>;
                          })}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : activeFile.endsWith(".sh") ? (
                  <div>
                    {currentFileContent.split("\n").map((line, idx) => (
                      <div key={idx} className="flex">
                        <span className="w-8 select-none text-slate-400 text-right pr-3 text-xs">{idx + 1}</span>
                        <span>
                          {line.startsWith("#") ? (
                            <span className="text-slate-500 italic">{line}</span>
                          ) : line.startsWith("echo") ? (
                            <span>
                              <span className="text-blue-900 font-bold">echo</span>{" "}
                              <span className="text-emerald-800 font-semibold">{renderFormattedLine(line.slice(5))}</span>
                            </span>
                          ) : (
                            renderFormattedLine(line)
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div>
                    {currentFileContent.split("\n").map((line, idx) => (
                      <div key={idx} className="flex">
                        <span className="w-8 select-none text-slate-400 text-right pr-3 text-xs">{idx + 1}</span>
                        <span className={line.startsWith("#") ? "text-slate-950 font-bold text-base border-b border-slate-900/10 pb-0.5" : line.startsWith("-") ? "text-slate-800 font-medium" : ""}>
                          {renderFormattedLine(line)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Vim Status Bar */}
              <div className="flex items-center justify-between px-3 py-1 bg-slate-900 text-slate-100 font-mono text-[10px] select-none">
                <div className="flex items-center gap-2">
                  <span className="bg-amber-400 text-slate-950 font-black px-1 rounded-xs">VIEW</span>
                  <span>{activeFile}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span>UTF-8</span>
                  <span>LF</span>
                  <span>{currentFileContent.split("\n").length} Lines</span>
                  <span className="bg-slate-800 px-1 rounded">100%</span>
                </div>
              </div>
            </div>

            {/* --- Bottom Collapsible Terminal Screen --- */}
            {isTerminalVisible && (
              <div className="flex flex-col h-56 md:h-64 bg-slate-950 text-slate-200 overflow-hidden font-mono text-xs md:text-sm select-text border-t border-slate-900">

                {/* Console Bar */}
                <div className="flex items-center justify-between px-3 py-1 bg-slate-900 text-slate-300 text-[10px] select-none border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">🐚 BASH INTERACTIVE TERMINAL</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-slate-400">Path: {getPromptPath()}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline text-slate-500">[TAB] autocomplete | ↑↓ history</span>
                    <button
                      onClick={() => setIsTerminalVisible(false)}
                      className="text-red-400 hover:text-red-300 font-bold text-xs"
                      title="Hide Terminal panel"
                    >
                      ✖ Hide
                    </button>
                  </div>
                </div>

                {/* Scrollable Terminal Output */}
                <div className="flex-1 p-3 overflow-y-auto space-y-1">
                  {terminalLines.map((line, index) => {
                    let colorClass = "text-slate-300";
                    if (line.type === "input") colorClass = "text-slate-100 font-semibold";
                    else if (line.type === "system") colorClass = "text-slate-400";
                    else if (line.type === "error") colorClass = "text-red-400 font-medium";
                    else if (line.type === "success") colorClass = "text-emerald-400 font-semibold";
                    else if (line.type === "matrix") colorClass = "text-green-500 font-bold";

                    return (
                      <div key={index} className={`whitespace-pre-wrap leading-relaxed ${colorClass}`}>
                        {renderFormattedLine(line.text)}
                      </div>
                    );
                  })}
                  <div ref={terminalEndRef} />
                </div>

                {/* Mobile Quick Action Buttons Bar */}
                <div className="flex md:hidden items-center gap-1.5 px-2 py-1 bg-slate-900/90 border-t border-slate-800 text-[10px] overflow-x-auto select-none font-mono">
                  <button
                    onClick={handleAutocomplete}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold border border-slate-700"
                  >
                    TAB
                  </button>
                  <button
                    onClick={() => {
                      if (history.length > 0) {
                        const next = Math.min(historyIndex + 1, history.length - 1);
                        setHistoryIndex(next);
                        setInputValue(history[next]);
                      }
                    }}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold border border-slate-700"
                  >
                    ↑ UP
                  </button>
                  <button
                    onClick={() => {
                      const next = historyIndex - 1;
                      if (next >= 0) {
                        setHistoryIndex(next);
                        setInputValue(history[next]);
                      } else {
                        setHistoryIndex(-1);
                        setInputValue("");
                      }
                    }}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold border border-slate-700"
                  >
                    ↓ DOWN
                  </button>
                  <button
                    onClick={() => handleCommand("clear")}
                    className="px-2 py-0.5 bg-red-950 hover:bg-red-900 text-red-200 rounded font-bold border border-red-800"
                  >
                    CLEAR
                  </button>
                  <button
                    onClick={() => handleCommand("help")}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold border border-slate-700"
                  >
                    HELP
                  </button>
                  <button
                    onClick={() => handleCommand("ls")}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-bold border border-slate-700"
                  >
                    LS
                  </button>
                  <button
                    onClick={() => handleCommand(inputValue)}
                    className="px-2 py-0.5 bg-emerald-800 hover:bg-emerald-700 text-emerald-100 rounded font-bold border border-emerald-600 ml-auto"
                  >
                    RUN ↵
                  </button>
                </div>

                {/* Terminal Command Input */}
                <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border-t border-slate-800">
                  <span className="text-emerald-400 font-bold select-none whitespace-nowrap">
                    gio@port-os:{getPromptPath()}$
                  </span>
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
                      placeholder={isBooting ? "Booting kernel..." : "Type command here..."}
                      disabled={isBooting}
                      maxLength={120}
                      autoComplete="off"
                      autoCorrect="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />
                    {/* Blinking Custom Cursor */}
                    <span
                      className="absolute h-4 w-2 bg-slate-100 animate-cursor-blink"
                      style={{
                        left: `${Math.min(inputValue.length, 75) * 8.2}px`,
                        display: isInputFocused && !isBooting ? "inline-block" : "none"
                      }}
                    />
                  </div>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Footer Instructions */}
      <p className="mt-3 text-xs font-mono text-slate-700 select-none text-center">
        port-OS terminal (c) 2026 Giovani Alday. Toggle terminal with top button or type <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-900 border border-slate-400">help</code> for commands.
      </p>

    </div>
  );
}
