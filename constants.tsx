import { AppDefinition, AppCategory } from './types.ts';
import BMICalculator from './apps/BMICalculator.tsx';
import EMICalculator from './apps/EMICalculator.tsx';
import CompoundInterestCalculator from './apps/CompoundInterestCalculator.tsx';
import UnitConverter from './apps/UnitConverter.tsx';
import ResumeBuilder from './apps/ResumeBuilder.tsx';
import { BmiIcon, EmiIcon, CompoundIcon, ConverterIcon, ResumeIcon, PomodoroIcon } from './components/Icons.tsx';
import PomodoroTimer from './apps/PomodoroTimer.tsx';

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
    isPremium: false,
    Icon: EmiIcon,
    AppComponent: EMICalculator,
  },
  {
    id: 'compound-interest-calculator',
    title: 'Compound Interest',
    category: AppCategory.Finance,
    description: 'Estimate growth with compounding.',
    longDescription: 'Quickly calculate how your investments grow over time with regular compounding. Adjust interest rate, compounding frequency, and duration to see future value and total interest earned.',
    isPremium: false,
    Icon: CompoundIcon,
    AppComponent: CompoundInterestCalculator,
  },
  {
    id: 'unit-converter',
    title: 'Unit Converter',
    category: AppCategory.Productivity,
    description: 'Convert between various units easily.',
    longDescription: 'A handy tool to convert values across length, weight, temperature and more. Select a category, choose units, and see results instantly.',
    isPremium: false,
    Icon: ConverterIcon,
    AppComponent: UnitConverter,
  },
  {
    id: 'resume-builder',
    title: 'Resume Builder',
    category: AppCategory.Productivity,
    description: 'Create polished resumes and cover letters.',
    longDescription: 'Craft professional resumes and cover letters with live previews, formatting options, and easy PDF export.',
    isPremium: false,
    Icon: ResumeIcon,
    AppComponent: ResumeBuilder,
  },
  {
    id: 'pomodoro-timer',
    title: 'Pomodoro Timer',
    category: AppCategory.Productivity,
    description: 'Boost focus with timed work sessions.',
    longDescription: 'Stay productive using the classic Pomodoro technique. Track work and break intervals, customize durations, and monitor your daily streak.',
    isPremium: false,
    Icon: PomodoroIcon,
    AppComponent: PomodoroTimer,
  },
];
