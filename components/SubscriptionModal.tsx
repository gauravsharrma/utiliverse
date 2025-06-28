import React from 'react';
import { useAuth } from '../hooks/useAuth.ts';
import { LockIcon } from './Icons.tsx';

interface SubscriptionModalProps {
  onClose: () => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ onClose }) => {
  const { subscribe } = useAuth();

  const handleSubscribe = () => {
    subscribe();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-md w-full text-center transform transition-all animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 dark:bg-indigo-900">
          <LockIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Unlock Premium Access</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
          Join Utiliverse Premium to unlock this app and all other premium tools.
        </p>
        <div className="mt-8">
          <button
            onClick={handleSubscribe}
            className="w-full inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-gray-900 transition-transform hover:scale-105"
          >
            Subscribe Now ($9.99/mo)
          </button>
        </div>
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
};

export default SubscriptionModal;