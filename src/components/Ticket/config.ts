import { CurrencyType, IRates } from "src/interfaces";

enum CurrencySymbol {
  RUB = '₽',
  USD = '$',
  EUR = '€',
}

export const formatCost = (cost: number): string => {
  const formattedCost = cost.toString().slice(0, -3) + ' ' + cost.toString().slice(-3);
  return formattedCost;
}

export const getPrice = (rates: IRates | null, currency: CurrencyType, price: number) => {
  const newPrice = (currency === 'RUB' || !rates) 
    ? formatCost(price) 
    : (price*rates[currency]).toFixed(2);
  return newPrice + CurrencySymbol[currency];
}

export const getTextPluralStops = (count: number) => {
  if (count === 0) return 'Без пересадок';
  
  let stopsText = '';
  const rules = ['пересадка', 'пересадки', 'пересадок'];
  const result = new Intl.PluralRules('ru-RU').select(count);
  switch (result) {
    case 'one': stopsText = rules[0]; break;
    case 'few': stopsText = rules[1]; break;
    default: stopsText = rules[2];
  }
  return `${count} ${stopsText}`
}

export const formatDate = (dateString: string): string => {
  const [day, month, year] = dateString.split('.').map(Number);
  const date = new Date(2000 + year, month - 1, day);

  const months = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const formattedDate = `${day} ${months[date.getMonth()]} ${date.getFullYear()}, ${weekdays[date.getDay()]}`;
  return formattedDate;
};