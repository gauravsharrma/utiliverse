import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import AppDetailPage from './pages/AppDetailPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import NotFoundPage from './pages/NotFoundPage.tsx';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 font-sans transition-colors duration-300">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/app/:appId" element={<AppDetailPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;