import { randomUUID } from "crypto";

export class Task  {
    constructor(
        public readonly id: string,
        public readonly listId: string,
        public readonly title: string,
        public readonly description: string,
        public readonly status: "pending" | "in_progress" | "completed",
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(title: string, description: string, listId: string, status?: "pending" | "in_progress" | "completed") {
        return new Task(
            randomUUID(),
            listId,
            title,
            description,
            status || "pending",
            new Date(),
            new Date(),
        )
    }
}