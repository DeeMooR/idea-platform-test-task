import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { CurrencyType, IRates, ITicket } from 'src/interfaces';
import { getExchangeRates } from 'src/utils/config';
import { allTickets } from 'src/tickets';

interface TicketsContextType {
  tickets: ITicket[];
  currency: CurrencyType;
  stops: string[];
  rates: IRates | null;
  setTickets: (tickets: ITicket[]) => void;
  setCurrency: (currency: CurrencyType) => void;
  setStops: (stops: string[]) => void;
}

type Props = {
  children: ReactNode;
}
 
const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketsProvider = ({ children }: Props) => {
  const [tickets, setTickets] = useState<ITicket[]>(allTickets);
  const [currency, setCurrency] = useState<CurrencyType>('RUB');
  const [stops, setStops] = useState<string[]>([]);
  const [rates, setRates] = useState<IRates | null>(null);

  useEffect(() => {
    const getRates = async () => {
      const rates = await getExchangeRates();
      setRates(rates);
    }
    getRates();
  }, [])

  return (
    <TicketsContext.Provider value={{ tickets, currency, stops, rates, setTickets, setCurrency, setStops }}>
      {children}
    </TicketsContext.Provider>
  );
};

export const useTickets = (): TicketsContextType => {
  const context = useContext(TicketsContext);
  if (!context) {
    throw new Error('useTickets must be used within a TicketsProvider');
  }
  return context;
};

