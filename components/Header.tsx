import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme.ts';
import { useAuth } from '../hooks/useAuth.ts';
import { SunIcon, MoonIcon, UserIcon, LoginIcon } from './Icons.tsx';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, login, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-black tracking-tighter">
            Utiliverse
          </Link>
          <nav className="flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition-colors">
                  <img src={user.avatarUrl} alt={user.name} className="w-8 h-8 rounded-full" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={login}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <LoginIcon className="w-5 h-5" />
                <span>Login</span>
              </button>
            )}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;