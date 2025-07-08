import { Task } from "../entities/task";

export interface TaskRepository {
    create(task: Task): Promise<void>
}