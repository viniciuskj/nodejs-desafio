import { FastifyReply, FastifyRequest } from "fastify";
import { CreateListUseCase } from "../../application/use-cases/create-list-use-case";
import { listDeleteValidatorSchema, listIdValidatorSchema, listUpdateValidatorSchema, listValidatorSchema } from "../validators/list-validator";
import { FindListByIdUseCase } from "../../application/use-cases/find-list-by-id-use-case";
import { UpdateListUseCase } from "../../application/use-cases/update-list-use-case";
import { ZodError } from "zod";
import { DeleteListUseCase } from "../../application/use-cases/delete-list-use-case";
import { FetchAllListsUseCase } from "../../application/use-cases/fetch-all-lists-use-case";

export class ListController {
    constructor(
        private createListUseCase: CreateListUseCase,
        private findListByIdUseCase: FindListByIdUseCase,
        private updateListUseCase: UpdateListUseCase,
        private deleteListUseCase: DeleteListUseCase,
        private fetchAllListsUseCase: FetchAllListsUseCase
    ) {}

    async create(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { title, description } = listValidatorSchema.parse(request.body);

            const { list } = await this.createListUseCase.execute({
                title,
                description,
            })

            return reply.status(201).send(list);
        } catch (error) {
            if(error instanceof ZodError) {
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

    async findById(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = listIdValidatorSchema.parse(request.params);

            const { list } = await this.findListByIdUseCase.execute({ id });

            return reply.status(200).send(list);
        } catch (error) {
            if(error instanceof ZodError) {
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

    async update(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = listIdValidatorSchema.parse(request.params);

            const { title, description } = listUpdateValidatorSchema.parse(request.body);

            const { list } = await this.updateListUseCase.execute({
                id,
                title,
                description,
            })

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

    async delete(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { id } = listDeleteValidatorSchema.parse(request.params);

            await this.deleteListUseCase.execute({ id })

            return reply.status(204).send();
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

    async fetchAll(request: FastifyRequest, reply: FastifyReply) {
        try {
            const { lists } = await this.fetchAllListsUseCase.execute();
            
            return reply.status(200).send(lists);
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