import { List } from "../entities/list";

export interface IListRepository {
    create(list: List): Promise<void>
    findById(id: string): Promise<List | null>
    update(list: List): Promise<void>
    delete(id: string): Promise<void>
    fetchAll(): Promise<List[]>
}