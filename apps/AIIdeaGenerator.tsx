import React, { useState } from 'react';
import { generateCreativeIdeas } from '../services/geminiService.ts';

const AIIdeaGenerator: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [ideas, setIdeas] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            setError('Please enter a topic.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setIdeas([]);

        try {
            const generatedIdeas = await generateCreativeIdeas(topic);
            setIdeas(generatedIdeas);
        } catch (err: any) {
            setError(err.message || 'An unknown error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="Enter a topic, e.g., 'sustainable living'"
                    className="flex-grow mt-1 block w-full px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="inline-flex justify-center items-center px-8 py-3 border border-transparent text-lg font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:ring-offset-gray-900 disabled:bg-indigo-400 disabled:cursor-not-allowed"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Generating...
                        </>
                    ) : 'Get Ideas'}
                </button>
            </form>

            {error && (
                <div className="mt-6 text-center p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 rounded-lg">
                    {error}
                </div>
            )}

            {ideas.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-2xl font-bold mb-4">Here are some ideas for "{topic}":</h3>
                    <ul className="space-y-4">
                        {ideas.map((idea, index) => (
                            <li key={index} className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                                <p className="text-lg">{idea}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AIIdeaGenerator;