import { UAHIcon, USDIcon } from '@/ui/icons/icons';
import { UserCurrency } from '../types/User/UserCurrency.type';

export const currencies: {
  [K in UserCurrency]: { label: string; icon: React.ReactNode; code: string; symbol: UserCurrency };
} = {
  '₴': { label: 'Ukrainian hryvnia', icon: <UAHIcon />, code: 'UAH', symbol: '₴' },
  '$': { label: 'United States dollar', icon: <USDIcon />, code: 'USD', symbol: '$' }
};
