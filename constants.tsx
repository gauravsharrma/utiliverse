import { AppDefinition, AppCategory } from './types.ts';
import BMICalculator from './apps/BMICalculator.tsx';
import EMICalculator from './apps/EMICalculator.tsx';
import CompoundInterestCalculator from './apps/CompoundInterestCalculator.tsx';
import { BmiIcon, EmiIcon, CompoundIcon } from './components/Icons.tsx';

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
    id: 'compound-interest-calculator',
    title: 'Compound Interest',
    category: AppCategory.Finance,
    description: 'Estimate growth with compounding.',
    longDescription: 'Quickly calculate how your investments grow over time with regular compounding. Adjust interest rate, compounding frequency, and duration to see future value and total interest earned.',
    isPremium: false,
    Icon: CompoundIcon,
    AppComponent: CompoundInterestCalculator,
  },
];
