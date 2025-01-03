import { UUID } from "node:crypto"

export interface RepositoryProtocol <T> {
    getById(id: UUID): Promise<T | null>
    getAll(skip?: number, take?: number): Promise<T[]>
    create(data: T): Promise<T>
    update(data: T): Promise<T>
    delete(id: UUID): Promise<T>
}