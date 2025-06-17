export interface Goal {
    id: number;
    amount: number;
    year: number;
    month: number;
    progress: number;
}

export interface GoalResponse {
    status: number;
    message: string;
    data: Goal[];
}

export interface CreateGoalRequest {
    amount: number;
    year: number;
    month: number;
}

export interface UpdateGoalRequest {
    amount: number;
}

export interface CreateUpdateGoalResponse {
    status: number;
    message: string;
    data: Goal;
}
