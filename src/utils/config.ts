import CurrencyAPI from '@everapi/currencyapi-js';
import { IRates, ITicket } from 'src/interfaces';

const currencyApi = new CurrencyAPI('cur_live_orrGoD8JkLXrd2wVGyboeezdCQelZIdSpWLoYrEh');

interface IDataResponse {
  data: {
    USD: {
      code: string,
      value: number
    }
    EUR: {
      code: string,
      value: number
    }
  }
}

export const getExchangeRates = async (): Promise<IRates> => {
  // const rates = await currencyApi.latest({
  //   base_currency: 'RUB',
  //   currencies: ['USD', 'EUR']
  // }).then(({data}: IDataResponse) => data);
  // const obj = {
  //   USD: rates.USD.value,
  //   EUR: rates.EUR.value
  // }
  const obj = {
    USD: 0.01,
    EUR: 0.01
  }
  return obj;
}

export const sortTicketsByDateTime = (tickets: ITicket[]) => {
  return tickets.sort((a, b) => {
    const parseDateTime = (date: string, time: string) => {
      const [day, month, year] = date.split('.').map((part) => part.trim());
      const fullYear = year.length === 2 ? `20${year}` : year;
      const formattedDate = `${fullYear}-${month}-${day}`;

      const [hours, minutes] = time.split(':').map((part) => part.trim());
      const formattedTime = `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`; // Добавляем ведущий ноль
  
      const dateTimeString = `${formattedDate}T${formattedTime}`;
      return new Date(dateTimeString);
    };

    const dateA = parseDateTime(a.departure_date, a.departure_time);
    const dateB = parseDateTime(b.departure_date, b.departure_time);
    return dateA.getTime() - dateB.getTime();
  })
}