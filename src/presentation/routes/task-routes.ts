import { FastifyInstance } from "fastify";
import { TaskController } from "../controllers/task-controller";

export async function taskRoutes(app: FastifyInstance, taskController: TaskController) {
    app.post("/tasks", (req, reply) => {
        taskController.create(req, reply);
    })

    app.patch("/tasks/:id", (req, reply) => {
        taskController.update(req, reply);
    })
}