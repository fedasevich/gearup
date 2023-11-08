import { Button } from '../ui/button';
import { AirportCombobox } from './AirportCombobox';

export function TicketSearch() {
  const handleSearchClick = () => {
    console.log('');
  };

  return (
    <>
      <AirportCombobox />
      <Button variant="secondary" onClick={handleSearchClick} className="hover:bg-teal-500">
        Знайти
      </Button>
    </>
  );
}
