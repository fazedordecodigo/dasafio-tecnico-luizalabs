import { Result } from "typescript-result"
import { CreateCustomerDto, UpdateCustomerDto } from "@ports/application/dto"
import { CustomerDto } from "@adapters/dtos"

export interface CustomersServiceProtocol {
    getById(id: string): Promise<Result<CustomerDto, Notification>>
    getAll(skip?: number, take?: number): Promise<Result<CustomerDto[], Notification>>
    create(data: CreateCustomerDto): Promise<Result<CustomerDto, Notification>>
    update(id: string, data: UpdateCustomerDto): Promise<Result<void, Notification>>
    delete(id: string): Promise<Result<void, Notification>>
}