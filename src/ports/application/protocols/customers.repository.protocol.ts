import { Customer } from "@ports/domain/entities/customer.entity";
import { RepositoryProtocol } from "./repository.protocol";

export interface CustomersRepositoryProtocol extends RepositoryProtocol<Customer> {}