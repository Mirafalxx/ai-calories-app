import { useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { StepGender } from './steps/StepGender';
import { StepGoal } from './steps/StepGoal';
import { StepWorkout } from './steps/StepWorkout';
import { StepBirthdate } from './steps/StepBirthdate';
import { StepMetrics } from './steps/StepMetrics';

export function OnboardingForm({ onComplete }: { onComplete: () => void }) {
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const totalSteps = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = async () => {
    if (!user) return;
    setIsSubmitting(true);
    try {
      // Save to localStorage
      localStorage.setItem('onboardingData', JSON.stringify(data));
      localStorage.setItem('isOnboarded', 'true');

      // Save to Firestore
      const userRef = doc(db, 'users', user.id);
      await setDoc(userRef, {
        gender: data.gender,
        goal: data.goal,
        workoutDays: data.workoutDays,
        birthdate: `${data.birthdate.year}-${data.birthdate.month}-${data.birthdate.day}`,
        height: parseFloat(data.height),
        weight: parseFloat(data.weight),
        isOnboarded: true,
      }, { merge: true });

      onComplete();
    } catch (err) {
      console.error('Failed to save onboarding data:', err);
      // Proceed locally even if firestore fails
      localStorage.setItem('onboardingData', JSON.stringify(data));
      localStorage.setItem('isOnboarded', 'true');
      onComplete();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-secondary-50 flex flex-col pt-12">
      <div className="max-w-md w-full mx-auto px-4 flex-grow flex flex-col">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm font-medium text-secondary-500 mb-2">
            <span>Step {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}%</span>
          </div>
          <div className="w-full h-2.5 bg-secondary-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 transition-all duration-500 ease-out rounded-full"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps Container */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-soft flex-grow mb-12">
          {step === 1 && <StepGender data={data} updateData={updateData} onNext={handleNext} />}
          {step === 2 && <StepGoal data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
          {step === 3 && <StepWorkout data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
          {step === 4 && <StepBirthdate data={data} updateData={updateData} onNext={handleNext} onBack={handleBack} />}
          {step === 5 && <StepMetrics data={data} updateData={updateData} onSubmit={handleSubmit} onBack={handleBack} isSubmitting={isSubmitting} />}
        </div>
      </div>
    </div>
  );
}
