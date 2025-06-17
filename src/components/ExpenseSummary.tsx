import React, { useEffect, useState } from "react";
import { fetchExpenseSummary } from "../api";

const ExpenseSummary = () => {
  const [expenses, setExpenses] = useState<any[]>([]);

  useEffect(() => {
    const getExpenses = async () => {
      const data = await fetchExpenseSummary();
      setExpenses(data as any[]);
    };
    getExpenses();
  }, []);

  return (
    <div>
      <h2>Resumen de Gastos</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>{expense.category}: {expense.total}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseSummary;
