import { PrismaClient } from "../../../prisma/src/generated/prisma";
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

    async findById(id: string): Promise<Task | null> {
        const task = await this.prisma.task.findUnique({
            where: {
                id,
            }
        })

        if(!task) {
            return null;
        }

        return new Task(
            task.id,
            task.listId,
            task.title,
            task.description,
            task.status as "pending" | "in_progress" | "completed",
            task.createdAt,
            task.updatedAt,
        )
    }

    async update(task: Task): Promise<void> {
        await this.prisma.task.update({
            where: {
                id: task.id,
            },
            data : {
                title: task.title,
                description: task.description,
                status: task.status,
                listId: task.listId,
                updatedAt: new Date(),
            }
        })
    }

    async delete(id: string): Promise<void> {
        await this.prisma.task.delete({
            where: {
                id,
            }
        })
    }
}