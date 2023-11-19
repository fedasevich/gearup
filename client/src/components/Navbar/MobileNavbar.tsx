import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MAIN_ROUTE, SUPPORT_ROUTE } from '@/libs/constants/routes';
import { LogoIcon } from '@/ui/icons/icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { currencies } from '@/libs/constants/currencies';
import { useAppDispatch, useAppSelector } from '@/libs/hooks/redux';
import { UserCurrency } from '@/libs/types/User/UserCurrency.type';
import { userApi } from '@/store/reducers/user/UserApi';
import { setUserCurrency } from '@/store/reducers/user/UserSlice';
import { ChevronDown, Menu, SearchSlash } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthPopover } from './AuthPopover';

export function MobileNavbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  const [getCurrencyRate] = userApi.useLazyGetCurrencyRateQuery();

  const handleCurrencyClick = async (currency: UserCurrency, code: string) => {
    if (currency === '$') return dispatch(setUserCurrency({ currency, rate: 1 }));

    await getCurrencyRate(code)
      .unwrap()
      .then((data) => {
        dispatch(setUserCurrency({ currency, rate: data.rate }));
      });
  };

  const selectedCurrency = useAppSelector((state) => state.userReducer.userCurrency);

  return (
    <div className="flex items-center justify-between md:hidden">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="bg-transparent" size="icon">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col items-start justify-center pr-0">
          <Link to={MAIN_ROUTE} className="flex items-center justify-center gap-5 " onClick={handleSheetClose}>
            <LogoIcon />
            <h1 className="text-xl">Gearup</h1>
          </Link>
          <NavigationMenu className="items-start">
            <NavigationMenuList className="mt-8 flex flex-col items-start justify-start gap-2">
              <NavigationMenuItem>
                <Link to={SUPPORT_ROUTE} className="flex items-center justify-center gap-3" onClick={handleSheetClose}>
                  <SearchSlash size={28} />
                  Підтримка
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem />
              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-transparent" asChild>
                    <Button className="w-25 flex items-center justify-center gap-2" variant="ghost" size="icon">
                      {currencies[selectedCurrency.currency].icon}
                      <span className="sr-only">Change currency</span>
                      {currencies[selectedCurrency.currency].code}
                      <ChevronDown size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="ml-5">
                    {Object.values(currencies).map((item) => (
                      <DropdownMenuItem key={item.code} onClick={() => handleCurrencyClick(item.symbol, item.code)}>
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <AuthPopover />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </SheetContent>
      </Sheet>
      <NavigationMenu>
        <NavigationMenuList className="flex items-center justify-between gap-6">
          <NavigationMenuItem>
            <ModeToggle />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
