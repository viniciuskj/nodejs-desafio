import { List } from "../../domain/entities/list";

export interface ICreateListDto {
    title: string;
    description: string;
}

export interface ICreateListResponseDto {
    list: List
}