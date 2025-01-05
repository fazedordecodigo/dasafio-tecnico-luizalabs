import { Result } from "typescript-result"
import { CreateCustomerDto, UpdateCustomerDto } from "@ports/application/dto"
import { Customer, Notification } from "@ports/domain/entities"

export interface CustomersServiceProtocol {
    getById(id: string): Promise<Result<Customer, Notification>>
    getAll(skip?: number, take?: number): Promise<Result<Customer[], Notification>>
    create(data: CreateCustomerDto): Promise<Result<Customer, Notification>>
    update(id: string, data: UpdateCustomerDto): Promise<Result<void, Notification>>
    delete(id: string): Promise<Result<void, Notification>>
}