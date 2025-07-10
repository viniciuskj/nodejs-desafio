import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskUseCase } from "../../application/use-cases/create-task-use-case";
import { taskValidatorSchema } from "../validators/task-validator";
import { ZodError } from "zod";

export class TaskController {
    constructor(private createTaskUseCase: CreateTaskUseCase) {}

    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { title, description, status, listId } = taskValidatorSchema.parse(request.body);

            const { task } = await this.createTaskUseCase.execute({
                title,
                description,
                status,
                listId,
            })

            if (!task) {
                return reply.status(404).send({
                    message: "Task not created"
                })
            }

            return reply.status(201).send(task);
        } catch (error) {
            if (error instanceof ZodError) {
                return reply.status(400).send({
                    message: "Invalid request",
                    errors: error.issues,
                })
            }
        }

        return reply.status(500).send({
            message: "Internal server error"
        })
    }
}
