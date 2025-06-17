export interface ExpenseSummary {
    category: string;
    total: number;
    percentage: number;
}

export interface ExpensesSummaryResponse {
    status: number;
    message: string;
    data: ExpenseSummary[];
}

export interface Expense {
    id: number;
    amount: number;
    categoryId: number;
    date: string;
    description: string;
}

export interface ExpenseDetail {
    expenses: Expense[];
    total: number;
    count: number;
}

export interface ExpenseQueryParams {
    year: number;
    month: number;
    categoryId: number;
}

export interface CreateExpenseRequest {
    amount: number;
    categoryId: number;
    date: string;
    description: string;
}

export interface CreateExpenseResponse {
    status: number;
    message: string;
    data: {
        id: number;
    };
}

export interface DeleteExpenseResponse {
    status: number;
    message: string;
}

export interface ExpenseCategory {
    id: number;
    name: string;
}

export interface ExpenseCategoryResponse {
    status: number;
    message: string;
    data: ExpenseCategory[];
}
