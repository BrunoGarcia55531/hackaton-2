import { axiosGet, axiosPost, axiosPut } from '../api';
import type {
    Goal,
    GoalResponse,
    CreateGoalRequest,
    UpdateGoalRequest,
    CreateUpdateGoalResponse
} from '../types/goals';

const BASE_URL = 'http://198.211.105.95:8080';

export class GoalsService {
    static async getGoals(): Promise<Goal[]> {
        const response = await axiosGet<GoalResponse>(`${BASE_URL}/goals`);
        return response.data;
    }

    static async createGoal(goal: CreateGoalRequest): Promise<Goal> {
        const response = await axiosPost<CreateUpdateGoalResponse>(`${BASE_URL}/goals`, goal);
        return response.data;
    }

    static async updateGoal(id: number, goal: UpdateGoalRequest): Promise<Goal> {
        const response = await axiosPut<CreateUpdateGoalResponse>(`${BASE_URL}/goals/${id}`, goal);
        return response.data;
    }
}
