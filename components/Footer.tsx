
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-gray-500 dark:text-gray-400">
        <p>&copy; {new Date().getFullYear()} Utiliverse. All rights reserved.</p>
        <p className="mt-2 text-sm">Designed with passion. Built for utility.</p>
      </div>
    </footer>
  );
};

export default Footer;
