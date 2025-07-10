import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/repositories/task-repository";
import { ICreateTaskDto, ICreateTaskResponseDto } from "../dtos/taskDto";


export class CreateTaskUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute({
        title,
        description,
        status,
        listId,
    }: ICreateTaskDto): Promise<ICreateTaskResponseDto> {
        const task = Task.create(title, description, listId, status);

        await this.taskRepository.create(task);

        return {
            task,
        }
    }
}