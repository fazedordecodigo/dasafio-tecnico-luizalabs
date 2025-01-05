import { User } from "@ports/domain/entities";
import { RepositoryProtocol } from "@ports/application/protocols";

export interface UsersRepositoryProtocol extends RepositoryProtocol<User> {
    getByEmail(email: string): Promise<User | null>
}