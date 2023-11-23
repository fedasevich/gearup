interface OrderFormProps {
  amount: number;
  field: string;
}

const orderFormPassenger: { [index: string]: string } = {
  numberOfAdults: 'Дорослий',
  numberOfChildrens: 'Дитина',
  numberOfInfants: 'Немовля'
};

export function OrderForm({ amount, field }: OrderFormProps) {
  const passengerType = orderFormPassenger[field];

  if (!passengerType || !amount) return null;
  const formsArray = Array.from({ length: amount });
  return (
    <div className="mb-4 flex flex-col rounded-2xl bg-popover p-5 md:flex-row ">
      <div className="w-full items-center">
        {formsArray.map((_, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index}>
            {passengerType} №{index + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
