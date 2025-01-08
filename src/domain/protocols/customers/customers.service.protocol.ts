import { Result } from "typescript-result"
import { AddFavoritesDto, CreateCustomerDto, GetAllDto, ResponseCustomerDto, ResponseCustomerWithFavoriteDto, UpdateCustomerDto } from "@domain/dtos"
import { Notification } from "@domain/entities"

export interface CustomersServiceProtocol {
    getById(id: string): Promise<Result<ResponseCustomerWithFavoriteDto, Notification>>
    getAll(payload: GetAllDto): Promise<Result<ResponseCustomerDto[], Notification>>
    create(data: CreateCustomerDto): Promise<Result<ResponseCustomerDto, Notification>>
    addFavorites(id: string, favorites: AddFavoritesDto[]): Promise<Result<ResponseCustomerWithFavoriteDto, Notification[]>>
    update(id: string, data: UpdateCustomerDto): Promise<Result<ResponseCustomerDto, Notification>>
    delete(id: string): Promise<Result<void, Notification>>
}