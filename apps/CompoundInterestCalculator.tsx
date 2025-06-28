import React, { useState, useMemo } from 'react';

const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('1000');
  const [rate, setRate] = useState('5');
  const [times, setTimes] = useState('12');
  const [years, setYears] = useState('10');

  const result = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const n = parseFloat(times);
    const t = parseFloat(years);

    if (!p || !r || !n || !t || p <= 0 || n <= 0 || t <= 0) {
      return null;
    }

    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;

    return {
      amount: amount.toFixed(2),
      interest: interest.toFixed(2)
    };
  }, [principal, rate, times, years]);

  return (
    <div className="max-w-lg mx-auto">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Principal ($)</label>
          <input
            type="number"
            value={principal}
            onChange={e => setPrincipal(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Annual Interest Rate (%)</label>
          <input
            type="number"
            step="0.1"
            value={rate}
            onChange={e => setRate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Compounds Per Year</label>
          <input
            type="number"
            value={times}
            onChange={e => setTimes(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Years</label>
          <input
            type="number"
            value={years}
            onChange={e => setYears(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
      </div>
      {result && (
        <div className="mt-8 bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
          <div className="text-center mb-6">
            <p className="text-lg text-gray-600 dark:text-gray-400">Future Value</p>
            <p className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">${result.amount}</p>
          </div>
          <div className="text-center text-lg">
            <p className="text-gray-500 dark:text-gray-400">Total Interest Earned</p>
            <p className="font-semibold">${result.interest}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompoundInterestCalculator;
