import { z } from "zod";
import { ICreateListDto, IDeleteListRequestDto, IFindListByIdDto, IUpdateListRequestDto } from "../../application/dtos/listDto";

export const listValidatorSchema: z.ZodType<ICreateListDto> = z.object({
    title: z.string().min(1),
    description: z.string(),
})

export type ListValidatorRequest = z.infer<typeof listValidatorSchema>

export const listIdValidatorSchema: z.ZodType<IFindListByIdDto> = z.object({
    id: z.string().min(1),
})

export type ListIdValidatorRequest = z.infer<typeof listIdValidatorSchema>

export const listUpdateValidatorSchema: z.ZodType<Omit<IUpdateListRequestDto, "id">> = z.object({
    title: z.string().min(1),
    description: z.string(),
})

export type ListUpdateValidatorRequest = z.infer<typeof listUpdateValidatorSchema>

export const listDeleteValidatorSchema: z.ZodType<IDeleteListRequestDto> = z.object({
    id: z.string().min(1),
})

export type ListDeleteValidatorRequest = z.infer<typeof listDeleteValidatorSchema>