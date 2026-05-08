import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pause,
  Play,
  X,
  Keyboard,
  Search,
  Battery,
  Wifi,
  MoreVertical,
  Lock,
  RotateCw,
  Star,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Sparkles,
} from "lucide-react";

// --- CRAFTED PHYSICS ---
const sceneTransition = { type: "spring", stiffness: 100, damping: 22 };
const keySpring = { type: "spring", stiffness: 400, damping: 30 };
const notificationSpring = { type: "spring", stiffness: 220, damping: 28 };
const iconSpring = { type: "spring", stiffness: 500, damping: 25 };

export default function App() {
  const [isFocus, setIsFocus] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null); // Track hovered icon for tooltip

  // 1. Timer Logic
  useEffect(() => {
    let interval = null;
    if (isFocus && isActive && seconds > 0) {
      interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isFocus, isActive, seconds]);

  // 2. Spacebar Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        toggleFocus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocus]);

  const toggleFocus = () => {
    setIsFocus(!isFocus);
    setIsActive(!isFocus);
    if (!isFocus) setSeconds(25 * 60);
  };

  const formatTime = (s) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-6 font-sans select-none overflow-hidden text-slate-900">
      {/* THE MAC SCREEN CONTAINER */}
      <motion.div
        animate={{ backgroundColor: isFocus ? "#000000" : "#1e1f22" }}
        transition={{ duration: 1 }}
        className="relative w-full max-w-[850px] aspect-[16/10] rounded-[14px] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/5"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#1a1c2e] via-[#2d1b3d] to-[#1a2a3a]"
          animate={{ opacity: isFocus ? 0.1 : 1 }}
          transition={{ duration: 1 }}
        />

        {/* MENUBAR */}
        <motion.div
          animate={{ opacity: isFocus ? 0.1 : 1 }}
          className="relative h-6 bg-black/40 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-3 z-50 text-white text-[11px]"
        >
          <div className="flex gap-[14px] items-center h-full">
            <div className="flex items-center justify-center pt-[0.5px]">
              <svg
                viewBox="0 0 1024 1024"
                fill="currentColor"
                className="w-[12px] h-[12px] overflow-visible"
              >
                <path d="M724.1 829.4c-35.8 52.4-73.4 104.3-131.7 105.4-57.2 1.1-75.6-33.8-141.1-33.8s-85.8 32.7-141.1 34.9c-56.1 2.2-99.3-56.1-135.2-107.4-73.4-105.4-129.5-297.7-53-430 38-66.2 106.1-108.2 180.4-109.3 57.2-1.1 110.9 38.6 146.3 38.6 35.3 0 100.6-47.5 169.1-40.8 28.7 1.1 109.3 11.5 161.4 87.8-4.4 2.2-96.1 56.1-96.1 167.9 0 133.7 116 181.2 117.1 182.3-1.1 2.2-18.4 63.6-61 124.4zM634.5 125.7C665.4 88.2 686.4 36.3 680.9 0c-45.3 1.8-100.1 30.2-132.7 68-29.2 33.6-54.7 86.6-47.9 135.2 50.4 3.9 101.3-29.2 134.2-77.5z" />
              </svg>
            </div>
            <span className="font-medium">Finder</span>
            <span className="font-medium">File</span>
            <span className="font-medium">Edit</span>
            <span className="font-medium">View</span>
            <span className="font-medium">Go</span>
            <span className="font-medium">Window</span>
            <span className="font-medium">Help</span>
          </div>
          <div className="flex gap-3 items-center font-medium opacity-90">
            <Wifi size={13} strokeWidth={2} />
            <div className="flex items-center gap-1.5 opacity-90">
              <span className="text-[10px]">97%</span>
              <div className="relative w-[17px] h-[8.5px] border border-white/40 rounded-[2px] p-[1px] flex items-center">
                <div className="h-full w-[97%] bg-white rounded-[1px]" />
                <div className="absolute -right-[2.5px] top-[2px] w-[1.2px] h-[3.5px] bg-white/40 rounded-r-[1px]" />
              </div>
            </div>
            <span className="tracking-tight">Mon Jun 22 9:41 AM</span>
          </div>
        </motion.div>

        {/* BROWSER WINDOW (Preserved visuals) */}
        <motion.div
          animate={{
            scale: isFocus ? 0.91 : 1,
            y: isFocus ? 15 : 0,
            opacity: isFocus ? 0.04 : 1,
            filter: isFocus ? "blur(5px) saturate(0)" : "blur(0px) saturate(1)",
          }}
          transition={sceneTransition}
          className="absolute top-[34px] left-1/2 -translate-x-1/2 w-[92%] h-[calc(100%-90px)] bg-white rounded-t-[10px] shadow-2xl flex flex-col overflow-hidden origin-top z-10"
        >
          <div className="h-9 bg-[#dee1e6] flex items-end px-3 gap-1">
            <div className="flex gap-1.5 mb-3 mr-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="h-[28px] bg-white rounded-t-lg flex items-center px-3 gap-2 min-w-[160px] text-[11px] shadow-sm">
              <div className="w-3.5 h-3.5 bg-[#5e6ad2] rounded-[2px] flex items-center justify-center text-[7px] text-white font-bold">
                L
              </div>
              <span className="truncate font-medium">My Issues – Linear</span>
            </div>

            <div className="h-[28px] bg-white rounded-t-lg flex items-center px-3 gap-2 min-w-[160px] text-[11px] shadow-sm">
              <div className="w-3.5 h-3.5 bg-[#1a73e8] rounded-[2px] flex items-center justify-center text-[7px] text-white font-bold">
                G
              </div>
              <span className="truncate font-medium">Gmail</span>
            </div>
            <div className="h-6 w-6 flex items-center justify-center text-gray-400 mb-1 ml-1 text-lg leading-none">
              +
            </div>
          </div>
          <div className="h-[38px] bg-[#f1f3f4] border-b border-gray-200 flex items-center px-4 gap-3">
            <div className="flex gap-4 text-gray-400">
              <div className="flex gap-1 items-center opacity-40">
                <ChevronLeft size={14} />
                <ChevronRight size={14} />
              </div>
              <RotateCw size={13} className="mt-0.5" />
            </div>
            <div className="flex-1 max-w-[580px] h-[26px] bg-white border border-gray-300 rounded-[13px] flex items-center px-3 text-[11px] gap-2 ml-1">
              <Lock size={10} className="text-[#f97316]" />
              <span className="text-[#202124]">
                linear.app / workspace / my-issues
              </span>
            </div>
            <MoreVertical size={14} className="text-gray-400 ml-auto" />
          </div>
          <div className="flex-1 flex overflow-hidden">
            <div className="w-[185px] bg-[#f7f7f7] border-r border-gray-200 p-3 pt-4">
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-2 pb-2">
                Workspace
              </div>
              <div className="space-y-[1px] mb-6">
                <div className="flex items-center gap-2.5 px-2 py-1.5 text-[11px] text-gray-600">
                  🏠 Inbox{" "}
                  <span className="ml-auto text-[9px] bg-gray-200/60 px-1.5 py-0.5 rounded-full text-gray-400 font-medium">
                    4
                  </span>
                </div>
                <div className="flex items-center gap-2.5 px-2 py-1.5 text-[11px] text-gray-900 font-medium bg-gray-200 rounded-md">
                  👤 My Issues{" "}
                  <span className="ml-auto text-[9px] text-gray-400 font-medium">
                    3
                  </span>
                </div>
              </div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest px-2 pb-2">
                Team
              </div>
              <div className="space-y-[1px]">
                <div className="flex items-center gap-2.5 px-2 py-1.5 text-[11px] text-gray-600">
                  <div className="w-2 h-2 rounded-full bg-[#5e6ad2]" /> Design{" "}
                  <span className="ml-auto text-[9px] bg-gray-200/60 px-1.5 py-0.5 rounded-full text-gray-400 font-medium">
                    7
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1 p-5 ">
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm">My Issues</span>
                <div className="ml-auto border border-blue-100 px-2 py-1 rounded text-[10px] text-blue-600 bg-blue-50 font-medium italic">
                  In Progress ×
                </div>
              </div>
              {[
                {
                  id: "DES-42",
                  title: "Redesign onboarding flow for v2",
                  prio: "▲",
                  color: "text-red-500",
                },
                {
                  id: "DES-38",
                  title: "Motion spec for context-switch",
                  prio: "■",
                  color: "text-orange-500",
                },
                {
                  id: "DES-47",
                  title: "Hardware key icon set — 3 states",
                  prio: "▲",
                  color: "text-red-500",
                },
              ].map((issue, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-2.5 text-[11px] border-b border-gray-50 ${i === 0 ? "bg-blue-50/20" : ""}`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 ${i < 2 ? "border-orange-500" : "border-gray-200"}`}
                  />
                  <span className="text-gray-300 font-mono text-[9px] w-10 uppercase">
                    {issue.id}
                  </span>
                  <span className={`text-[10px] font-bold w-2 ${issue.color}`}>
                    {issue.prio}
                  </span>
                  <span className="flex-1 font-medium text-gray-800">
                    {issue.title}
                  </span>
                  <div className="w-5 h-5 rounded-full bg-[#5e6ad2] flex items-center justify-center text-[8px] text-white font-bold italic">
                    YK
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* NOTIFICATIONS (Bidirectional stagger) */}
        <div className="absolute right-3 top-8 space-y-2 z-[60]">
          {["MAIL", "SLACK", "CALENDAR"].map((app, i) => (
            <motion.div
              key={app}
              animate={{ x: isFocus ? 260 : 0, opacity: isFocus ? 0 : 1 }}
              transition={{ ...notificationSpring, delay: i * 0.1 }}
              className="w-[215px] p-3.5 bg-[#282828]/95 backdrop-blur-3xl border border-white/10 rounded-[12px] shadow-2xl text-white"
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className={`w-3 h-3 rounded-[2px] ${i === 0 ? "bg-blue-600" : i === 1 ? "bg-purple-900" : "bg-red-500"}`}
                />
                <span className="text-[9px] font-medium uppercase tracking-widest text-white/40">
                  {app}
                </span>
                <span className="ml-auto text-[9px] font-medium text-white/20">
                  now
                </span>
              </div>
              <div className="text-[12px] font-semibold text-white/95 mb-0.5 truncate ">
                {i === 0
                  ? "Re: Q2 design review"
                  : i === 1
                    ? "#design-system - Arjun"
                    : "Standup in 10 minutes"}
              </div>
            </motion.div>
          ))}
        </div>

        {/* THE DOCK (With Tooltips) */}
        <motion.div
          animate={{ opacity: isFocus ? 0 : 1, y: isFocus ? 20 : 0 }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/30 backdrop-blur-3xl border border-white/10 rounded-[18px] px-3 py-2 flex items-center gap-2.5 z-50 h-[52px]"
        >
          {[
            {
              bg: "bg-white",
              icon: (
                <Search size={16} strokeWidth={1.5} className="text-gray-400" />
              ),
              label: "Search",
              dot: true,
            },
            { bg: "bg-[#5e6ad2]", icon: "L", label: "Linear", dot: true },
            {
              bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
              icon: <Sparkles size={16} className="text-white" />,
              label: "Enter Focus",
              action: toggleFocus,
              isSpecial: true,
            },
          ].map((d, i) => (
            <div key={i} className="relative flex flex-col items-center">
              {/* MACOS TOOLTIP */}
              <AnimatePresence>
                {hoveredIndex === i && (
                  <motion.div
                    initial={{ opacity: 0, y: 0, scale: 0.9 }}
                    animate={{ opacity: 1, y: -45, scale: 1 }}
                    exit={{ opacity: 0, y: 0, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-[100] whitespace-nowrap bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-lg text-white text-[11px] font-medium shadow-xl pointer-events-none"
                  >
                    {d.label}
                    {/* Subtle arrow */}
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={d.action}
                whileHover={{ scale: 1.3, translateY: -8 }}
                transition={iconSpring}
                className={`w-8 h-8 ${d.bg} rounded-[7px] flex items-center justify-center relative shadow-md origin-bottom cursor-default`}
              >
                <span
                  className={
                    !d.isSpecial && i > 0
                      ? "text-white font-semibold text-[12px]"
                      : ""
                  }
                >
                  {d.icon}
                </span>
                {d.dot && (
                  <div className="absolute -bottom-1 w-[3px] h-[3px] bg-white/50 rounded-full" />
                )}
              </motion.div>
            </div>
          ))}
          <div className="w-[0.5px] bg-white/20 h-6 mx-1" />
          <motion.div
            onMouseEnter={() => setHoveredIndex(7)}
            onMouseLeave={() => setHoveredIndex(null)}
            whileHover={{ scale: 1.3, translateY: -8 }}
            className="relative w-8 h-8 bg-white/20 rounded-[7px] flex items-center justify-center text-sm shadow-md origin-bottom opacity-60"
          >
            {hoveredIndex === 7 && (
              <div className="absolute -top-12 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-[11px] border border-white/10">
                Trash
              </div>
            )}
            🗑
          </motion.div>
        </motion.div>

        {/* FOCUS OVERLAY */}
        <AnimatePresence>
          {isFocus && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="absolute inset-0 flex flex-col items-center justify-center z-[70] pointer-events-none"
            >
              <div className="pointer-events-auto flex flex-col items-center">
                <div className="relative w-[140px] h-[140px] flex items-center justify-center mb-3">
                  <svg className="absolute inset-0 -rotate-90 w-full h-full">
                    <circle
                      cx="70"
                      cy="70"
                      r="62"
                      fill="none"
                      stroke="rgba(255,255,255,0.08)"
                      strokeWidth="1.5"
                    />
                    <motion.circle
                      cx="70"
                      cy="70"
                      r="62"
                      fill="none"
                      stroke={
                        isActive
                          ? "rgba(255,255,255,0.5)"
                          : "rgba(255,255,255,0.2)"
                      }
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 1 }}
                      animate={{ pathLength: seconds / (25 * 60) }}
                      transition={{ duration: 1, ease: "linear" }}
                    />
                  </svg>
                  <div className="text-center">
                    <div className="text-[10px] tracking-[0.18em] uppercase text-white/25 font-bold mb-1">
                      Focus
                    </div>
                    <div className="text-[30px] font-extralight text-white/90 tabular-nums leading-none tracking-tight">
                      {formatTime(seconds)}
                    </div>
                  </div>
                </div>
                <div className="text-[12px] text-white/30 font-medium mb-10 tracking-wide italic">
                  Deep work session
                </div>
                <div className="flex gap-4">
                  {[
                    {
                      icon: <RotateCcw size={16} />,
                      label: "RESTART",
                      action: () => {
                        setSeconds(25 * 60);
                        setIsActive(true);
                      },
                    },
                    {
                      icon: isActive ? <Pause size={16} /> : <Play size={16} />,
                      label: isActive ? "PAUSE" : "PLAY",
                      action: () => setIsActive(!isActive),
                    },
                    {
                      icon: <X size={16} />,
                      label: "END",
                      action: toggleFocus,
                    },
                  ].map((k, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <motion.button
                        whileHover={{
                          backgroundColor: "rgba(255,255,255,0.08)",
                          borderColor: "rgba(255,255,255,0.2)",
                        }}
                        whileTap={{
                          scale: 0.9,
                          y: 1.5,
                          backgroundColor: "rgba(255,255,255,0.15)",
                        }}
                        transition={keySpring}
                        onClick={k.action}
                        className="w-11 h-11 bg-white/5 border border-white/10 rounded-[10px] flex items-center justify-center text-white/40"
                      >
                        {k.icon}
                      </motion.button>
                      <span className="text-[9px] tracking-[0.15em] font-bold text-white/15 uppercase">
                        {k.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* SPACEBAR HINT */}
      <div className="mt-8 left-0 right-0 flex flex-col items-center z-[100] pointer-events-none">
        <motion.div
          animate={{ opacity: isFocus ? 0.3 : 1 }}
          className="text-[10px] uppercase tracking-[0.25em] text-white/20 font-bold "
        >
          {isFocus
            ? "Spacebar to exit"
            : "Spacebar or Dock Icon to enter focus"}
        </motion.div>
      </div>
    </div>
  );
}
