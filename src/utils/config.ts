import CurrencyAPI from '@everapi/currencyapi-js';
import { IRates } from 'src/interfaces';

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
  const rates = await currencyApi.latest({
    base_currency: 'RUB',
    currencies: ['USD', 'EUR']
  }).then(({data}: IDataResponse) => data);
  const obj = {
    USD: rates.USD.value,
    EUR: rates.EUR.value
  }
  return obj;
}
