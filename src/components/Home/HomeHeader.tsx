import { useUser } from "@clerk/clerk-react";
import { Bell } from "lucide-react";

export function HomeHeader() {
  const { user } = useUser();

  return (
    <header className="flex items-center justify-between pb-6">
      <div className="flex items-center gap-4">
        <img 
          src={user?.imageUrl} 
          alt="Profile" 
          className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
        />
        <div className="flex flex-col">
          <p className="text-sm font-medium text-slate-500">Welcome back,</p>
          <h1 className="text-xl font-bold text-slate-800">{user?.firstName || "User"}</h1>
        </div>
      </div>
      
      <button className="relative p-2.5 rounded-full bg-white border border-slate-100 shadow-sm hover:bg-slate-50 transition-colors">
        <Bell className="w-6 h-6 text-slate-600" />
        <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-error-500 rounded-full border-2 border-white"></span>
      </button>
    </header>
  );
}
