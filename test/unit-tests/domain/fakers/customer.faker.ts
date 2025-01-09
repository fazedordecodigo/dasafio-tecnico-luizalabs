import { Customer } from "@domain/entities";
import { faker } from "@faker-js/faker/locale/pt_BR";

export const customerFaker = new Customer(
    faker.person.fullName(),
    faker.internet.email(),
)

export const customerFakerWithFavorites = {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    quantityOfFavorites: faker.number.int(10),
    favorites: [
        {
            id: faker.string.uuid(),
            title: faker.commerce.productName(),
            brand: faker.company.name(),
            price: Number(faker.commerce.price()),
            image: faker.image.dataUri({ type: 'svg-base64'}),
            averageScore: faker.number.float(5),
            quantityOfReviews: faker.number.int(10),
            reviews: [
                {
                    id: faker.string.uuid(),
                    title: faker.lorem.sentence(),
                    content: faker.lorem.paragraph(),
                    customer: faker.person.fullName(),
                    score: faker.number.float(5)
                }
            ]
        }
    ]
}