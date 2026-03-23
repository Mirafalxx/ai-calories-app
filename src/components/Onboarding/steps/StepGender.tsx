import { UserAdd02Icon, Female02Icon, UserIcon } from 'hugeicons-react';

interface Props {
  data: { gender: string };
  updateData: (data: Partial<{ gender: string }>) => void;
  onNext: () => void;
}

export function StepGender({ data, updateData, onNext }: Props) {
  const options = [
    { id: 'male', label: 'Male', icon: UserIcon },
    { id: 'female', label: 'Female', icon: Female02Icon },
    { id: 'other', label: 'Other', icon: UserAdd02Icon },
  ];

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">What's your gender?</h2>
        <p className="text-secondary-500 mb-8">This helps us calculate your personalized calorie needs accurately.</p>
        
        <div className="space-y-4">
          {options.map((option) => {
             const Icon = option.icon;
             const isSelected = data.gender === option.id;
             return (
               <button
                 key={option.id}
                 onClick={() => updateData({ gender: option.id })}
                 className={`w-full flex items-center p-4 rounded-xl border-2 transition-all duration-200 ${
                   isSelected 
                     ? 'border-primary-500 bg-primary-50 text-primary-700' 
                     : 'border-secondary-200 hover:border-primary-300 hover:bg-secondary-50 text-secondary-700'
                 }`}
               >
                 <div className={`p-3 rounded-lg mr-4 ${isSelected ? 'bg-primary-500 text-white' : 'bg-secondary-100 text-secondary-500'}`}>
                   <Icon className="w-6 h-6" />
                 </div>
                 <span className="text-lg font-medium">{option.label}</span>
               </button>
             );
          })}
        </div>
      </div>
      
      <button
        onClick={onNext}
        disabled={!data.gender}
        className="mt-8 w-full bg-primary-500 hover:bg-primary-600 text-white font-medium py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </div>
  );
}
