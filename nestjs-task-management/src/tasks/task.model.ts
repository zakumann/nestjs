export interface Task {
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

export enum TaskStatus {
    OPEN = 'OPEN',
    I_PROGRESS = 'IN_PROGRESS',
    DONE = 'DONE',
}