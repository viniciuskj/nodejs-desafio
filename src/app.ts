import fastify from "fastify";

const app = fastify();

app.get("/", () => {
    return "Hello World";
})

app.listen({ port: 3333}, (error, address) => {
    if (error) {
        console.error(error);
        process.exit(1);
    }
    console.log(`Server is running on ${address}`);
});