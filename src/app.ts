import fastify from "fastify";
import { PrismaClient } from "../prisma/src/generated/prisma";
import { env } from "../env";
import {
    CreateListUseCase,
    FindListByIdUseCase,
    UpdateListUseCase,
    DeleteListUseCase,
    FetchAllListsUseCase,
    CreateTaskUseCase,
    UpdateTaskUseCase,
    FindTaskByIdUseCase,
} from './application/use-cases';

import { ListRepository, TaskRepository } from './infra/repositories';
import { ListController, TaskController } from './presentation/controllers';
import { listRoutes, taskRoutes } from './presentation/routes';


const app = fastify();

const prisma = new PrismaClient();

const listRepository = new ListRepository(prisma);
const taskRepository = new TaskRepository(prisma);

const listUseCases = {
    create: new CreateListUseCase(listRepository),
    findById: new FindListByIdUseCase(listRepository),
    update: new UpdateListUseCase(listRepository),
    delete: new DeleteListUseCase(listRepository),
    fetchAll: new FetchAllListsUseCase(listRepository),
}

const taskUseCases = {
    create: new CreateTaskUseCase(taskRepository),
    update: new UpdateTaskUseCase(taskRepository),
    findById: new FindTaskByIdUseCase(taskRepository),
}   

const listController = new ListController(
    listUseCases.create, 
    listUseCases.findById, 
    listUseCases.update,
    listUseCases.delete,
    listUseCases.fetchAll
);

const taskController = new TaskController(taskUseCases.create, taskUseCases.update, taskUseCases.findById);

listRoutes(app, listController);
taskRoutes(app, taskController);

app.listen({ port: env.PORT}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server is running on ${address}`);
});