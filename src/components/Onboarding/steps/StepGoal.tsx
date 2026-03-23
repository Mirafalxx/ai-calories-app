import { ArrowUpRight01Icon, ArrowDownRight01Icon, ArrowRight01Icon } from 'hugeicons-react';

interface Props {
  data: { goal: string };
  updateData: (data: Partial<{ goal: string }>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepGoal({ data, updateData, onNext, onBack }: Props) {
  const options = [
    { id: 'lose', label: 'Lose Weight', icon: ArrowDownRight01Icon, desc: 'Burn fat and get leaner' },
    { id: 'maintain', label: 'Maintain', icon: ArrowRight01Icon, desc: 'Keep your current physique' },
    { id: 'gain', label: 'Gain Weight', icon: ArrowUpRight01Icon, desc: 'Build muscle and size' },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">What is your primary goal?</h2>
        <p className="text-secondary-500 mb-8">This will define your daily calorie target.</p>
        
        <div className="space-y-4">
          {options.map((option) => {
             const Icon = option.icon;
             const isSelected = data.goal === option.id;
             return (
               <button
                 key={option.id}
                 onClick={() => updateData({ goal: option.id })}
                 className={`w-full flex items-center p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                   isSelected 
                     ? 'border-primary-500 bg-primary-50' 
                     : 'border-secondary-200 hover:border-primary-300 hover:bg-secondary-50'
                 }`}
               >
                 <div className={`p-3 rounded-lg mr-4 ${isSelected ? 'bg-primary-500 text-white' : 'bg-secondary-100 text-secondary-500'}`}>
                   <Icon className="w-6 h-6" />
                 </div>
                 <div>
                   <span className={`block text-lg font-medium ${isSelected ? 'text-primary-700' : 'text-secondary-800'}`}>{option.label}</span>
                   <span className={`block text-sm ${isSelected ? 'text-primary-600' : 'text-secondary-500'}`}>{option.desc}</span>
                 </div>
               </button>
             );
          })}
        </div>
      </div>
      
      <div className="mt-8 flex gap-3">
        <button
          onClick={onBack}
          className="w-1/3 py-3.5 rounded-xl text-secondary-600 font-medium hover:bg-secondary-100 transition-colors"
        >
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!data.goal}
          className="w-2/3 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
