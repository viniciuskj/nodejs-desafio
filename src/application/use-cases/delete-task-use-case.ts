import { ITaskRepository } from "../../domain/repositories/task-repository";
import { IDeleteTaskRequestDto } from "../dtos/taskDto";

export class DeleteTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute({ id }: IDeleteTaskRequestDto): Promise<void> {
        const task = await this.taskRepository.findById(id);

        if (!task) {
            throw new Error("Task not found");
        }

        await this.taskRepository.delete(id);
    }
}