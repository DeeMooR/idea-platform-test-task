import React, { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { CurrencyType, IRates, ITicket } from 'src/interfaces';
import { getExchangeRates, sortTicketsByDateTime } from 'src/utils/config';
import { allTickets } from 'src/utils/tickets';

interface TicketsContextType {
  tickets: ITicket[];
  shownTickets: ITicket[];
  currency: CurrencyType;
  stops: string[];
  rates: IRates | null;
  loading: boolean;
  setShownTickets: (tickets: ITicket[]) => void;
  setCurrency: (currency: CurrencyType) => void;
  setStops: (stops: string[]) => void;
  setLoading: (bool: boolean) => void;
}

type Props = {
  children: ReactNode;
}
 
const TicketsContext = createContext<TicketsContextType | undefined>(undefined);

export const TicketsProvider = ({ children }: Props) => {
  const [tickets, setTickets] = useState<ITicket[]>([]);
  const [shownTickets, setShownTickets] = useState<ITicket[]>([]);

  const [currency, setCurrency] = useState<CurrencyType>('RUB');
  const [stops, setStops] = useState<string[]>(['Все']);
  const [rates, setRates] = useState<IRates | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getRates = async () => {
      const rates = await getExchangeRates();
      setRates(rates);
    }
    getRates();

    const sortedTickets = sortTicketsByDateTime(allTickets);
    setTickets(sortedTickets);
    setShownTickets(sortedTickets);
  }, [])

  return (
    <TicketsContext.Provider value={{ tickets, shownTickets, currency, stops, rates, loading, setShownTickets, setCurrency, setStops, setLoading }}>
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

