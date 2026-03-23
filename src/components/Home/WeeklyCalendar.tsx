import { useState, useRef, useEffect, useMemo } from 'react';

// Helpers to format date
const getShortDay = (date: Date) => {
  return date.toLocaleDateString("en-US", { weekday: "short" });
};

const getDateNumber = (date: Date) => {
  return date.getDate().toString();
};

const isSameDay = (d1: Date, d2: Date) => {
  return d1.getDate() === d2.getDate() && 
         d1.getMonth() === d2.getMonth() && 
         d1.getFullYear() === d2.getFullYear();
};

export function WeeklyCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  // Generate continuous past 35 days ending at the current week's Sunday
  const dates = useMemo(() => {
    const today = new Date();
    const result = [];
    
    // Find the end of the current week (Sunday)
    const currentDayOfWeek = today.getDay(); // 0 is Sunday, 1 is Monday
    const daysUntilSunday = currentDayOfWeek === 0 ? 0 : 7 - currentDayOfWeek;
    
    const endDate = new Date(today);
    endDate.setDate(today.getDate() + daysUntilSunday);

    // Generate 35 days (5 weeks) ending on this upcoming Sunday
    for (let i = 34; i >= 0; i--) {
      const date = new Date(endDate);
      date.setDate(endDate.getDate() - i);
      result.push(date);
    }
    return result;
  }, []);

  const today = new Date();

  useEffect(() => {
    // Scroll to highlight Today visually instantly on component mount
    if (scrollRef.current) {
      const todayElement = scrollRef.current.querySelector('[data-istoday="true"]') as HTMLElement;
      if (todayElement) {
        // Center the element in the scroll view
        const containerWidth = scrollRef.current.clientWidth;
        const elementOffset = todayElement.offsetLeft;
        const scrollPosition = elementOffset - (containerWidth / 2) + (todayElement.clientWidth / 2);
        
        scrollRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth"
        });
      }
    }
  }, [dates]);

  return (
    <div className="mb-6">
      <div 
        ref={scrollRef}
        className="flex gap-2.5 overflow-x-auto no-scrollbar scroll-smooth pb-2 -mx-4 px-4 md:mx-0 md:px-0"
      >
        {dates.map((date, index) => {
          const isSelected = isSameDay(date, selectedDate);
          const isTodayDate = isSameDay(date, today);

          return (
            <button
              key={index}
              data-istoday={isTodayDate}
              onClick={() => setSelectedDate(date)}
              className={`flex flex-col items-center min-w-[60px] rounded-full p-2 transition-all duration-300 border ${
                isSelected
                  ? "bg-primary-500 border-primary-500 shadow-md shadow-primary-500/30"
                  : "bg-white border-transparent hover:border-primary-100"
              }`}
            >
              <span 
                className={`text-xs font-medium mb-1.5 ${
                  isSelected ? "text-primary-50" : "text-slate-400"
                }`}
              >
                {getShortDay(date)}
              </span>
              <div 
                className={`w-11 h-11 rounded-full flex items-center justify-center text-[15px] font-semibold transition-colors shadow-sm ${
                  isSelected
                    ? "bg-white text-primary-600"
                    : isTodayDate
                    ? "bg-primary-50 text-primary-700 border border-primary-100"
                    : "bg-transparent text-slate-700 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                {getDateNumber(date)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
