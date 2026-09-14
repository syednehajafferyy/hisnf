import React, { useState, useEffect, useRef } from "react";

// Types
interface HistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: string;
}

type ThemeKey = "bubblegum" | "cyberpunk" | "rosegold" | "pastel";

interface ThemeConfig {
  name: string;
  bgGradient: string;
  calcBg: string;
  border: string;
  displayBg: string;
  displayText: string;
  expressionText: string;
  numBtn: string;
  numBtnText: string;
  opBtn: string;
  opBtnText: string;
  actionBtn: string;
  actionBtnText: string;
  equalsBtn: string;
  equalsBtnText: string;
  accentGlow: string;
}

const THEMES: Record<ThemeKey, ThemeConfig> = {
  bubblegum: {
    name: "Bubblegum Pink 🍬",
    bgGradient: "from-pink-300 via-purple-300 to-rose-300",
    calcBg: "bg-white/80 backdrop-blur-xl",
    border: "border-pink-200/80 shadow-pink-300/50",
    displayBg: "bg-pink-950/90 shadow-inner",
    displayText: "text-pink-300",
    expressionText: "text-pink-400/80",
    numBtn: "bg-pink-50 hover:bg-pink-100/80 active:bg-pink-200 border-pink-200 shadow-pink-100",
    numBtnText: "text-pink-900 font-semibold",
    opBtn: "bg-pink-400 hover:bg-pink-500 active:bg-pink-600 border-pink-400 shadow-pink-200",
    opBtnText: "text-white font-bold",
    actionBtn: "bg-rose-100 hover:bg-rose-200 active:bg-rose-300 border-rose-200 shadow-rose-100",
    actionBtnText: "text-rose-700 font-medium",
    equalsBtn: "bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-400/50",
    equalsBtnText: "text-white font-bold",
    accentGlow: "shadow-[0_0_25px_rgba(244,114,182,0.4)]",
  },
  cyberpunk: {
    name: "Neon Cyberpink ⚡",
    bgGradient: "from-slate-950 via-purple-950 to-pink-950",
    calcBg: "bg-slate-900/90 backdrop-blur-2xl border-pink-500/30",
    border: "border-pink-500/40 shadow-pink-500/20",
    displayBg: "bg-black/90 border border-pink-500/30 shadow-[inset_0_0_15px_rgba(236,72,153,0.2)]",
    displayText: "text-pink-400 drop-shadow-[0_0_8px_rgba(244,114,182,0.8)]",
    expressionText: "text-purple-400/80",
    numBtn: "bg-slate-800/80 hover:bg-pink-950/50 active:bg-pink-900/60 border-slate-700 shadow-slate-900",
    numBtnText: "text-pink-200 font-medium",
    opBtn: "bg-pink-600/30 hover:bg-pink-600/50 active:bg-pink-600/80 border-pink-500/50 shadow-pink-900/40",
    opBtnText: "text-pink-300 font-bold",
    actionBtn: "bg-purple-900/40 hover:bg-purple-800/60 active:bg-purple-700/80 border-purple-600/40 shadow-purple-950",
    actionBtnText: "text-purple-300 font-medium",
    equalsBtn: "bg-gradient-to-r from-pink-500 via-fuchsia-500 to-purple-600 hover:brightness-110 shadow-pink-500/50",
    equalsBtnText: "text-white font-bold",
    accentGlow: "shadow-[0_0_35px_rgba(236,72,153,0.3)]",
  },
  rosegold: {
    name: "Rose Gold Luxe 💎",
    bgGradient: "from-stone-900 via-rose-950 to-stone-900",
    calcBg: "bg-stone-900/85 backdrop-blur-xl border-rose-800/40",
    border: "border-rose-700/30 shadow-rose-950/80",
    displayBg: "bg-stone-950 border border-rose-800/30 shadow-inner",
    displayText: "text-rose-200",
    expressionText: "text-rose-400/60",
    numBtn: "bg-stone-800/90 hover:bg-stone-700 active:bg-stone-600 border-rose-900/30 shadow-stone-950",
    numBtnText: "text-rose-100 font-medium",
    opBtn: "bg-rose-900/60 hover:bg-rose-800 active:bg-rose-700 border-rose-700/50 shadow-rose-950",
    opBtnText: "text-rose-200 font-semibold",
    actionBtn: "bg-stone-800 hover:bg-stone-700 active:bg-stone-600 border-stone-700 shadow-stone-950",
    actionBtnText: "text-rose-300 font-medium",
    equalsBtn: "bg-gradient-to-r from-rose-400 via-rose-500 to-amber-500 hover:brightness-105 shadow-rose-900/50",
    equalsBtnText: "text-stone-950 font-bold",
    accentGlow: "shadow-[0_0_30px_rgba(251,113,133,0.2)]",
  },
  pastel: {
    name: "Pastel Dream 🌸",
    bgGradient: "from-rose-100 via-pink-100 to-indigo-100",
    calcBg: "bg-white/70 backdrop-blur-2xl border-white",
    border: "border-white/80 shadow-rose-200/60",
    displayBg: "bg-white/90 border border-pink-100 shadow-inner",
    displayText: "text-pink-600",
    expressionText: "text-pink-300",
    numBtn: "bg-white/80 hover:bg-pink-50/80 active:bg-pink-100/80 border-pink-100 shadow-pink-100/50",
    numBtnText: "text-pink-800 font-semibold",
    opBtn: "bg-pink-200 hover:bg-pink-300 active:bg-pink-400 border-pink-200 shadow-pink-200/50",
    opBtnText: "text-pink-800 font-bold",
    actionBtn: "bg-indigo-50 hover:bg-indigo-100 active:bg-indigo-200 border-indigo-100 shadow-indigo-100/50",
    actionBtnText: "text-indigo-600 font-medium",
    equalsBtn: "bg-gradient-to-r from-pink-300 to-rose-300 hover:from-pink-400 hover:to-rose-400 shadow-pink-200",
    equalsBtnText: "text-pink-900 font-bold",
    accentGlow: "shadow-[0_0_20px_rgba(244,114,182,0.25)]",
  },
};

