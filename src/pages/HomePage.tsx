import { HomeHeader } from "../components/Home/HomeHeader";
import { WeeklyCalendar } from "../components/Home/WeeklyCalendar";
import { CaloriesCard } from "../components/Home/CaloriesCard";
import { HalfProgress } from "../components/Home/HalfProgress";

export function HomePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <HomeHeader />
      <WeeklyCalendar />
      
      <main>
        <CaloriesCard />
        <HalfProgress />
        {/* Additional home screen content will be placed here */}
      </main>
    </div>
  );
}
