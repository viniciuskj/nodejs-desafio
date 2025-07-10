import { z } from "zod";
import { ICreateTaskDto } from "../../application/dtos/taskDto";

export const taskValidatorSchema: z.ZodType<ICreateTaskDto> = z.object({
    title: z.string().min(1),
    description: z.string(),
    status: z.enum(["pending", "in_progress", "completed"]).optional(),
    listId: z.string().min(1),
})

export type TaskValidatorRequest = z.infer<typeof taskValidatorSchema>