export default function App() {
  // Calculator state
  const [display, setDisplay] = useState<string>("0");
  const [expression, setExpression] = useState<string>("");
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState<boolean>(false);
  
  // App options & extras
  const [theme, setTheme] = useState<ThemeKey>("bubblegum");
  const [isScientific, setIsScientific] = useState<boolean>(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [memory, setMemory] = useState<number>(0);
  const [hasMemory, setHasMemory] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const displayRef = useRef<HTMLDivElement>(null);

  const currentTheme = THEMES[theme];

  // Auto scroll/scale display text overflow
  useEffect(() => {
    if (displayRef.current) {
      displayRef.current.scrollLeft = displayRef.current.scrollWidth;
    }
  }, [display, expression]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2000);
  };

  const triggerKeyAnimation = (keyId: string) => {
    setActiveKey(keyId);
    setTimeout(() => setActiveKey(null), 150);
  };

  // Keyboard Event Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= "0" && e.key <= "9") {
        inputDigit(e.key);
        triggerKeyAnimation(e.key);
      } else if (e.key === ".") {
        inputDecimal();
        triggerKeyAnimation(".");
      } else if (e.key === "+") {
        handleOperator("+");
        triggerKeyAnimation("+");
      } else if (e.key === "-") {
        handleOperator("-");
        triggerKeyAnimation("-");
      } else if (e.key === "*") {
        handleOperator("×");
        triggerKeyAnimation("×");
      } else if (e.key === "/") {
        e.preventDefault();
        handleOperator("÷");
        triggerKeyAnimation("÷");
      } else if (e.key === "Enter" || e.key === "=") {
        e.preventDefault();
        calculateResult();
        triggerKeyAnimation("=");
      } else if (e.key === "Backspace") {
        handleBackspace();
        triggerKeyAnimation("backspace");
      } else if (e.key === "Escape") {
        clearAll();
        triggerKeyAnimation("AC");
      } else if (e.key === "%") {
        handlePercentage();
        triggerKeyAnimation("%");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [display, prevValue, operator, waitingForOperand, expression]);

  // Core Math Logic
  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === "0" ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay("0.");
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes(".")) {
      setDisplay(display + ".");
    }
  };

  const clearAll = () => {
    setDisplay("0");
    setExpression("");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearEntry = () => {
    setDisplay("0");
  };

  const handleBackspace = () => {
    if (waitingForOperand) return;
    if (display.length === 1 || (display.length === 2 && display.startsWith("-"))) {
      setDisplay("0");
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handleToggleSign = () => {
    const val = parseFloat(display);
    if (val === 0) return;
    setDisplay((-val).toString());
  };

  const handlePercentage = () => {
    const val = parseFloat(display);
    const result = val / 100;
    setDisplay(result.toString());
  };

  const executeMath = (firstOp: number, secondOp: number, op: string): number => {
    switch (op) {
      case "+":
        return firstOp + secondOp;
      case "-":
        return firstOp - secondOp;
      case "×":
        return firstOp * secondOp;
      case "÷":
        return secondOp === 0 ? NaN : firstOp / secondOp;
      case "^":
        return Math.pow(firstOp, secondOp);
      default:
        return secondOp;
    }
  };

  const handleOperator = (nextOperator: string) => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
      setExpression(`${inputValue} ${nextOperator} `);
    } else if (operator) {
      if (waitingForOperand) {
        setOperator(nextOperator);
        setExpression(`${prevValue} ${nextOperator} `);
        return;
      }

      const result = executeMath(prevValue, inputValue, operator);
      if (isNaN(result)) {
        setDisplay("Error");
        showToast("Cannot divide by zero! 💖");
        clearAll();
        return;
      }

      setPrevValue(result);
      setDisplay(String(Number(result.toFixed(8))));
      setExpression(`${Number(result.toFixed(8))} ${nextOperator} `);
    }

    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const calculateResult = () => {
    if (operator === null || prevValue === null) return;

    const inputValue = parseFloat(display);
    const result = executeMath(prevValue, inputValue, operator);

    if (isNaN(result)) {
      setDisplay("Error");
      showToast("Invalid Operation! 💕");
      setPrevValue(null);
      setOperator(null);
      setWaitingForOperand(false);
      return;
    }

    const formattedResult = String(Number(result.toFixed(8)));
    const fullExpr = `${prevValue} ${operator} ${inputValue} =`;

    // Save to history
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression: fullExpr,
      result: formattedResult,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setHistory((prev) => [newItem, ...prev.slice(0, 19)]); // Keep top 20

    setDisplay(formattedResult);
    setExpression("");
    setPrevValue(null);
    setOperator(null);
    setWaitingForOperand(true);
  };

  // Scientific & Advanced functions
  const handleScientific = (fn: string) => {
    const val = parseFloat(display);
    let res = 0;

    switch (fn) {
      case "sqrt":
        if (val < 0) {
          setDisplay("Error");
          showToast("Invalid Input 💖");
          return;
        }
        res = Math.sqrt(val);
        setExpression(`√(${val})`);
        break;
      case "sq":
        res = Math.pow(val, 2);
        setExpression(`(${val})²`);
        break;
      case "sin":
        res = Math.sin((val * Math.PI) / 180); // assumes degrees
        setExpression(`sin(${val}°)`);
        break;
      case "cos":
        res = Math.cos((val * Math.PI) / 180);
        setExpression(`cos(${val}°)`);
        break;
      case "tan":
        res = Math.tan((val * Math.PI) / 180);
        setExpression(`tan(${val}°)`);
        break;
      case "log":
        if (val <= 0) {
          setDisplay("Error");
          return;
        }
        res = Math.log10(val);
        setExpression(`log(${val})`);
        break;
      case "ln":
        if (val <= 0) {
          setDisplay("Error");
          return;
        }
        res = Math.log(val);
        setExpression(`ln(${val})`);
        break;
      case "pi":
        setDisplay(Math.PI.toString());
        setWaitingForOperand(false);
        return;
      case "e":
        setDisplay(Math.E.toString());
        setWaitingForOperand(false);
        return;
      case "inv":
        if (val === 0) {
          setDisplay("Error");
          return;
        }
        res = 1 / val;
        setExpression(`1/(${val})`);
        break;
      default:
        return;
    }

    const formatted = String(Number(res.toFixed(8)));
    setDisplay(formatted);
    setWaitingForOperand(true);
  };

  // Memory functions
  const handleMemory = (type: "MC" | "MR" | "M+" | "M-") => {
    const val = parseFloat(display);
    switch (type) {
      case "MC":
        setMemory(0);
        setHasMemory(false);
        showToast("Memory Cleared ✨");
        break;
      case "MR":
        setDisplay(memory.toString());
        setWaitingForOperand(false);
        showToast(`Memory Read: ${memory}`);
        break;
      case "M+":
        setMemory(memory + val);
        setHasMemory(true);
        showToast("Added to Memory 💕");
        break;
      case "M-":
        setMemory(memory - val);
        setHasMemory(true);
        showToast("Subtracted from Memory 💕");
        break;
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    showToast("Copied to clipboard! 📋");
  };

  const loadFromHistory = (item: HistoryItem) => {
    setDisplay(item.result);
    setExpression(item.expression);
    setWaitingForOperand(true);
    setShowHistory(false);
  };

  // Render dynamic style classes for key animation
  const getKeyStyle = (id: string, baseStyle: string) => {
    const isActive = activeKey === id;
    return `${baseStyle} transition-all duration-150 transform ${
      isActive ? "scale-95 brightness-125 shadow-inner" : "hover:scale-[1.02] active:scale-95"
    }`;
  };

  return (
    <div
      className={`min-h-screen w-full bg-gradient-to-br ${currentTheme.bgGradient} flex items-center justify-center p-4 sm:p-6 transition-all duration-500 font-sans relative overflow-hidden select-none`}
    >
      {/* Background Decorative Glowing Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-pink-400/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-300/20 rounded-full blur-3xl pointer-events-none" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-50 bg-pink-600/90 text-white text-sm font-medium px-4 py-2 rounded-full shadow-lg border border-pink-400/40 backdrop-blur-md animate-bounce flex items-center gap-2">
          <span>💖</span>
          {toastMessage}
        </div>
      )}

      {/* Calculator Container */}
      <div
        className={`w-full max-w-md rounded-3xl p-5 sm:p-6 border ${currentTheme.border} ${currentTheme.calcBg} ${currentTheme.accentGlow} transition-all duration-300 relative z-10 flex flex-col gap-4`}
      >
        {/* Top Bar / Header */}
        <div className="flex items-center justify-between gap-2 px-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-pink-500 animate-ping" />
            <h1 className={`font-bold text-lg tracking-wide ${currentTheme.numBtnText} flex items-center gap-1.5`}>
              <span>PinkCalc</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-600 font-normal">
                v2.0
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Scientific Mode Toggle */}
            <button
              onClick={() => setIsScientific(!isScientific)}
              title="Toggle Scientific Mode"
              className={`p-2 rounded-xl text-xs font-semibold transition-all ${
                isScientific
                  ? "bg-pink-500 text-white shadow-md shadow-pink-500/30"
                  : `${currentTheme.actionBtn} ${currentTheme.actionBtnText}`
              }`}
            >
              Sci 🧪
            </button>

            {/* History Drawer Toggle */}
            <button
              onClick={() => setShowHistory(!showHistory)}
              title="Calculation History"
              className={`p-2 rounded-xl text-xs font-semibold transition-all relative ${
                showHistory
                  ? "bg-pink-500 text-white shadow-md shadow-pink-500/30"
                  : `${currentTheme.actionBtn} ${currentTheme.actionBtnText}`
              }`}
            >
              📜
              {history.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full" />
              )}
            </button>

            {/* Theme Selector Dropdown */}
            <div className="relative group">
              <button
                className={`p-2 rounded-xl text-xs font-semibold ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                title="Change Palette"
              >
                🎨
              </button>

              <div className="absolute right-0 top-full mt-2 w-44 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl border border-pink-200 dark:border-pink-900/50 p-1.5 z-50 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 scale-95 group-hover:scale-100 origin-top-right">
                {(Object.keys(THEMES) as ThemeKey[]).map((tk) => (
                  <button
                    key={tk}
                    onClick={() => setTheme(tk)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                      theme === tk
                        ? "bg-pink-500 text-white font-bold"
                        : "text-slate-700 dark:text-slate-300 hover:bg-pink-50 dark:hover:bg-slate-800"
                    }`}
                  >
                    <span>{THEMES[tk].name}</span>
                    {theme === tk && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Display Screen */}
        <div
          className={`w-full rounded-2xl p-4 flex flex-col justify-between min-h-[110px] relative overflow-hidden transition-all duration-300 ${currentTheme.displayBg}`}
        >
          {/* Top Info Bar inside Screen */}
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-mono text-pink-400/60 flex items-center gap-1">
              {hasMemory && <span className="bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded text-[10px] border border-pink-500/30">M</span>}
              {isScientific && <span className="bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded text-[10px] border border-purple-500/30">RAD</span>}
            </span>

            {/* Expression Log Display */}
            <div className={`font-mono text-right truncate pl-2 ${currentTheme.expressionText}`}>
              {expression || "\u00A0"}
            </div>
          </div>

          {/* Main Number Display */}
          <div
            ref={displayRef}
            onClick={() => copyToClipboard(display)}
            title="Click to copy"
            className={`font-mono font-bold text-3xl sm:text-4xl text-right tracking-tight overflow-x-auto whitespace-nowrap scrollbar-none cursor-pointer transition-all ${currentTheme.displayText}`}
          >
            {display}
          </div>

          {/* Sparkle decorative icon */}
          <div className="absolute left-2 bottom-2 text-pink-400/20 text-xs pointer-events-none">
            ✨
          </div>
        </div>

        {/* Slide-out / Overlaid History Panel */}
        {showHistory ? (
          <div className="w-full h-[340px] rounded-2xl bg-black/40 backdrop-blur-md border border-pink-500/20 p-3 flex flex-col gap-2 animate-fadeIn">
            <div className="flex items-center justify-between px-2 pb-2 border-b border-pink-500/20">
              <span className={`text-xs font-bold ${currentTheme.numBtnText} flex items-center gap-1`}>
                <span>History</span> 💕
              </span>
              <button
                onClick={() => setHistory([])}
                className="text-[11px] text-rose-400 hover:text-rose-300 underline font-medium"
              >
                Clear
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {history.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-pink-300/50 text-xs gap-1">
                  <span>🎀</span>
                  <span>No calculation history yet</span>
                </div>
              ) : (
                history.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => loadFromHistory(item)}
                    className="p-2 rounded-xl bg-white/10 hover:bg-white/20 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-all cursor-pointer border border-pink-500/10 flex flex-col gap-0.5 group"
                  >
                    <div className="flex justify-between items-center text-[10px] text-pink-300/70 font-mono">
                      <span>{item.timestamp}</span>
                      <span className="opacity-0 group-hover:opacity-100 text-pink-400 font-sans">
                        Tap to load ↵
                      </span>
                    </div>
                    <div className="text-xs text-pink-200/80 font-mono truncate">
                      {item.expression}
                    </div>
                    <div className="text-sm font-bold text-pink-300 font-mono text-right">
                      {item.result}
                    </div>
                  </div>
                ))
              )}
            </div>

            <button
              onClick={() => setShowHistory(false)}
              className={`w-full py-2 rounded-xl text-xs font-bold ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
            >
              Close History
            </button>
          </div>
        ) : (
          /* Main Keyboard Grid */
          <div className="flex flex-col gap-2">
            {/* Memory Toolbar */}
            <div className="grid grid-cols-4 gap-1.5">
              {(["MC", "MR", "M+", "M-"] as const).map((mKey) => (
                <button
                  key={mKey}
                  onClick={() => handleMemory(mKey)}
                  className={`py-1.5 text-xs font-bold rounded-xl border border-pink-400/10 ${currentTheme.actionBtn} ${currentTheme.actionBtnText} opacity-80 hover:opacity-100 transition-all active:scale-95`}
                >
                  {mKey}
                </button>
              ))}
            </div>

            {/* Scientific Drawer (Collapsible) */}
            {isScientific && (
              <div className="grid grid-cols-5 gap-1.5 p-2 rounded-2xl bg-black/10 dark:bg-white/5 border border-pink-500/20 animate-fadeIn">
                <button
                  onClick={() => handleScientific("sin")}
                  className={`py-2 text-xs rounded-xl font-mono ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                >
                  sin
                </button>
                <button
                  onClick={() => handleScientific("cos")}
                  className={`py-2 text-xs rounded-xl font-mono ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                >
                  cos
                </button>
                <button
                  onClick={() => handleScientific("tan")}
                  className={`py-2 text-xs rounded-xl font-mono ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                >
                  tan
                </button>
                <button
                  onClick={() => handleScientific("sqrt")}
                  className={`py-2 text-xs rounded-xl font-mono ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                >
                  √x
                </button>
                <button
                  onClick={() => handleScientific("sq")}
                  className={`py-2 text-xs rounded-xl font-mono ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                >
                  x²
                </button>
                <button
                  onClick={() => handleScientific("pi")}
                  className={`py-2 text-xs rounded-xl font-mono ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                >
                  π
                </button>
                <button
                  onClick={() => handleScientific("e")}
                  className={`py-2 text-xs rounded-xl font-mono ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                >
                  e
                </button>
                <button
                  onClick={() => handleScientific("log")}
                  className={`py-2 text-xs rounded-xl font-mono ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                >
                  log
                </button>
                <button
                  onClick={() => handleScientific("ln")}
                  className={`py-2 text-xs rounded-xl font-mono ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                >
                  ln
                </button>
                <button
                  onClick={() => handleScientific("inv")}
                  className={`py-2 text-xs rounded-xl font-mono ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`}
                >
                  1/x
                </button>
              </div>
            )}

            {/* Main Keypad Grid */}
            <div className="grid grid-cols-4 gap-2">
              {/* Row 1 */}
              <button
                onClick={clearAll}
                className={getKeyStyle("AC", `py-3.5 text-sm rounded-2xl border ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`)}
              >
                AC
              </button>
              <button
                onClick={handleToggleSign}
                className={getKeyStyle("+/-", `py-3.5 text-sm rounded-2xl border ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`)}
              >
                ±
              </button>
              <button
                onClick={handlePercentage}
                className={getKeyStyle("%", `py-3.5 text-sm rounded-2xl border ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`)}
              >
                %
              </button>
              <button
                onClick={() => handleOperator("÷")}
                className={getKeyStyle("÷", `py-3.5 text-lg rounded-2xl border ${currentTheme.opBtn} ${currentTheme.opBtnText}`)}
              >
                ÷
              </button>

              {/* Row 2 */}
              <button
                onClick={() => inputDigit("7")}
                className={getKeyStyle("7", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                7
              </button>
              <button
                onClick={() => inputDigit("8")}
                className={getKeyStyle("8", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                8
              </button>
              <button
                onClick={() => inputDigit("9")}
                className={getKeyStyle("9", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                9
              </button>
              <button
                onClick={() => handleOperator("×")}
                className={getKeyStyle("×", `py-3.5 text-lg rounded-2xl border ${currentTheme.opBtn} ${currentTheme.opBtnText}`)}
              >
                ×
              </button>

              {/* Row 3 */}
              <button
                onClick={() => inputDigit("4")}
                className={getKeyStyle("4", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                4
              </button>
              <button
                onClick={() => inputDigit("5")}
                className={getKeyStyle("5", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                5
              </button>
              <button
                onClick={() => inputDigit("6")}
                className={getKeyStyle("6", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                6
              </button>
              <button
                onClick={() => handleOperator("-")}
                className={getKeyStyle("-", `py-3.5 text-lg rounded-2xl border ${currentTheme.opBtn} ${currentTheme.opBtnText}`)}
              >
                -
              </button>

              {/* Row 4 */}
              <button
                onClick={() => inputDigit("1")}
                className={getKeyStyle("1", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                1
              </button>
              <button
                onClick={() => inputDigit("2")}
                className={getKeyStyle("2", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                2
              </button>
              <button
                onClick={() => inputDigit("3")}
                className={getKeyStyle("3", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                3
              </button>
              <button
                onClick={() => handleOperator("+")}
                className={getKeyStyle("+", `py-3.5 text-lg rounded-2xl border ${currentTheme.opBtn} ${currentTheme.opBtnText}`)}
              >
                +
              </button>

              {/* Row 5 */}
              <button
                onClick={() => inputDigit("0")}
                className={getKeyStyle("0", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                0
              </button>
              <button
                onClick={inputDecimal}
                className={getKeyStyle(".", `py-3.5 text-lg rounded-2xl border ${currentTheme.numBtn} ${currentTheme.numBtnText}`)}
              >
                .
              </button>
              <button
                onClick={handleBackspace}
                title="Backspace"
                className={getKeyStyle("backspace", `py-3.5 text-sm flex items-center justify-center rounded-2xl border ${currentTheme.actionBtn} ${currentTheme.actionBtnText}`)}
              >
                ⌫
              </button>
              <button
                onClick={calculateResult}
                className={getKeyStyle("=", `py-3.5 text-xl rounded-2xl border-0 shadow-lg ${currentTheme.equalsBtn} ${currentTheme.equalsBtnText}`)}
              >
                =
              </button>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="text-center text-[11px] opacity-60 font-medium text-pink-700 dark:text-pink-300/60 mt-1 flex items-center justify-center gap-1">
          <span>Crafted with</span>
          <span className="text-pink-500 animate-bounce">💖</span>
          <span>for math lovers</span>
        </div>
      </div>
    </div>
  );
}