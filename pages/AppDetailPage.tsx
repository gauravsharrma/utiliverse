import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { APPS_DATA } from '../constants.tsx';
import { AppDefinition } from '../types.ts';
import { useAuth } from '../hooks/useAuth.ts';
import SubscriptionModal from '../components/SubscriptionModal.tsx';
import { LockIcon } from '../components/Icons.tsx';
import NotFoundPage from './NotFoundPage.tsx';

const AppDetailPage: React.FC = () => {
  const { appId } = useParams<{ appId: string }>();
  const location = useLocation();
  const bare = new URLSearchParams(location.search).get('bare') === '1';
  const [app, setApp] = useState<AppDefinition | null>(null);
  const { isSubscribed, subscribe } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const foundApp = APPS_DATA.find(a => a.id === appId) || null;
    setApp(foundApp);
  }, [appId]);

  if (!app) {
    return <NotFoundPage />;
  }

  const isLocked = app.isPremium && !isSubscribed;

  const handleUnlock = () => {
    // In a real app, this might show a login prompt if not logged in
    setIsModalOpen(true);
  };
  
  if (bare) {
    return <app.AppComponent />;
  }

  return (
    <div className="max-w-4xl mx-auto">
      {isModalOpen && <SubscriptionModal onClose={() => setIsModalOpen(false)} />}
      <div className="text-center mb-12 animate-fade-in-up">
        <div className="inline-block p-4 bg-gray-100 dark:bg-gray-800 rounded-2xl mb-4">
            <app.Icon className="w-16 h-16 text-indigo-500" />
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight">{app.title}</h1>
        <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">{app.longDescription}</p>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl shadow-lg transition-all duration-500 animate-fade-in-up" style={{animationDelay: '200ms'}}>
        {isLocked ? (
          <div className="text-center">
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
              <LockIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <h3 className="text-2xl font-bold">This is a Premium App</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Subscribe to Utiliverse to get instant access.
            </p>
            <button
              onClick={handleUnlock}
              className="mt-6 inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-gray-900 transition-transform hover:scale-105"
            >
              Unlock Full Access
            </button>
          </div>
        ) : (
          <app.AppComponent />
        )}
      </div>
      
      <div className="text-center mt-12 animate-fade-in-up" style={{animationDelay: '400ms'}}>
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline font-semibold">
          &larr; Back to all apps
        </Link>
      </div>
    </div>
  );
};

export default AppDetailPage;