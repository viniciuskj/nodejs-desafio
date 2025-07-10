import { PrismaClient } from "../../generated/prisma";
import { Task } from "../../domain/entities/task";
import { ITaskRepository } from "../../domain/repositories/task-repository";

export class TaskRepository implements ITaskRepository {
    constructor(private prisma: PrismaClient) {}

    async create(task: Task): Promise<void> {
        await this.prisma.task.create({
            data: {
                id: task.id,
                title: task.title,
                description: task.description,
                status: task.status,
                listId: task.listId,
                createdAt: task.createdAt,
                updatedAt: task.updatedAt,
            }
        })
    }
}