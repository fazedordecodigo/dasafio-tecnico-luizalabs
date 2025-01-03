import { Customer } from "@prisma/client";
import { RepositoryProtocol } from "./repository.protocol";

export interface CustomersRepositoryProtocol extends RepositoryProtocol<Customer> {}