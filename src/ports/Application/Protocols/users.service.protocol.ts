import { Notification } from "src/ports/Domain/entities/notification.entity";
import { Result } from "typescript-result";
import { CreateUserDto } from "../dto/create-user.dto";
import { GetByEmailUserDto } from "../dto/get-by-email-user.dto";
import { GetByEmailUserResultDto } from "../dto/get-by-email-user-result.dto";

export interface UsersServiceProtocol {
    getByEmail(email: GetByEmailUserDto): Promise<Result<GetByEmailUserResultDto, Notification>>
    create(data: CreateUserDto): Promise<Result<void, Notification>>
}