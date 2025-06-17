import { useState, useEffect } from 'react';
import type { ExpenseCategory } from '../types/expenses';
import { ExpensesService } from '../services/expenses.service';

export function useExpenseCategories() {
    const [categories, setCategories] = useState<ExpenseCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await ExpensesService.getExpenseCategories();
                setCategories(response.data);
            } catch (err: any) {
                setError(err.message || 'Error al cargar las categorías');
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return { categories, loading, error };
}
