import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { MAIN_ROUTE, SUPPORT_ROUTE } from '@/libs/constants/routes';
import { LogoIcon, UAHIcon, USDIcon } from '@/ui/icons/icons';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { ChevronDown, Menu, SearchSlash } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const currencies = {
  UAH: 'Ukrainian hryvnia',
  USD: 'United States dollar'
};

export function MobileNavbar() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleSheetClose = () => {
    setIsSheetOpen(false);
  };

  const selectedCurrency = currencies.UAH;

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
                      {selectedCurrency === currencies.UAH ? <UAHIcon /> : <USDIcon />}
                      <span className="sr-only">Change currency</span>
                      {selectedCurrency === currencies.UAH ? 'UAH' : 'USD'}
                      <ChevronDown size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="ml-5">
                    {Object.values(currencies).map((item) => (
                      <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
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
