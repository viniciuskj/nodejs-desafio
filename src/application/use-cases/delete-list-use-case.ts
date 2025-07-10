import { IListRepository } from "../../domain/repositories/list-repository";
import { IDeleteListRequestDto,  } from "../dtos/listDto";

export class DeleteListUseCase {
    constructor(private listRepository: IListRepository) {}

    async execute({ id }: IDeleteListRequestDto): Promise<void> {
        const list = await this.listRepository.findById(id);

        if(!list) {
            throw new Error("List not found");
        }

        await this.listRepository.delete(id);
    }
}