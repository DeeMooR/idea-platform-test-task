import React, { createContext, useState, ReactNode, useContext } from 'react';
import { CurrencyType, ITicket } from 'src/interfaces';
import { allTickets } from 'src/tickets';

interface TicketsContextType {
  tickets: ITicket[];
  currency: CurrencyType;
  stops: string[];
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

  return (
    <TicketsContext.Provider value={{ tickets, currency, stops, setTickets, setCurrency, setStops }}>
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

