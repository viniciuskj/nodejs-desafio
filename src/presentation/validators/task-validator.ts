import { z } from "zod";
import { ICreateTaskDto, IFindTaskByIdRequestDto, IUpdateTaskRequestDto } from "../../application/dtos/taskDto";

export const taskValidatorSchema: z.ZodType<ICreateTaskDto> = z.object({
    title: z.string().min(1),
    description: z.string(),
    status: z.enum(["pending", "in_progress", "completed"]).optional(),
    listId: z.string().min(1),
})

export type TaskValidatorRequest = z.infer<typeof taskValidatorSchema>

export const taskIdValidatorSchema: z.ZodType<IFindTaskByIdRequestDto> = z.object({
    id: z.string().min(1),
})

export type TaskIdValidatorRequest = z.infer<typeof taskIdValidatorSchema>


export const taskUpdateValidatorSchema: z.ZodType<Omit<IUpdateTaskRequestDto, "id">> = z.object({
    title: z.string().min(1),
    description: z.string(),
    status: z.enum(["pending", "in_progress", "completed"]).optional(),
})

export type TaskUpdateValidatorRequest = z.infer<typeof taskUpdateValidatorSchema>
