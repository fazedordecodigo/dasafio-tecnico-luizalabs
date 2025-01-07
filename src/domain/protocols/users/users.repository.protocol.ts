import { User } from "@domain/entities";
import { RepositoryProtocol } from "@domain/protocols";

export interface UsersRepositoryProtocol extends RepositoryProtocol<User> {
    getByEmail(email: string): Promise<User | null>
}