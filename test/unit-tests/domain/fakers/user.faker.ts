import { faker } from "@faker-js/faker/locale/pt_BR"
import { User } from "@domain/entities"
import { Role } from "@domain/entities/enums"

const email = faker.internet.email()
export const userFake = new User(
    email,
    faker.internet.password(),
    Role.Admin
)