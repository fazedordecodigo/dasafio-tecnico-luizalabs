import { Result } from "typescript-result"
import { CreateCustomerDto } from "../dto/create-customer.dto"
import { UpdateCustomerDto } from "../dto/update-customer.dto"
import { Customer } from "src/ports/Domain/entities/customer.entity"
import { Notification } from "src/ports/Domain/entities/notification.entity"

export interface CustomersServiceProtocol {
    getById(id: string): Promise<Result<Customer, Notification>>
    getAll(skip?: number, take?: number): Promise<Result<Customer[], Notification>>
    create(data: CreateCustomerDto): Promise<Result<Customer, Notification>>
    update(id: string, data: UpdateCustomerDto): Promise<Result<void, Notification>>
    delete(id: string): Promise<Result<void, Notification>>
}