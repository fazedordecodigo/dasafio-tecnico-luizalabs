import { Customer } from "src/ports/Domain/entities/customer.entity";
import { RepositoryProtocol } from "./repository.protocol";

export interface CustomersRepositoryProtocol extends RepositoryProtocol<Customer> {}