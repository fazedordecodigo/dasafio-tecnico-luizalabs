import { RepositoryProtocol } from "@domain/protocols";
import { CustomerDto } from "@adapters/dtos";

export interface CustomersRepositoryProtocol extends RepositoryProtocol<CustomerDto> {}