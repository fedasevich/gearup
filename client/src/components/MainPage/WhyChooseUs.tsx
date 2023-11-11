export function WhyChooseUs() {
  return (
    <div className="my-10 px-4 md:px-0">
      <h2 className=" text-center text-3xl font-semibold">Чому обирають нас?</h2>
      <div className="flex items-center justify-center text-center">
        <div className="2 flex w-10/12 flex-col justify-evenly gap-0 md:flex-row md:gap-8 lg:w-11/12 xl:w-10/12 2xl:w-3/4">
          <div className="flex flex-grow flex-col items-center text-center">
            <div className="flex h-[300px] w-[200px] items-center justify-center">
              <img className="flex-grow" src="/images/illustration1.svg" alt="airplane" />
            </div>
            <h4 className="text-2xl font-medium">Один пошук для всіх</h4>
            <p className="mt-auto text-lg">
              Gearup знаходить унікальні найдешевші авіаквитків, які неможна знайти на інших сайтах чи застосунках!
            </p>
          </div>
          <div className="flex flex-grow flex-col items-center text-center">
            <div className="flex h-[300px] w-[200px] items-center justify-center">
              <img className="flex-grow" src="/images/illustration2.svg" alt="airplane" />
            </div>
            <h4 className="text-2xl font-medium">Заощаджуйте!</h4>
            <p className="mt-auto text-lg">
              Шукаєте найкращі пропозиції на авіаквитки, залізничні квитки, готелі та багато іншого? Ми пропонуємо вам
              найкращі ціни та заощаджуємо багато часу та зусиль!
            </p>
          </div>
          <div className="flex flex-grow flex-col items-center text-center">
            <div className="flex h-[300px] w-[200px] items-center justify-center">
              <img className="flex-grow" src="/images/illustration3.svg" alt="airplane" />
            </div>
            <h4 className="text-2xl font-medium">Зручне бронювання</h4>
            <p className="mt-auto text-lg">
              Ми пропонуємо інтуїтивно зрозумілий інтерфейс, швидкий пошук, корисні фільтри, щоб зробити бронювання
              відпустки вашої мрії максимально простим і безпроблемним.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
