import { useFormContext } from 'react-hook-form';

import { OrderPassengersFormValues } from '@/pages/OrderPage';
import { OrderFormComboBoxField } from './OrderFormComboBoxField';
import { OrderFormDateField } from './OrderFormDateField';
import { OrderFormSelectField } from './OrderFormSelectField';
import { OrderFormTextField } from './OrderFormTextField';

const genders = ['Чоловіча', 'Жіноча'];

const documentTypes = ['Закордоний'];

const orderFormPassenger: {
  [K in keyof Omit<OrderPassengersFormValues, 'email' | 'phoneNumber'>]: string;
} = {
  adultsInfo: 'Дорослий',
  childrensInfo: 'Дитина',
  infantsInfo: 'Немовля'
};

interface OrderFormProps {
  index: number;
  infoFieldName: keyof Omit<OrderPassengersFormValues, 'email' | 'phoneNumber'>;
}

export function OrderForm({ index, infoFieldName }: OrderFormProps) {
  const form = useFormContext<OrderPassengersFormValues>();

  return (
    <div className="mb-4 flex flex-col rounded-2xl bg-popover p-5 md:flex-row ">
      <div className="w-full items-center text-black dark:text-white ">
        <div key={index} className="flex flex-col gap-3">
          <div>
            <p className="mb-3 text-lg font-medium">
              {orderFormPassenger[infoFieldName]} №{index + 1}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid-rows-8 grid grid-cols-1 gap-x-3 gap-y-5 md:grid-cols-2 md:grid-rows-4  lg:grid-cols-4 lg:grid-rows-2">
            <OrderFormSelectField
              form={form}
              name={`${infoFieldName}.${index}.gender`}
              placeholder="Стать"
              options={genders}
            />
            <OrderFormTextField form={form} name={`${infoFieldName}.${index}.lastName`} placeholder="Прізвище" />
            <OrderFormTextField form={form} name={`${infoFieldName}.${index}.firstName`} placeholder="Ім'я" />
            <OrderFormDateField
              form={form}
              name={`${infoFieldName}.${index}.dateOfBirth`}
              placeholder="Дата народження"
            />

            <OrderFormComboBoxField
              form={form}
              name={`${infoFieldName}.${index}.citizenship`}
              placeholder="Громадянство"
            />
            <OrderFormSelectField
              form={form}
              name={`${infoFieldName}.${index}.documentType`}
              placeholder="Тип документа"
              options={documentTypes}
            />
            <OrderFormTextField
              form={form}
              name={`${infoFieldName}.${index}.documentSeriesNumber`}
              placeholder="Серія і № документа"
            />
            <OrderFormDateField
              form={form}
              name={`${infoFieldName}.${index}.expirationDate`}
              placeholder="Термін дії"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
