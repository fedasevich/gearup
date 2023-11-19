import { LogoIcon } from '@/ui/icons/icons';
import { ChevronDown, SearchSlash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { MAIN_ROUTE, SUPPORT_ROUTE } from '@/libs/constants/routes';
import { Link } from 'react-router-dom';
import { ModeToggle } from '../mode-toggle';
import { AuthPopover } from './AuthPopover';

import { currencies } from '@/libs/constants/currencies';
import { useAppDispatch, useAppSelector } from '@/libs/hooks/redux';
import { UserCurrency } from '@/libs/types/User/UserCurrency.type';
import { userApi } from '@/store/reducers/user/UserApi';
import { setUserCurrency } from '@/store/reducers/user/UserSlice';

export function Navbar() {
  const dispatch = useAppDispatch();

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
    <>
      <div className="hidden items-center justify-between md:flex">
        <Link to={MAIN_ROUTE} className="flex  items-center justify-center gap-5 ">
          <LogoIcon />
          <h1 className="text-xl">Gearup</h1>
        </Link>
        <div className="">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center justify-between gap-6">
              <NavigationMenuItem className="hidden md:block">
                <Link to={SUPPORT_ROUTE} className="flex items-center justify-center gap-3">
                  <SearchSlash size={28} />
                  Підтримка
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem />
              <NavigationMenuItem className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger className="bg-transparent" asChild>
                    <Button className="w-25 flex items-center justify-center gap-2" variant="ghost" size="icon">
                      {currencies[selectedCurrency.currency].icon}
                      <span className="sr-only">Change currency</span>
                      {currencies[selectedCurrency.currency].code}
                      <ChevronDown size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {Object.values(currencies).map((item) => (
                      <DropdownMenuItem key={item.code} onClick={() => handleCurrencyClick(item.symbol, item.code)}>
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem>
              <NavigationMenuItem>
                <AuthPopover />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
}
