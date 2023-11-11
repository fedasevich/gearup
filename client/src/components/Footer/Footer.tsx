import { LogoIcon, MastercardIcon, ProstirIcon, VisaIcon, XIcon } from '@/ui/icons/icons';
import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <>
      <div className="mb-4 mt-10 flex items-center justify-center">
        <div className="2 px-4 md:w-10/12 md:px-0 lg:w-11/12 xl:w-10/12 2xl:w-3/4">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:gap-0">
            <div className="">
              <div className="flex flex-col items-center justify-center gap-5 md:flex-row ">
                <LogoIcon />
                <h1 className="text-xl">Gearup</h1>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-16">
              <ProstirIcon />
              <MastercardIcon />
              <VisaIcon />
            </div>
            <div className="flex flex-row items-center justify-center gap-5">
              <Facebook size={24} />
              <Instagram size={24} />
              <XIcon />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center">
        <h5 className="font-semibold">© Gearup 2023 Сервіс онлайн бронювання</h5>
      </div>
    </>
  );
}
