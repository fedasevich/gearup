/* eslint-disable @typescript-eslint/no-unused-vars */
import { formatSliderHoursLabel } from '@/components/TicketFiltering/helpers';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useAppSelector } from '@/libs/hooks/redux';
import { Segment } from '@/libs/types/Flight/Flight.type';

interface TicketCardLegTimelineProps {
  totalDuration: number;
  segments: Segment[];
}

function Timeline({ totalDuration, segments }: TicketCardLegTimelineProps) {
  const airports = useAppSelector((state) => state.searchReducer.airports);

  const calculateSegmentStyle = (segment: Segment) => {
    const left = (segment.durationMinutes / totalDuration) * 100;

    const width = (segment.stopoverDurationMinutes / totalDuration) * 100;

    return { left: `${left}%`, width: `${width}%` };
  };

  return (
    <div className="mb-2 mt-1 flex items-center justify-center px-5">
      <div className="relative h-[6px] w-full border-b-2 border-secondary pb-[5px]">
        <div className="absolute -left-1 h-3 w-3 rounded-full border-2 bg-secondary" />

        {segments
          .filter((segment) => !!segment.stopoverDurationMinutes)
          .map((segment) => (
            <TooltipProvider delayDuration={0} key={segment.designatorCode}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute top-[1px] h-[10px] rounded-3xl border-2 bg-secondary text-center"
                    style={calculateSegmentStyle(segment)}
                  >
                    <p className="mt-2 text-xs font-medium text-gray-500">{segment.arrivalAirportCode}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-center">
                  <p className="text-xs"> пересадка {formatSliderHoursLabel(segment.durationMinutes)} год</p>
                  <p className="text-xs">{airports && airports[segment.arrivalAirportCode].name}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}

        <div className="absolute -right-1 h-3 w-3 rounded-full border-2 bg-secondary" />
      </div>
    </div>
  );
}

export default Timeline;
