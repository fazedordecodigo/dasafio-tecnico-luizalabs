import { User } from "../Services/users.service";

export interface UsersServiceProtocol {
    findOne(username: string): Promise<User | undefined>
}