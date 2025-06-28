
import React, { useState, useMemo } from 'react';

const BMICalculator: React.FC = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric');

  const bmiResult = useMemo(() => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      return null;
    }

    let bmi;
    if (unit === 'metric') {
      // height in cm, weight in kg
      bmi = w / ((h / 100) * (h / 100));
    } else {
      // height in inches, weight in lbs
      bmi = (w / (h * h)) * 703;
    }

    const bmiValue = parseFloat(bmi.toFixed(1));
    let category = '';
    let color = '';

    if (bmiValue < 18.5) {
      category = 'Underweight';
      color = 'text-blue-500';
    } else if (bmiValue < 25) {
      category = 'Normal weight';
      color = 'text-green-500';
    } else if (bmiValue < 30) {
      category = 'Overweight';
      color = 'text-yellow-500';
    } else {
      category = 'Obesity';
      color = 'text-red-500';
    }
    
    return { value: bmiValue, category, color };
  }, [height, weight, unit]);

  const heightLabel = unit === 'metric' ? 'Height (cm)' : 'Height (in)';
  const weightLabel = unit === 'metric' ? 'Weight (kg)' : 'Weight (lbs)';

  return (
    <div className="max-w-md mx-auto">
        <div className="flex justify-center mb-6">
            <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-lg">
                <button onClick={() => setUnit('metric')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${unit === 'metric' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}>Metric</button>
                <button onClick={() => setUnit('imperial')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${unit === 'imperial' ? 'bg-white dark:bg-gray-800 shadow' : ''}`}>Imperial</button>
            </div>
        </div>
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{heightLabel}</label>
                <input type="number" value={height} onChange={e => setHeight(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{weightLabel}</label>
                <input type="number" value={weight} onChange={e => setWeight(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
        </div>
        {bmiResult && (
            <div className="mt-8 text-center bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <p className="text-lg text-gray-600 dark:text-gray-400">Your BMI is</p>
                <p className={`text-6xl font-bold my-2 ${bmiResult.color}`}>{bmiResult.value}</p>
                <p className={`text-xl font-semibold ${bmiResult.color}`}>{bmiResult.category}</p>
            </div>
        )}
    </div>
  );
};

export default BMICalculator;
