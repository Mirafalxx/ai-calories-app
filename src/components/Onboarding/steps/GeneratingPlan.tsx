import { useEffect, useState, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { doc, setDoc } from 'firebase/firestore';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Loader2 } from 'lucide-react';
import { AiBrain01Icon } from 'hugeicons-react';
import { db } from '../../../lib/firebase';

interface Props {
  data: any;
  onComplete: () => void;
}

export function GeneratingPlan({ data, onComplete }: Props) {
  const { user } = useUser();
  const [status, setStatus] = useState('Analyzing your profile...');
  const [error, setError] = useState('');
  const hasGenerated = useRef(false);

  useEffect(() => {
    if (hasGenerated.current || !user) return;
    hasGenerated.current = true;

    async function generateAndSave() {
      try {
        const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
        if (!apiKey) {
          throw new Error('Gemini API key is missing. Please add VITE_GEMINI_API_KEY to your .env file.');
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
          You are an expert fitness and nutrition AI. Given the following user profile:
          Gender: ${data.gender}
          Goal: ${data.goal}
          Workout Frequency: ${data.workoutDays} days/week
          Birthdate: ${data.birthdate.year}-${data.birthdate.month}-${data.birthdate.day}
          Height: ${data.height} feet
          Weight: ${data.weight} kg

          Calculate the following for this specific user to hit their goal:
          1. Daily calories required.
          2. Daily protein (grams).
          3. Daily carbs (grams).
          4. Daily fats (grams).
          5. Daily water intake (liters).
          6. A highly personalized fitness tip.

          Return EXACTLY and ONLY a valid JSON object (NO markdown, NO code block ticks) with the following exact keys:
          "calories" (number), "protein" (number), "carbs" (number), "fats" (number), "water" (number), "tip" (string).
        `;

        setStatus('Calculating optimal metabolic rate...');
        
        const result = await model.generateContent(prompt);
        setStatus('Building your AI fitness plan...');

        const responseText = result.response.text();
        const jsonMatch = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
        const aiPlan = JSON.parse(jsonMatch);

        // Save everything to Firestore
        setStatus('Saving securely to your profile...');
        
        const userRef = doc(db, 'users', user?.id || '');
        
        const onboardingPayload = {
          gender: data.gender,
          goal: data.goal,
          workoutDays: data.workoutDays,
          birthdate: `${data.birthdate.year}-${data.birthdate.month}-${data.birthdate.day}`,
          height: parseFloat(data.height),
          weight: parseFloat(data.weight),
          isOnboarded: true,
          dailyGoal: aiPlan.calories,
          aiPlan: aiPlan,
        };

        await setDoc(userRef, onboardingPayload, { merge: true });

        // Save locally for quick access
        localStorage.setItem('onboardingData', JSON.stringify(onboardingPayload));
        localStorage.setItem('isOnboarded', 'true');

        onComplete();
      } catch (err: any) {
        console.error('Generation Error:', err);
        setError(err.message || 'Failed to generate plan. Please try again.');
      }
    }

    generateAndSave();
  }, [data, user, onComplete]);

  return (
    <div className="flex flex-col h-full items-center justify-center animate-in fade-in zoom-in-95 duration-700 py-12">
      <div className="relative mb-8">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-primary-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
        <div className="relative bg-white p-6 rounded-3xl border border-secondary-100 shadow-xl">
          <AiBrain01Icon className="w-20 h-20 text-primary-500 animate-pulse" />
          <Loader2 className="w-8 h-8 text-primary-600 animate-spin absolute -bottom-3 -right-3 bg-white rounded-full p-1 shadow-sm" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-secondary-800 mb-2 truncate max-w-full">
        {error ? 'Uh oh!' : 'Generating AI Plan'}
      </h2>
      
      {error ? (
        <div className="text-center">
          <p className="text-error-600 font-medium mb-6 px-4">{error}</p>
          <button 
             onClick={() => window.location.reload()}
             className="px-6 py-2 bg-primary-500 text-white rounded-xl font-medium"
          >
            Try Again
          </button>
        </div>
      ) : (
        <p className="text-secondary-500 font-medium animate-pulse">{status}</p>
      )}
    </div>
  );
}
