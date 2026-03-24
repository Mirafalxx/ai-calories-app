import { Pencil, Beef, Droplet, Wheat } from "lucide-react";
import { useEffect, useState } from "react";

export function CaloriesCard() {
  const [dailyGoal, setDailyGoal] = useState(2000);
  
  // Calculate approximate macros based on standard 50/30/20 split
  const carbs = Math.round((dailyGoal * 0.5) / 4);
  const protein = Math.round((dailyGoal * 0.3) / 4);
  const fat = Math.round((dailyGoal * 0.2) / 9);

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
    <div className="glass-panel p-6 rounded-[2rem] border border-secondary-100 bg-white shadow-lg shadow-secondary-200/30 mb-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
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

      <div className="grid grid-cols-3 gap-3">
        {/* Carbs */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-3 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
            <Wheat className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Carbs</span>
          <span className="text-sm font-black text-slate-700">{carbs}g</span>
        </div>

        {/* Proteins */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-3 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-500 flex items-center justify-center">
            <Beef className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Proteins</span>
          <span className="text-sm font-black text-slate-700">{protein}g</span>
        </div>

        {/* Fat */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-3 flex flex-col items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-500 flex items-center justify-center">
            <Droplet className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fat</span>
          <span className="text-sm font-black text-slate-700">{fat}g</span>
        </div>
      </div>
    </div>
  );
}
