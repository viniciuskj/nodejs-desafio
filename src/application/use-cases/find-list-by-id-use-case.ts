import { IListRepository } from "../../domain/repositories/list-repository";
import { IFindListByIdDto, IFindListByIdResponseDto } from "../dtos/listDto";

export class FindListByIdUseCase {
    constructor(private listRepository: IListRepository) {}

    async execute({ id }: IFindListByIdDto): Promise<IFindListByIdResponseDto> {
        const list  = await this.listRepository.findById(id);

        if (!list) {
            throw new Error("List not found");
        }

        return {
            list,
        }
    }
}