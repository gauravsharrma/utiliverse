
import React, { useState, useMemo } from 'react';

const EMICalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('100000');
  const [interest, setInterest] = useState('8.5');
  const [tenure, setTenure] = useState('5');

  const emiResult = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(interest) / 12 / 100;
    const n = parseFloat(tenure) * 12;

    if (!p || !r || !n || p <= 0 || r < 0 || n <= 0) {
      return null;
    }

    if (r === 0) { // Handle zero interest rate
        const emi = p / n;
        return {
            emi: emi.toFixed(2),
            totalInterest: '0.00',
            totalPayable: p.toFixed(2)
        };
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayable = emi * n;
    const totalInterest = totalPayable - p;
    
    return {
      emi: emi.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalPayable: totalPayable.toFixed(2)
    };
  }, [principal, interest, tenure]);

  return (
    <div className="max-w-lg mx-auto">
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Amount ($)</label>
                <input type="number" value={principal} onChange={e => setPrincipal(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Interest Rate (%)</label>
                <input type="number" step="0.1" value={interest} onChange={e => setInterest(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Loan Tenure (Years)</label>
                <input type="number" value={tenure} onChange={e => setTenure(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
        </div>
        {emiResult && (
            <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-center mb-6">
                    <p className="text-lg text-gray-600 dark:text-gray-400">Monthly EMI</p>
                    <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">${emiResult.emi}</p>
                </div>
                <div className="flex justify-between text-lg">
                    <div className="text-center">
                        <p className="text-gray-500 dark:text-gray-400">Total Interest</p>
                        <p className="font-semibold">${emiResult.totalInterest}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-gray-500 dark:text-gray-400">Total Payable</p>
                        <p className="font-semibold">${emiResult.totalPayable}</p>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default EMICalculator;
