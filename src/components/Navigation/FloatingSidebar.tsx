import { Home, BarChart2, User, Plus } from "lucide-react";

export function FloatingSidebar() {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 md:left-8 md:top-1/2 md:-translate-y-1/2 md:translate-x-0 md:bottom-auto flex md:flex-col items-center gap-2 md:gap-4 bg-white/80 backdrop-blur-xl border border-secondary-200 p-2 md:py-4 md:px-2 rounded-full shadow-2xl z-50">
      <button className="p-3 rounded-full hover:bg-primary-50 text-secondary-500 hover:text-primary-600 transition-colors">
        <Home className="w-6 h-6" />
      </button>
      <button className="p-3 rounded-full hover:bg-primary-50 text-secondary-500 hover:text-primary-600 transition-colors">
        <BarChart2 className="w-6 h-6" />
      </button>
      <button className="p-3 rounded-full hover:bg-primary-50 text-secondary-500 hover:text-primary-600 transition-colors">
        <User className="w-6 h-6" />
      </button>
      
      {/* Divider */}
      <div className="w-[1px] h-8 md:w-8 md:h-[1px] bg-secondary-200 mx-1 md:mx-0 md:my-2" />
      
      {/* Plus Button */}
      <button className="p-4 md:p-3 rounded-full bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/30 transition-transform hover:scale-105 active:scale-95">
        <Plus className="w-6 h-6" />
      </button>
    </nav>
  );
}
