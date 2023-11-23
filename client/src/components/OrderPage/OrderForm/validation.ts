import * as yup from 'yup';

export const useOrderFormSchema = () => {
  return yup.object().shape({
    gender: yup.string().required("Стать обов'язкова"),
    surname: yup.string().required("Прізвище обов'язкове"),
    givenName: yup.string().required("Ім'я обов'язкове"),
    dateOfBirth: yup.date().required("Дата народження обов'язкова"),
    citizenship: yup.string().required("Громадянство обов'язкове"),
    documentType: yup.string().required("Тип документа обов'язковий"),
    documentInfo: yup.string().required("Це поле обов'язкове"),
    documentSeriesNumber: yup.string().required("Серія і № документа обов'язкові"),
    expirationDate: yup.date().required("Термін дії обов'язковий")
  });
};
