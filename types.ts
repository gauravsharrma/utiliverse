
import React from 'react';

export enum AppCategory {
  Finance = 'Finance',
  Health = 'Health',
  Productivity = 'Productivity',
}

export interface AppDefinition {
  id: string;
  title: string;
  category: AppCategory;
  description: string;
  longDescription: string;
  isPremium: boolean;
  Icon: React.FC<{ className?: string }>;
  AppComponent: React.FC;
}

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
}
