
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  return (
    <div className="text-center py-20">
      <h1 className="text-9xl font-black text-gray-300 dark:text-gray-700">404</h1>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Page Not Found</h2>
      <p className="mt-4 text-lg text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-10">
        <Link 
          to="/" 
          className="inline-block px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
