import { RepositoryProtocol } from "@domain/protocols";
import { Customer } from "@domain/entities";

export interface CustomersRepositoryProtocol extends RepositoryProtocol<Customer> {
    addFavorites(id: string, favorites: string[]): Promise<Customer>
    removeFavorites(id: string, favorites: string[]): Promise<Customer>
}