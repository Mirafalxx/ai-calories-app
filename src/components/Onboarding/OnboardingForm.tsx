import { useState } from 'react';
import { StepGender } from './steps/StepGender';
import { StepGoal } from './steps/StepGoal';
import { StepWorkout } from './steps/StepWorkout';
import { StepBirthdate } from './steps/StepBirthdate';
import { StepMetrics } from './steps/StepMetrics';
import { GeneratingPlan } from './steps/GeneratingPlan';

export function OnboardingForm({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [data, setData] = useState({
    gender: '',
    goal: '',
    workoutDays: '',
    birthdate: { day: '', month: '', year: '' },
    height: '',
    weight: '',
  });

  const updateData = (newData: Partial<typeof data>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => setStep((s) => Math.min(totalSteps, s + 1));
  const handleBack = () => setStep((s) => Math.max(1, s - 1));

  return (
    <div className="min-h-screen bg-secondary-50 flex flex-col pt-12">
      <div className="max-w-md w-full mx-auto px-4 flex-grow flex flex-col">
        {/* Progress Bar (hide perfectly on last generation step) */}
        {step < 6 && (
          <div className="mb-8">
            <div className="flex justify-between text-sm font-medium text-secondary-500 mb-2">
              <span>Step {step} of 5</span>
              <span>{Math.round((step / 5) * 100)}%</span>
            </div>
            <div className="w-full h-2.5 bg-secondary-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 transition-all duration-500 ease-out rounded-full"
                style={{ width: `${(step / 5) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Steps Container */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl flex-grow mb-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)]">
          {step === 1 && <StepGender data={data} updateData={updateData} onNext={handleNext} />}
          {step === 2 && <StepGoal data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
          {step === 3 && <StepWorkout data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
          {step === 4 && <StepBirthdate data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
          {step === 5 && <StepMetrics data={data} updateData={updateData} onSubmit={handleNext} onBack={handleBack} isSubmitting={false} />}
          {step === 6 && <GeneratingPlan data={data} onComplete={onComplete} />}
        </div>
      </div>
    </div>
  );
}
