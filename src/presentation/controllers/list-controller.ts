import { FastifyReply, FastifyRequest } from "fastify";
import { CreateListUseCase } from "../../application/use-cases/create-list-use-case";
import { listIdValidatorSchema, listUpdateValidatorSchema, listValidatorSchema } from "../validators/list-validator";
import { FindListByIdUseCase } from "../../application/use-cases/find-list-by-id-use-case";
import { UpdateListUseCase } from "../../application/use-cases/update-list-use-case";
import { ZodError } from "zod";

export class ListController {
    constructor(
        private createListUseCase: CreateListUseCase,
        private findListByIdUseCase: FindListByIdUseCase,
        private updateListUseCase: UpdateListUseCase
    ) {}

    async create(request: FastifyRequest, reply: FastifyReply) {
        const { title, description } = listValidatorSchema.parse(request.body);

        const { list } = await this.createListUseCase.execute({
            title,
            description,
        })

        if (!list) {
            return reply.status(404).send({
                message: "List not created"
            })
        }

        return reply.status(201).send(list);
    }

    async findById(request: FastifyRequest, reply: FastifyReply) {
        const { id } = listIdValidatorSchema.parse(request.params);

        const { list } = await this.findListByIdUseCase.execute({ id });

        if (!list) {
            return reply.status(404).send({
                message: "List not found"
            })
        }

        return reply.status(200).send(list);
    }

    async update(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = listIdValidatorSchema.parse(request.params);

            const { title, description } = listUpdateValidatorSchema.parse(request.body);

            const { list } = await this.updateListUseCase.execute({
                id,
                title,
                description,
            })

            if (!list) {
                return reply.status(404).send({
                    message: "List not found"
                })
            }

            return reply.status(200).send(list);
        } catch (error) {
            if (error instanceof ZodError) {
                return reply.status(400).send({
                    message: "Invalid request",
                    errors: error.issues,
                })
            }

            return reply.status(500).send({
                message: "Internal server error",
            })
        }
    }
}