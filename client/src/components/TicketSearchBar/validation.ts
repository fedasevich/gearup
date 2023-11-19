import * as yup from 'yup';
import { TicketSearchFormData } from './TicketSearch';

export const useTicketSearchSchema = () => {
  return (
    yup
      .object()
      .shape({
        from: yup.string().required('Місце відправлення обов’язкове для заповнення'),
        to: yup
          .string()
          .required('Місце прибуття обов’язкове для заповнення')
          .notOneOf([yup.ref('from')], 'Місце прибуття має бути іншим, ніж місце відправлення'),
        departureDate: yup.date().required('Дата відправлення обов’язкова для заповнення'),
        arrivalDate: yup.date().min(yup.ref('departureDate'), 'Дата прибуття має бути пізніше дати відправлення'),
        numberOfAdults: yup.number().required(),
        numberOfChildrens: yup.number().required(),
        numberOfInfants: yup.number().required(),
        cabinClass: yup.string().required('Клас обов’язковий для заповнення')
      })
      // eslint-disable-next-line func-names
      .test('at-least-one-passenger', 'Принаймні один пасажир є обов’язковим', function (values) {
        const { numberOfAdults, numberOfChildrens, numberOfInfants } = values as TicketSearchFormData;
        if (!(numberOfAdults || numberOfChildrens || numberOfInfants)) {
          return this.createError({
            message: 'Принаймні один пасажир є обов’язковим',
            path: 'passenger'
          });
        }
        return true;
      })
  );
};
