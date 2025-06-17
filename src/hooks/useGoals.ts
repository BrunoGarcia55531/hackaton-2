import { useState, useEffect, useCallback } from 'react';
import type { Goal, CreateGoalRequest, UpdateGoalRequest } from '../types/goals';
import { GoalsService } from '../services/goals.service';

export function useGoals() {
    const [goals, setGoals] = useState<Goal[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchGoals = useCallback(async () => {
        try {
            setLoading(true);
            const data = await GoalsService.getGoals();
            setGoals(data);
            setError('');
        } catch (err: any) {
            setError(err.message || 'Error al cargar las metas');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchGoals();
    }, [fetchGoals]);

    const createGoal = async (goalData: CreateGoalRequest) => {
        try {
            await GoalsService.createGoal(goalData);
            await fetchGoals(); // Recargar la lista después de crear
        } catch (err: any) {
            throw new Error(err.message || 'Error al crear la meta');
        }
    };

    const updateGoal = async (id: number, goalData: UpdateGoalRequest) => {
        try {
            await GoalsService.updateGoal(id, goalData);
            await fetchGoals(); // Recargar la lista después de actualizar
        } catch (err: any) {
            throw new Error(err.message || 'Error al actualizar la meta');
        }
    };

    return {
        goals,
        loading,
        error,
        createGoal,
        updateGoal,
        refreshGoals: fetchGoals
    };
}
