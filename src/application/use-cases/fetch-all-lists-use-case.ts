import { List } from "../../domain/entities/list";
import { IListRepository } from "../../domain/repositories/list-repository";
import { IFetchAllListsResponseDto } from "../dtos/listDto";

export class FetchAllListsUseCase {
    constructor(private listRepository: IListRepository) {}

    async execute(): Promise<IFetchAllListsResponseDto> {
        const lists = await this.listRepository.fetchAll();

        if(lists.length === 0) {
            throw new Error("No lists found");
        }

        return {
            lists,
        }
    }
}