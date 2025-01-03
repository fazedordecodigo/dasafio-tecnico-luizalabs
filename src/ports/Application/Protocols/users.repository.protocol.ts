import { User } from "@prisma/client";
import { RepositoryProtocol } from "./repository.protocol";

export interface UsersRepositoryProtocol extends RepositoryProtocol<User> {}