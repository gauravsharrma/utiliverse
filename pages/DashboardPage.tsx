import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';

const DashboardPage: React.FC = () => {
  const { user, isSubscribed, logout } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up">
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Welcome, {user.name}!</h1>
      <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-2xl shadow-lg space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Account Details</h2>
          <div className="mt-4 space-y-2">
            <p><span className="font-semibold">Email:</span> {user.email}</p>
            <p><span className="font-semibold">Subscription Status:</span> 
              <span className={`ml-2 px-3 py-1 text-sm font-semibold rounded-full ${isSubscribed ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'}`}>
                {isSubscribed ? 'Premium Active' : 'Free Tier'}
              </span>
            </p>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold">My Apps</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Functionality to show used/favorite apps would go here.</p>
        </div>
        <div>
            <h2 className="text-2xl font-bold">Settings</h2>
            <button
                onClick={logout}
                className="mt-4 inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Log Out
            </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;