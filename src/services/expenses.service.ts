import { axiosGet, axiosPost, axiosDelete } from '../api';
import type { ExpensesSummaryResponse, ExpenseDetail, ExpenseQueryParams, CreateExpenseRequest, CreateExpenseResponse, DeleteExpenseResponse, ExpenseCategoryResponse } from '../types/expenses';

const BASE_URL = 'http://198.211.105.95:8080';

export class ExpensesService {
    static async getExpensesSummary(): Promise<ExpensesSummaryResponse> {
        return await axiosGet<ExpensesSummaryResponse>(`${BASE_URL}/expenses_summary`);
    }

    static async getExpenseDetail(params: ExpenseQueryParams): Promise<ExpenseDetail> {
        const { year, month, categoryId } = params;
        const url = `${BASE_URL}/expenses/detail?year=${year}&month=${month}&categoryId=${categoryId}`;
        return await axiosGet<ExpenseDetail>(url);
    }

    static async createExpense(expense: CreateExpenseRequest): Promise<CreateExpenseResponse> {
        return await axiosPost<CreateExpenseResponse>(`${BASE_URL}/expenses`, expense);
    }

    static async deleteExpense(id: number): Promise<DeleteExpenseResponse> {
        return await axiosDelete<DeleteExpenseResponse>(`${BASE_URL}/expenses/${id}`);
    }

    static async getExpenseCategories(): Promise<ExpenseCategoryResponse> {
        return await axiosGet<ExpenseCategoryResponse>(`${BASE_URL}/expenses_category`);
    }
}
