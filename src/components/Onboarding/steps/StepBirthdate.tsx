import { Calendar02Icon } from 'hugeicons-react';

interface Props {
  data: { birthdate: { day: string; month: string; year: string } };
  updateData: (data: Partial<{ birthdate: { day: string; month: string; year: string } }>) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepBirthdate({ data, updateData, onNext, onBack }: Props) {
  const handleChange = (field: 'day' | 'month' | 'year', value: string) => {
    updateData({
      birthdate: { ...data.birthdate, [field]: value }
    });
  };

  const isValid = data.birthdate.day && data.birthdate.month && data.birthdate.year.length === 4;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex-grow">
        <div className="flex items-center gap-3 mb-2">
          <Calendar02Icon className="w-8 h-8 text-primary-500" />
          <h2 className="text-2xl font-bold text-secondary-800">When were you born?</h2>
        </div>
        <p className="text-secondary-500 mb-8">Age affects your metabolic rate.</p>
        
        <div className="flex gap-4">
          <div className="w-1/4">
            <label className="block text-sm font-medium text-secondary-600 mb-1">Day</label>
            <input
              type="text"
              placeholder="DD"
              maxLength={2}
              value={data.birthdate.day}
              onChange={(e) => handleChange('day', e.target.value.replace(/\D/g, ''))}
              className="w-full text-center text-xl font-medium p-3 rounded-xl border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="w-1/4">
            <label className="block text-sm font-medium text-secondary-600 mb-1">Month</label>
            <input
              type="text"
              placeholder="MM"
              maxLength={2}
              value={data.birthdate.month}
              onChange={(e) => handleChange('month', e.target.value.replace(/\D/g, ''))}
              className="w-full text-center text-xl font-medium p-3 rounded-xl border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
          <div className="w-2/4">
            <label className="block text-sm font-medium text-secondary-600 mb-1">Year</label>
            <input
              type="text"
              placeholder="YYYY"
              maxLength={4}
              value={data.birthdate.year}
              onChange={(e) => handleChange('year', e.target.value.replace(/\D/g, ''))}
              className="w-full text-center text-xl font-medium p-3 rounded-xl border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
            />
          </div>
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
          disabled={!isValid}
          className="w-2/3 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3.5 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
