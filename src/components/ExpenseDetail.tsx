// src/components/ExpenseDetail.tsx
import React, { useEffect, useState } from "react";
import { fetchExpenseDetail } from "../api";

const ExpenseDetail = ({ categoryId, year, month }: { categoryId: string; year: number; month: number }) => {
  const [expenseDetail, setExpenseDetail] = useState<any[]>([]);

  useEffect(() => {
    const getExpenseDetail = async () => {
      const data = await fetchExpenseDetail(categoryId, year, month);
      setExpenseDetail(data as any[]);
    };
    getExpenseDetail();
  }, [categoryId, year, month]);

  return (
    <div>
      <h2>Detalle de Gastos</h2>
      <ul>
        {expenseDetail.map((expense, index) => (
          <li key={index}>{expense.description}: {expense.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseDetail;
