import { Customer } from "@ports/domain/entities";
import { RepositoryProtocol } from "@ports/application/protocols";

export interface CustomersRepositoryProtocol extends RepositoryProtocol<Customer> {}