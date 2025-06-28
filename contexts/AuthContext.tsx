import React, { createContext, useState, ReactNode } from 'react';
import { User } from '../types.ts';

interface AuthContextType {
  user: User | null;
  isSubscribed: boolean;
  login: () => void;
  logout: () => void;
  subscribe: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);

  // Mock Google Login
  const login = () => {
    setUser({
      name: 'Alex Doe',
      email: 'alex.doe@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
    });
  };

  const logout = () => {
    setUser(null);
    setIsSubscribed(false);
  };

  const subscribe = () => {
    if (user) {
      setIsSubscribed(true);
    } else {
      // In a real app, you'd prompt login first.
      // Here we'll log in and subscribe for demo purposes.
      login();
      setIsSubscribed(true);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isSubscribed, login, logout, subscribe }}>
      {children}
    </AuthContext.Provider>
  );
};