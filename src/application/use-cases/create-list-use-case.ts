import { List } from "../../domain/entities/list";
import { IListRepository } from "../../domain/repositories/list-repository";
import { ICreateListDto, ICreateListResponseDto } from "../dtos/listDto";


export class CreateListUseCase {
    constructor(private listRepository: IListRepository) {}

    async execute({
        title,
        description,
    }: ICreateListDto): Promise<ICreateListResponseDto> {
        const list = List.create(title, description);

        await this.listRepository.create(list);

        return {
            list,
        }
    }
}
