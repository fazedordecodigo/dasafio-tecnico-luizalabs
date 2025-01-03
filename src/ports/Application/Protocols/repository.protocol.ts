export interface RepositoryProtocol <T> {
    getById(id: string): Promise<T | null>
    getAll(skip?: number, take?: number): Promise<T[]>
    create(data: T): Promise<T>
    update(data: T): Promise<T>
    delete(id: string): Promise<T>
}