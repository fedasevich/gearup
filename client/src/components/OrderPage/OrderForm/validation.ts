import * as yup from 'yup';

export interface OrderFormValues {
  gender: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  citizenship: string;
  documentType: string;
  documentSeriesNumber: string;
  expirationDate: Date;
}

export const usePassengerFormSchema = (): yup.ObjectSchema<
  OrderFormValues,
  yup.AnyObject,
  {
    gender: undefined;
    firstName: undefined;
    lastName: undefined;
    dateOfBirth: undefined;
    citizenship: undefined;
    documentType: undefined;
    documentSeriesNumber: undefined;
    expirationDate: undefined;
  },
  ''
> => {
  return yup.object().shape({
    gender: yup.string().required("Стать обов'язкова"),
    firstName: yup.string().required("Ім'я обов'язкове"),
    lastName: yup.string().required("Прізвище обов'язкове"),
    dateOfBirth: yup.date().required("Дата народження обов'язкова"),
    citizenship: yup.string().required("Громадянство обов'язкове"),
    documentType: yup.string().required("Тип документа обов'язковий"),
    documentSeriesNumber: yup.string().required("Серія і № документа обов'язкові"),
    expirationDate: yup.date().required("Термін дії обов'язковий")
  });
};

export const useOrderFormSchema = () => {
  return yup.object().shape({
    adultsInfo: yup.array().of(usePassengerFormSchema()),
    childrensInfo: yup.array().of(usePassengerFormSchema()),
    infantsInfo: yup.array().of(usePassengerFormSchema()),
    email: yup.string().email('Невірний формат електронної пошти').required("Електрона пошта обов'язкова"),
    phoneNumber: yup.string().required("Номер телефону обов'язковий").min(12, "Номер телефону обов'язковий")
  });
};
