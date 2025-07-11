import { Task } from "../entities/task";

export interface ITaskRepository {
    create(task: Task): Promise<void>
    findById(id: string): Promise<Task | null>
    update(task: Task): Promise<void>
    delete(id: string): Promise<void>
}