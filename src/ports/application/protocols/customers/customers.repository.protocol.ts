import { RepositoryProtocol } from "@ports/application/protocols";
import { CustomerDto } from "@adapters/dtos";

export interface CustomersRepositoryProtocol extends RepositoryProtocol<CustomerDto> {}