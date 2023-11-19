import { SlidersHorizontal } from 'lucide-react';

export function TicketFilteringHeader() {
  return (
    <div className="flex items-center gap-4 border-b pb-4 font-medium">
      <SlidersHorizontal size={20} />
      Фільтри
    </div>
  );
}
