import { Customer } from "@ports/domain/entities/customer.entity";
import { RepositoryProtocol } from "@ports/application/protocols";

export interface CustomersRepositoryProtocol extends RepositoryProtocol<Customer> {}