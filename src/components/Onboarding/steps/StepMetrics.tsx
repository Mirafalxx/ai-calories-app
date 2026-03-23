import { RulerIcon, WeightScaleIcon } from 'hugeicons-react';

interface Props {
  data: { height: string; weight: string };
  updateData: (data: Partial<{ height: string; weight: string }>) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
}

export function StepMetrics({ data, updateData, onSubmit, onBack, isSubmitting }: Props) {
  const isValid = data.height.trim().length > 0 && data.weight.trim().length > 0;

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex-grow">
        <h2 className="text-2xl font-bold text-secondary-800 mb-2">Final details</h2>
        <p className="text-secondary-500 mb-8">We use this to calculate your BMI and exact calorie needs.</p>
        
        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-secondary-600 mb-2">
              <RulerIcon className="w-5 h-5" /> Height (Feet)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 5.8"
                value={data.height}
                onChange={(e) => updateData({ height: e.target.value })}
                className="w-full text-xl font-medium p-4 pr-12 rounded-xl border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 font-medium">ft</span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-secondary-600 mb-2">
              <WeightScaleIcon className="w-5 h-5" /> Weight (Kg)
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                placeholder="e.g. 70"
                value={data.weight}
                onChange={(e) => updateData({ weight: e.target.value })}
                className="w-full text-xl font-medium p-4 pr-12 rounded-xl border border-secondary-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-400 font-medium">kg</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex gap-3">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="w-1/3 py-3.5 rounded-xl text-secondary-600 font-medium hover:bg-secondary-100 transition-colors disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!isValid || isSubmitting}
          className="w-2/3 bg-primary-500 hover:bg-primary-600 text-white font-medium py-3.5 rounded-xl transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Complete Profile'
          )}
        </button>
      </div>
    </div>
  );
}
