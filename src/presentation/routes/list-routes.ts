import { FastifyInstance } from "fastify";
import { ListController } from "../controllers/list-controller";

export async function listRoutes(app: FastifyInstance, listController: ListController) {
    app.post("/lists", (req, reply) => {
        listController.create(req, reply);
    })

    app.get("/lists/:id", (req, reply) => {
        listController.findById(req, reply);
    })

    app.patch("/lists/:id", (req, reply) => {
        listController.update(req, reply);
    })
}