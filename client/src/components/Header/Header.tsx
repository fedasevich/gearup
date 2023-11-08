import { SUPPORT_ROUTE } from '@/libs/constants/routes';
import { useLocation } from 'react-router-dom';
import { MobileNavbar } from '../Navbar/MobileNavbar';
import { Navbar } from '../Navbar/Navbar';
import { TicketSearch } from '../TicketSearch/TicketSearch';

export function Header() {
  const location = useLocation();

  const isSupportPage = location.pathname === SUPPORT_ROUTE;
  return (
    <div className="flex justify-center bg-section-background py-5 text-white">
      <div className="px-4 md:w-10/12  md:px-0 xl:w-3/5">
        <MobileNavbar />
        <Navbar />
        {!isSupportPage ? (
          <>
            <div className="my-24">
              <h1 className="mb-4 text-4xl font-semibold">Вам необхідні дешеві авіаквітки?</h1>
              <h3 className="text-2xl">Заощадьте разом з нами!</h3>
              <TicketSearch />
            </div>
          </>
        ) : (
          <div className="w-[80vw]" />
        )}
      </div>
    </div>
  );
}
