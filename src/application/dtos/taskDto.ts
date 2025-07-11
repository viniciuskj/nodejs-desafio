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

export interface IFindTaskByIdRequestDto {
    id: string
}

export interface IFindTaskByIdResponseDto {
    task: Task
}

export interface IUpdateTaskResponseDto {
    task: Task
}

export interface IUpdateTaskRequestDto {
    id: string
    title: string
    description: string
    status?: "pending" | "in_progress" | "completed";
}

export interface IDeleteTaskRequestDto {
    id: string
}