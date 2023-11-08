/* eslint-disable @typescript-eslint/no-empty-function */
import { LogoIcon, UAHIcon, USDIcon } from '@/ui/icons/icons';
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

const currencies = {
  UAH: 'Ukrainian hryvnia',
  USD: 'United States dollar'
};

export function Navbar() {
  const selectedCurrency = currencies.UAH;

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
                    <Button className="w-25 flex items-center justify-center gap-2 px-2" variant="ghost" size="icon">
                      {selectedCurrency === currencies.UAH ? <UAHIcon /> : <USDIcon />}
                      <span className="sr-only">Change currency</span>
                      {selectedCurrency === currencies.UAH ? 'UAH' : 'USD'}
                      <ChevronDown size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {Object.values(currencies).map((item) => (
                      <DropdownMenuItem key={item} onClick={() => {}}>
                        {item}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </>
  );
}
