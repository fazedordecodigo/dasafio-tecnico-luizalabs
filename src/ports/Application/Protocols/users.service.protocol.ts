import { User } from "src/ports/Domain/entities/user.entity";

export interface UsersServiceProtocol {
    findOne(username: string): Promise<User | undefined>
}