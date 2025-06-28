import React, { useState, useEffect, useRef } from 'react';

type SessionType = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroSettings {
  work: number; // minutes
  shortBreak: number; // minutes
  longBreak: number; // minutes
}

interface PomodoroProgress {
  sessionIndex: number;
  timeLeft: number; // seconds
  isRunning: boolean;
  completedToday: number;
  streak: number;
  lastDate: string; // yyyy-mm-dd for daily reset
  lastCompletedDate: string; // for streak
}

const defaultSettings: PomodoroSettings = {
  work: 25,
  shortBreak: 5,
  longBreak: 15,
};

const getToday = () => new Date().toISOString().slice(0, 10);

const getSessionType = (index: number): SessionType => {
  if (index % 2 === 0) return 'work';
  return index === 1 ? 'shortBreak' : 'longBreak';
};

const PomodoroTimer: React.FC = () => {
  const [settings, setSettings] = useState<PomodoroSettings>(() => {
    const saved = localStorage.getItem('pomodoroSettings');
    return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
  });

  const [progress, setProgress] = useState<PomodoroProgress>(() => {
    const saved = localStorage.getItem('pomodoroProgress');
    const today = getToday();
    if (saved) {
      const parsed: PomodoroProgress = JSON.parse(saved);
      if (parsed.lastDate !== today) {
        parsed.completedToday = 0;
        parsed.lastDate = today;
      }
      return {
        ...parsed,
        timeLeft: parsed.timeLeft || settings.work * 60,
      };
    }
    return {
      sessionIndex: 0,
      timeLeft: settings.work * 60,
      isRunning: false,
      completedToday: 0,
      streak: 0,
      lastDate: today,
      lastCompletedDate: today,
    };
  });

  const intervalRef = useRef<number | null>(null);

  // persist settings and progress
  useEffect(() => {
    localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('pomodoroProgress', JSON.stringify(progress));
  }, [progress]);

  // timer effect
  useEffect(() => {
    if (progress.isRunning) {
      intervalRef.current = window.setInterval(() => {
        setProgress(prev => {
          if (prev.timeLeft > 1) {
            return { ...prev, timeLeft: prev.timeLeft - 1 };
          }
          return handleCompletion(prev);
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [progress.isRunning]);

  const handleCompletion = (prev: PomodoroProgress): PomodoroProgress => {
    let { completedToday, streak, lastCompletedDate } = prev;
    const sessionType = getSessionType(prev.sessionIndex);
    const today = getToday();

    if (sessionType === 'work') {
      completedToday += 1;
      if (lastCompletedDate !== today) {
        const diff = Math.floor((new Date(today).getTime() - new Date(lastCompletedDate).getTime()) / 86400000);
        streak = diff === 1 ? streak + 1 : 1;
        lastCompletedDate = today;
      }
    }

    const nextIndex = (prev.sessionIndex + 1) % 4;
    const nextType = getSessionType(nextIndex);
    const nextDuration =
      nextType === 'work'
        ? settings.work * 60
        : nextType === 'shortBreak'
        ? settings.shortBreak * 60
        : settings.longBreak * 60;

    return {
      ...prev,
      sessionIndex: nextIndex,
      timeLeft: nextDuration,
      isRunning: true,
      completedToday,
      streak,
      lastCompletedDate,
    };
  };

  const handleStart = () => setProgress(p => ({ ...p, isRunning: true }));
  const handlePause = () => setProgress(p => ({ ...p, isRunning: false }));
  const handleReset = () =>
    setProgress(p => ({
      ...p,
      sessionIndex: 0,
      timeLeft: settings.work * 60,
      isRunning: false,
    }));
  const handleSkip = () =>
    setProgress(prev => {
      const nextIndex = (prev.sessionIndex + 1) % 4;
      const nextType = getSessionType(nextIndex);
      const nextDuration =
        nextType === 'work'
          ? settings.work * 60
          : nextType === 'shortBreak'
          ? settings.shortBreak * 60
          : settings.longBreak * 60;
      return { ...prev, sessionIndex: nextIndex, timeLeft: nextDuration, isRunning: false };
    });

  const [showSettings, setShowSettings] = useState(false);
  const [tempSettings, setTempSettings] = useState<PomodoroSettings>(settings);

  const saveSettings = () => {
    setSettings(tempSettings);
    setProgress(p => ({
      ...p,
      sessionIndex: 0,
      timeLeft: tempSettings.work * 60,
      isRunning: false,
    }));
    setShowSettings(false);
  };

  const sessionType = getSessionType(progress.sessionIndex);
  const minutes = Math.floor(progress.timeLeft / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(progress.timeLeft % 60)
    .toString()
    .padStart(2, '0');

  return (
    <div className="max-w-md mx-auto space-y-6">
      <div className="text-center">
        <p className="text-lg font-semibold mb-2 capitalize">{sessionType.replace('Break', ' Break')}</p>
        <p className="text-7xl font-bold tracking-tighter">{minutes}:{seconds}</p>
      </div>

      <div className="flex justify-center gap-4">
        <button onClick={handleStart} className="px-4 py-2 bg-green-600 text-white rounded-md">Start</button>
        <button onClick={handlePause} className="px-4 py-2 bg-yellow-500 text-white rounded-md">Pause</button>
        <button onClick={handleReset} className="px-4 py-2 bg-gray-500 text-white rounded-md">Reset</button>
        <button onClick={handleSkip} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Skip</button>
      </div>

      <div className="text-center space-y-2">
        <p>Completed Today: {progress.completedToday}</p>
        <p>Daily Streak: {progress.streak}</p>
      </div>

      <div className="text-center">
        <button onClick={() => setShowSettings(s => !s)} className="text-indigo-600 underline">
          {showSettings ? 'Close Settings' : 'Settings'}
        </button>
      </div>

      {showSettings && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Work (minutes)</label>
            <input
              type="number"
              min="1"
              value={tempSettings.work}
              onChange={e => setTempSettings(s => ({ ...s, work: parseInt(e.target.value, 10) || 1 }))}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Short Break (minutes)</label>
            <input
              type="number"
              min="1"
              value={tempSettings.shortBreak}
              onChange={e =>
                setTempSettings(s => ({ ...s, shortBreak: parseInt(e.target.value, 10) || 1 }))
              }
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Long Break (minutes)</label>
            <input
              type="number"
              min="1"
              value={tempSettings.longBreak}
              onChange={e =>
                setTempSettings(s => ({ ...s, longBreak: parseInt(e.target.value, 10) || 1 }))
              }
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button onClick={saveSettings} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Save</button>
        </div>
      )}
    </div>
  );
};

export default PomodoroTimer;
