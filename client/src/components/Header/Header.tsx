import { SEARCH_ROUTE, SUPPORT_ROUTE } from '@/libs/constants/routes';
import { cn } from '@/libs/helpers/cn';
import { useLocation } from 'react-router-dom';
import { MobileNavbar } from '../Navbar/MobileNavbar';
import { Navbar } from '../Navbar/Navbar';
import { TicketSearch } from '../TicketSearchBar/TicketSearch';

export function Header() {
  const location = useLocation();

  const isSupportPage = location.pathname === SUPPORT_ROUTE;
  const isSearchPage = location.pathname === SEARCH_ROUTE;

  return (
    <div className="flex justify-center bg-section-background py-5 text-white">
      <div className="2 px-4 md:w-10/12 md:px-0 lg:w-11/12 xl:w-10/12 2xl:w-3/4">
        <MobileNavbar />
        <Navbar />
        {!isSupportPage ? (
          <div className={cn(!isSearchPage && 'my-24')}>
            {!isSearchPage && (
              <>
                <h1 className="mb-4 text-4xl font-semibold">Вам необхідні дешеві авіаквітки?</h1>
                <h3 className="text-2xl">Заощадьте разом з нами!</h3>
              </>
            )}
            <TicketSearch />
          </div>
        ) : (
          <div className="w-[80vw]" />
        )}
      </div>
    </div>
  );
}
