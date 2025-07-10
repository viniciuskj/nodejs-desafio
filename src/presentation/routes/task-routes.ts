import { FastifyInstance } from "fastify";
import { TaskController } from "../controllers/task-controller";
import { taskValidatorSchema } from "../validators/task-validator";

export async function taskRoutes(app: FastifyInstance, taskController: TaskController) {
    app.post("/tasks", (req, reply) => {
        taskController.create(req, reply);
    })
}