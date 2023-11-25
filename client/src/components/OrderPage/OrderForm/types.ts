import { TypedKeys } from '@/libs/types/TypedKeys/TypedKeys.type';
import { OrderPassengersFormValues } from '@/pages/OrderPage';
import { OrderFormValues } from './validation';

export type OrderDynamicField<T> = `${keyof Omit<
  OrderPassengersFormValues,
  'email' | 'phoneNumber'
>}.${number}.${TypedKeys<OrderFormValues, T>}`;
