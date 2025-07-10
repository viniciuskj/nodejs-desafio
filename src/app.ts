import { PrismaClient } from "./generated/prisma";
import fastify from "fastify";
import { CreateListUseCase } from "./application/use-cases/create-list-use-case";
import { CreateTaskUseCase } from "./application/use-cases/create-task-use-case";
import { ListRepository } from "./infra/repositories/list-repository";
import { TaskRepository } from "./infra/repositories/task-repository";
import { ListController } from "./presentation/controllers/list-controller";
import { TaskController } from "./presentation/controllers/task-controller";
import { listRoutes } from "./presentation/routes/list-routes";
import { taskRoutes } from "./presentation/routes/task-routes";
import { FindListByIdUseCase } from "./application/use-cases/find-list-by-id-use-case";
import { UpdateListUseCase } from "./application/use-cases/update-list-use-case";
import { DeleteListUseCase } from "./application/use-cases/delete-list-use-case";
import { FetchAllListsUseCase } from "./application/use-cases/fetch-all-lists-use-case";


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
}

const listController = new ListController(
    listUseCases.create, 
    listUseCases.findById, 
    listUseCases.update,
    listUseCases.delete,
    listUseCases.fetchAll
);

const taskController = new TaskController(taskUseCases.create);

listRoutes(app, listController);
taskRoutes(app, taskController);

app.listen({ port: 3333}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server is running on ${address}`);
});