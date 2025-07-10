import { PrismaClient } from "../../generated/prisma";
import { IListRepository } from "../../domain/repositories/list-repository";
import { List } from "../../domain/entities/list";
import { Task } from "../../domain/entities/task";

export class ListRepository implements IListRepository {
    constructor(private prisma: PrismaClient) {}

    async create(list: List): Promise<void> {
        await this.prisma.list.create({
            data: {
                id: list.id,
                title: list.title,
                description: list.description,
                createdAt: list.createdAt,
                updatedAt: list.updatedAt,
            }
        })
    }

    async findById(id: string): Promise<List | null> {
        const list = await this.prisma.list.findUnique({
            where: {
                id
            },
            include: {
                tasks: true,
            }
        })

        if (!list) {
            return null;
        }

        return new List(
            list.id,
            list.title,
            list.description,
            list.tasks.map(task => new Task(
                task.id,
                list.id,
                task.title,
                task.description,
                task.status as "pending" | "in_progress" | "completed",
                task.createdAt,
                task.updatedAt,
            )),
            list.createdAt,
            list.updatedAt,
        )
    }

    async update(list: List): Promise<void> {
        await this.prisma.list.update({
            where: {
                id: list.id
            },
            data: {
                title: list.title,
                description: list.description,
                updatedAt: new Date(),  
            }
        })
    }
}