import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ExpenseSummary, ExpenseDetail, Category, Goal } from '../types';

interface ExpensesContextType {
  summary: ExpenseSummary[];
  setSummary: (s: ExpenseSummary[]) => void;
  details: Record<number, ExpenseDetail[]>;
  setDetails: (catId: number, details: ExpenseDetail[]) => void;
  categories: Category[];
  setCategories: (c: Category[]) => void;
  goals: Goal[];
  setGoals: (g: Goal[]) => void;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(undefined);

export const ExpensesProvider = ({ children }: { children: ReactNode }) => {
  const [summary, setSummary] = useState<ExpenseSummary[]>([]);
  const [details, setDetailsState] = useState<Record<number, ExpenseDetail[]>>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);

  const setDetails = (catId: number, d: ExpenseDetail[]) => {
    setDetailsState(prev => ({ ...prev, [catId]: d }));
  };

  return (
    <ExpensesContext.Provider value={{ summary, setSummary, details, setDetails, categories, setCategories, goals, setGoals }}>
      {children}
    </ExpensesContext.Provider>
  );
};

export const useExpenses = () => {
  const ctx = useContext(ExpensesContext);
  if (!ctx) throw new Error('useExpenses must be used within ExpensesProvider');
  return ctx;
};
