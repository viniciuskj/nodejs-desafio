import { ITaskRepository } from "../../domain/repositories/task-repository";
import { IFindTaskByIdRequestDto } from "../dtos/taskDto";
import { IFindTaskByIdResponseDto } from "../dtos/taskDto";

export class FindTaskByIdUseCase {
    constructor(private taskRepository: ITaskRepository) {}

    async execute({ id }: IFindTaskByIdRequestDto): Promise<IFindTaskByIdResponseDto> {
        const task = await this.taskRepository.findById(id);

        if(!task) {
            throw new Error("Task not found");
        }

        return { 
            task
        }
    }
}