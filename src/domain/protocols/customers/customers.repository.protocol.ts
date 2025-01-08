import { RepositoryProtocol } from "@domain/protocols";
import { Customer } from "@domain/entities";

export interface CustomersRepositoryProtocol extends RepositoryProtocol<Customer> {
    addFavorite(id: string, favoriteId: string): Promise<Customer>
    removeFavorite(id: string, favoriteId: string): Promise<Customer>
    getByEmail(email: string): Promise<Customer | null>
}