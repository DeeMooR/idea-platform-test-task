import { CurrencyType, ITicket } from "src/interfaces";

export const CURRENCIES: CurrencyType[] = ['RUB', 'USD', 'EUR'];
export const STOPS = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

export const selectSeveralStops = (stops: string[], item: string): string[] => {
  if (item === 'Все') return ['Все'];
  let updatedStops = stops.filter(stop => stop !== 'Все');
  updatedStops = updatedStops.includes(item) 
    ? updatedStops.filter(stop => stop !== item)
    : [...updatedStops, item];
  
  // если ничего не выбрано, то все
  if (!updatedStops.length) updatedStops = ['Все'];
  return updatedStops;
}
 
const getAmountOfStops = (stops: string[]): number[] => {
  return stops.map(stop => {
    return (stop === 'Без пересадок') ? 0 : +stop.split(" ")[0];
  })
}

export const filterTickets = (tickets: ITicket[], stops: string[]) => {
  if (stops.includes('Все')) return tickets;
  const selectedStops = getAmountOfStops(stops);
  console.log(selectedStops)
  return tickets.filter(ticket => selectedStops.includes(ticket.stops));
}