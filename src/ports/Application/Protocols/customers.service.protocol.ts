import { Result } from "typescript-result"
import { CreateCustomerDto } from "../dto/create-customer.dto"
import { UpdateCustomerDto } from "../dto/update-customer.dto"
import { Customer } from "src/ports/Domain/entities/customer.entity"

export interface Notifications {
    message: string
}

export interface CustomersServiceProtocol {
    getById(id: string): Promise<Result<Customer, Notifications[]>>
    getAll(skip?: number, take?: number): Promise<Result<Customer[], Notifications[]>>
    create(data: CreateCustomerDto): Promise<Result<Customer, Notifications[]>>
    update(id: string, data: UpdateCustomerDto): Promise<Result<void, Notifications[]>>
    delete(id: string): Promise<Result<void, Notifications[]>>
}