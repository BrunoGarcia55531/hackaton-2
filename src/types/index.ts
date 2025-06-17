export interface User {
  email: string;
  token: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface ExpenseSummary {
  categoryId: number;
  categoryName: string;
  total: number;
}

export interface ExpenseDetail {
  id: number;
  description: string;
  amount: number;
  date: string;
  categoryId: number;
}

export interface Goal {
  id: number;
  year: number;
  month: number;
  amount: number;
}
