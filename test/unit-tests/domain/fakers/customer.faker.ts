import { Customer } from "@domain/entities";
import { faker } from "@faker-js/faker/locale/pt_BR";

export const customerFaker = new Customer(
    faker.person.fullName(),
    faker.internet.email(),
)