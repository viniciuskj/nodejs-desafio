import { FastifyReply, FastifyRequest } from "fastify";
import { CreateTaskUseCase } from "../../application/use-cases/create-task-use-case";
import { taskDeleteValidatorSchema, taskIdValidatorSchema, taskUpdateValidatorSchema, taskValidatorSchema } from "../validators/task-validator";
import { ZodError } from "zod";
import { UpdateTaskUseCase } from "../../application/use-cases/update-task-use-case";
import { FindTaskByIdUseCase } from "../../application/use-cases/find-task-by-id-use-case";
import { DeleteTaskUseCase } from "../../application/use-cases/delete-task-use-case";

export class TaskController {
    constructor(
        private createTaskUseCase: CreateTaskUseCase,
        private updateTaskUseCase: UpdateTaskUseCase,
        private findTaskByIdUseCase: FindTaskByIdUseCase,
        private deleteTaskUseCase: DeleteTaskUseCase
    ) {}

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

    async update(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = taskIdValidatorSchema.parse(request.params);

            const { title, description, status } = taskUpdateValidatorSchema.parse(request.body);

            await this.updateTaskUseCase.execute({
                id,
                title,
                description,
                status,
            })

            return reply.status(200).send();
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

    async findById(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = taskIdValidatorSchema.parse(request.params);

            const { task } = await this.findTaskByIdUseCase.execute({ id })

            return reply.status(200).send(task);
        } catch (error) {
            if (error instanceof ZodError) {
                return reply.status(400).send({
                    message: "Invalid request",
                    errors: error.issues,
                })
            }

            return reply.status(500).send({
                message: "Internal server error"
            })
        }
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = taskDeleteValidatorSchema.parse(request.params);

            await this.deleteTaskUseCase.execute({ id });

            return reply.status(200).send();
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
