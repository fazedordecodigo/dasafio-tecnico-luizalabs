import { RepositoryProtocol } from "@domain/protocols";
import { Customer } from "@domain/entities";

export interface CustomersRepositoryProtocol extends RepositoryProtocol<Customer> {}