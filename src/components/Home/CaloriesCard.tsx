import { Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export function CaloriesCard() {
  const [dailyGoal, setDailyGoal] = useState(2000);

  useEffect(() => {
    try {
      const dataStr = localStorage.getItem("onboardingData");
      if (dataStr) {
        const data = JSON.parse(dataStr);
        if (data.dailyGoal) {
          setDailyGoal(Math.round(data.dailyGoal));
        }
      }
    } catch (e) {
      console.error("Failed to parse onboarding data block", e);
    }
  }, []);

  return (
    <div className="glass-panel p-6 rounded-[2rem] border border-secondary-100 bg-white shadow-lg shadow-secondary-200/30 mb-8 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-1">
          Remaining
        </span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-[2.5rem] leading-none font-black text-slate-800">
            {dailyGoal.toLocaleString()}
          </span>
          <span className="text-lg font-semibold text-slate-500">kcal</span>
        </div>
      </div>
      
      <button className="p-3.5 bg-slate-50 text-slate-500 rounded-full hover:bg-primary-50 hover:text-primary-600 transition-colors border border-slate-100 shadow-sm">
        <Pencil className="w-5 h-5" />
      </button>
    </div>
  );
}
