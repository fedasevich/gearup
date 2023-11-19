import { useTicketCardLegContext } from '../TicketCardLegContext';

const getWegoAirlineLogo = (name: string) =>
  `https://assets.wego.com/image/upload/h_240,c_fill,f_auto,fl_lossy,q_auto:best,g_auto/v20180416/flights/airlines_square/${name}.png`;

function LegImage({ code, width, height }: { code: string; width: number; height: number }) {
  return <img src={getWegoAirlineLogo(code)} width={width} height={height} alt={`${code} logo`} key={code} />;
}

export function TicketCardLegAirlineImage() {
  const {
    leg: { airlineCodes }
  } = useTicketCardLegContext();

  const [firstArline, restOfAirlines] = [airlineCodes.slice(0, 1)[0], airlineCodes.slice(1)];
  return (
    <div className="flex w-full justify-center lg:w-2/12">
      <LegImage code={firstArline} width={48} height={48} />
      {restOfAirlines.map((airlineCode) => (
        <div className="self-end" key={airlineCode}>
          <LegImage code={airlineCode} width={20} height={20} />
        </div>
      ))}
    </div>
  );
}
