import { useEffect, useState } from "react";

interface HalfProgressProps {
  current?: number;
  target?: number;
}

export function HalfProgress({ current = 1250, target = 2000 }: HalfProgressProps) {
  const [goal, setGoal] = useState(target);
  const [animatedOffset, setAnimatedOffset] = useState(Math.PI * 80); // Start full empty

  const radius = 80;
  const stroke = 16;
  const cx = 100;
  const cy = 100;
  const circumference = Math.PI * radius;

  // Attempt to fetch actual user goal
  useEffect(() => {
    try {
      const dataStr = localStorage.getItem("onboardingData");
      if (dataStr) {
        const data = JSON.parse(dataStr);
        if (data.dailyGoal) setGoal(Math.round(data.dailyGoal));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Animate the progress bar on load
  useEffect(() => {
    const percentage = Math.min(current / (goal || 1), 1);
    const offset = circumference - (percentage * circumference);
    // Slight delay to allow CSS transitions to catch
    const timeout = setTimeout(() => {
      setAnimatedOffset(offset);
    }, 100);
    return () => clearTimeout(timeout);
  }, [current, goal, circumference]);

  const d = `M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`;

  return (
    <div className="glass-panel p-6 px-8 rounded-[2rem] border border-secondary-100 bg-white shadow-lg shadow-secondary-200/30 mb-8 flex flex-col items-center justify-center">
      <div className="w-full flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 px-2">
        <span>Consumed</span>
        <span className="text-primary-500">Target</span>
      </div>

      <div className="relative w-[200px] h-[110px] flex items-end justify-center overflow-hidden">
        <svg width="200" height="110" className="absolute top-0 left-0 overflow-visible">
          {/* Background Track */}
          <path
            d={d}
            fill="none"
            stroke="#f1f5f9" // slate-100
            strokeWidth={stroke}
            strokeLinecap="round"
          />
          {/* Progress fill */}
          <path
            d={d}
            fill="none"
            stroke="currentColor" 
            className="text-primary-500 drop-shadow-md transition-all duration-1000 ease-out"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animatedOffset}
          />
        </svg>
        
        {/* Inner Text */}
        <div className="flex flex-col items-center pb-1 z-10">
          <p className="text-4xl font-black text-slate-800 tracking-tight">{current}</p>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Kcal</p>
        </div>
      </div>
      
      <div className="flex w-full justify-between items-center mt-3 text-sm font-semibold text-slate-400 px-4">
        <span>0</span>
        <span className="text-slate-600">{goal}</span>
      </div>
    </div>
  );
}
