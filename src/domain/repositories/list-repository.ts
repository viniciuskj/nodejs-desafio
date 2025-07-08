import { List } from "../entities/list";

export interface ListRepository {
    create(list: List): Promise<void>
}