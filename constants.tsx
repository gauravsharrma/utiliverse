import { AppDefinition, AppCategory } from './types.ts';
import BMICalculator from './apps/BMICalculator.tsx';
import EMICalculator from './apps/EMICalculator.tsx';
import AIIdeaGenerator from './apps/AIIdeaGenerator.tsx';
import { BmiIcon, EmiIcon, AiIcon, ProductivityIcon } from './components/Icons.tsx';

export const APPS_DATA: AppDefinition[] = [
  {
    id: 'bmi-calculator',
    title: 'BMI Calculator',
    category: AppCategory.Health,
    description: 'Calculate your Body Mass Index.',
    longDescription: 'Our Body Mass Index (BMI) calculator provides a reliable measure of body fatness based on your height and weight. It\'s a simple tool to help you understand your health status and work towards a healthier lifestyle. Enter your details to get an instant result and see where you fall on the BMI scale.',
    isPremium: false,
    Icon: BmiIcon,
    AppComponent: BMICalculator,
  },
  {
    id: 'emi-calculator',
    title: 'EMI Calculator',
    category: AppCategory.Finance,
    description: 'Plan your loans with ease.',
    longDescription: 'The Equated Monthly Installment (EMI) calculator helps you understand your monthly loan payments. Whether it\'s for a car, home, or personal loan, this tool breaks down your payments into principal and interest components, giving you a clear picture of your financial commitment over time.',
    isPremium: true,
    Icon: EmiIcon,
    AppComponent: EMICalculator,
  },
  {
    id: 'ai-idea-generator',
    title: 'AI Idea Generator',
    category: AppCategory.AI,
    description: 'Get creative ideas powered by AI.',
    longDescription: 'Unleash your creativity with the AI Idea Generator. Powered by Google\'s Gemini model, this tool can spark inspiration for your next project, blog post, or business venture. Simply provide a topic, and our AI will generate a list of unique and innovative ideas for you to explore.',
    isPremium: true,
    Icon: AiIcon,
    AppComponent: AIIdeaGenerator,
  },
  {
    id: 'task-manager',
    title: 'Focus Task Manager',
    category: AppCategory.Productivity,
    description: 'A simple tool to manage your daily tasks.',
    longDescription: 'This is a placeholder for a future productivity app. It will help you organize your day, set priorities, and stay focused on what matters most. Keep an eye out for its release!',
    isPremium: false,

    Icon: ProductivityIcon,
    AppComponent: () => <div className="text-center p-8 bg-gray-100 dark:bg-gray-800 rounded-lg"><h3 className="text-2xl font-bold">Coming Soon!</h3><p className="mt-2 text-gray-600 dark:text-gray-400">This app is under development.</p></div>,
  },
];