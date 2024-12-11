export const CURRENCIES = ['RUB', 'USD', 'EUR'];
export const STOPS = ['Все', 'Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];

export const selectSeveralStops = (stops: string[], item: string): string[] => {
  if (item === 'Все') return ['Все'];
  let updatedStops = stops.filter(stop => stop !== 'Все');
  updatedStops = updatedStops.includes(item) 
    ? updatedStops.filter(stop => stop !== item)
    : [...updatedStops, item];
    
  return updatedStops;
}