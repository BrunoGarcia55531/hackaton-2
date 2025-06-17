
import axios = require("axios");

const API_URL = "http://198.211.105.95:8080/authentication";

export const register = async (email: string, passwd: string) => {
  const response = await axios.post(`${API_URL}/register`, {
    email,
    passwd,
  });
  return response.data;
};

export const login = async (email: string, passwd: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    passwd,
  });
  return response.data;
};

export const fetchExpenseSummary = async () => {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const fetchExpenseDetail = async (categoryId: string, year: number, month: number) => {
  const response = await axios.get(`http://198.211.105.95:8080/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

// src/api/expensesActions.ts
export const addExpense = async (expense: { description: string; amount: number; categoryId: string }) => {
  const response = await axios.post("http://198.211.105.95:8080/expenses", expense, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
  return response.data;
};

export const deleteExpense = async (expenseId: string) => {
    const response = await axios.delete(`http://198.211.105.95:8080/expenses/${expenseId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    return response.data;
};