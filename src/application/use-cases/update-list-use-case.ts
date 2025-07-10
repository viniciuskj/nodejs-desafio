import { List } from "../../domain/entities/list";
import { IListRepository } from "../../domain/repositories/list-repository";
import { IUpdateListRequestDto, IUpdateListResponseDto } from "../dtos/listDto";


export class UpdateListUseCase {
    constructor(private listRepository: IListRepository) {}

    async execute({ id, title, description }: IUpdateListRequestDto): Promise<IUpdateListResponseDto> {
        const list = await this.listRepository.findById(id);

        if(!list) {
            throw new Error("List not found");
        }

        const updatedList = new List(
            list.id,
            title,
            description,
            list.tasks,
            list.createdAt,
            new Date(),
        )

        await this.listRepository.update(updatedList);

        return {
            list: updatedList,
        }
    }
}
