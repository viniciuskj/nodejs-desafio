import { Task } from "../../domain/entities/task";

export interface ICreateTaskDto {
    title: string;
    listId: string;
    description: string;
    status?: "pending" | "in_progress" | "completed";
}


export interface ICreateTaskResponseDto {
    task: Task
}
