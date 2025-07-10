import { Task } from "../entities/task";

export interface ITaskRepository {
    create(task: Task): Promise<void>
}