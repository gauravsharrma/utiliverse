import React from 'react';
import { Link } from 'react-router-dom';
import { AppDefinition, AppCategory } from '../types.ts';
import { useAuth } from '../hooks/useAuth.ts';
import { LockIcon } from './Icons.tsx';

interface AppCardProps {
  app: AppDefinition;
}

const categoryColors: Record<AppCategory, string> = {
  [AppCategory.Finance]: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
  [AppCategory.Health]: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
};

const AppCard: React.FC<AppCardProps> = ({ app }) => {
  const { user, isSubscribed } = useAuth();
  const isLocked = app.isPremium && !isSubscribed;

  return (
    <Link to={`/app/${app.id}`} className="block group">
      <div className="relative p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl h-full flex flex-col transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-2xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-400/10">
        <div className="flex justify-between items-start">
          <app.Icon className="w-10 h-10 text-gray-500 dark:text-gray-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
          <div className="flex items-center space-x-2">
            {isLocked && <LockIcon className="w-5 h-5 text-gray-400" />}
            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${categoryColors[app.category]}`}>
              {app.category}
            </span>
          </div>
        </div>
        <div className="mt-4 flex-grow">
          <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
            {app.title}
          </h3>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {app.description}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <span className={`font-bold text-lg ${app.isPremium ? 'text-indigo-600 dark:text-indigo-400' : 'text-green-600 dark:text-green-400'}`}>
            {app.isPremium ? (isSubscribed ? 'Subscribed' : 'Premium') : 'Free'}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default AppCard;
