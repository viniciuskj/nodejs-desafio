import { randomUUID } from "crypto";
import { Task } from "./task";

export class List {
    constructor(
        public readonly id: string,
        public readonly title: string,
        public readonly description: string,
        public readonly tasks: Task[] = [],
        public readonly createdAt: Date,
        public readonly updatedAt: Date,
    ) {}

    static create(title: string, description: string) {
        return new List(
            randomUUID(),
            title,
            description,
            [],
            new Date(),
            new Date(),
        )
    }
}