import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/repositories/task-repository";
import { IUpdateTaskRequestDto } from "../dtos/taskDto";

export class UpdateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute({ id, title, description, status }: IUpdateTaskRequestDto): Promise<void> {
        const task = await this.taskRepository.findById(id);

        if(!task) {
            throw new Error("Task not found");
        }

        const updatedTask = new Task(
            task.id,
            task.listId,
            title,
            description,
            status || "pending",
            task.createdAt,
            new Date(),
        )

        await this.taskRepository.update(updatedTask);
    }

}