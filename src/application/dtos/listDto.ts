import { List } from "../../domain/entities/list";

export interface ICreateListDto {
    title: string;
    description: string;
}

export interface ICreateListResponseDto {
    list: List
}
export interface IFindListByIdDto {
    id: string
}

export interface IFindListByIdResponseDto {
    list: List
}

export interface IUpdateListRequestDto {
    id: string
    title: string
    description: string
}

export interface IUpdateListResponseDto {
    list: List
}

export interface IDeleteListRequestDto {
    id: string
}

export interface IFetchAllListsResponseDto {
    lists: List[]
}