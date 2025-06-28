import React, { useState, useMemo } from 'react';
import { APPS_DATA } from '../constants.tsx';
import { AppCategory } from '../types.ts';
import AppCard from '../components/AppCard.tsx';
import { useScrollAnimation } from '../hooks/useScrollAnimation.ts';
import { SearchIcon } from '../components/Icons.tsx';

const HomePage: React.FC = () => {
  const { ref: heroRef, animationClasses: heroAnimation } = useScrollAnimation<HTMLDivElement>();
  const { ref: filterRef, animationClasses: filterAnimation } = useScrollAnimation<HTMLDivElement>();
  const { ref: gridRef, animationClasses: gridAnimation } = useScrollAnimation<HTMLDivElement>();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<AppCategory | 'all'>('all');

  const filteredApps = useMemo(() => {
    return APPS_DATA.filter(app => {
      const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
      const matchesSearch = app.title.toLowerCase().includes(searchTerm.toLowerCase()) || app.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const categories = ['all', ...Object.values(AppCategory)];

  return (
    <div className="space-y-16">
      <section ref={heroRef} className={`text-center py-16 transition-all duration-700 ${heroAnimation}`}>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          Enhance Your Everyday
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          A curated collection of intelligent tools designed for modern life. Simple, beautiful, and powerful.
        </p>
      </section>

      <div ref={filterRef} className={`space-y-8 transition-all duration-700 delay-200 ${filterAnimation}`}>
        <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/>
            <input
                type="text"
                placeholder="Search for an app..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 pl-12 text-lg bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-colors"
            />
        </div>

        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {categories.map(category => (
                <button
                    key={category}
                    onClick={() => setSelectedCategory(category as AppCategory | 'all')}
                    className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-200 ${selectedCategory === category
                        ? 'bg-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
            ))}
        </div>
      </div>

      <section ref={gridRef} className={`transition-all duration-700 delay-300 ${gridAnimation}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredApps.map((app, index) => (
            <div key={app.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in-up">
              <AppCard app={app} />
            </div>
          ))}
        </div>
        {filteredApps.length === 0 && (
            <div className="text-center py-16">
                <p className="text-xl text-gray-500">No apps found. Try a different search or filter.</p>
            </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;