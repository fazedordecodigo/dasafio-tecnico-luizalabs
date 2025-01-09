import { ProductDto } from "@adapters/dtos";
import { faker } from "@faker-js/faker/locale/pt_BR";

const id = faker.string.uuid();

export const productFaker: ProductDto = {
    id: id,
    title: faker.commerce.productName(),
    brand: faker.commerce.productDescription(),
    price: Number(faker.commerce.price()),
    image: faker.image.dataUri({type: 'svg-base64'}),
    createdAt: faker.date.recent(),
    updatedAt: undefined,
    deletedAt: undefined,
    isDeleted: false,
    reviews: [
        {
            id: faker.string.uuid(),
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            score: faker.number.float({ min: 0, max: 5 }),
            createdAt: faker.date.recent(),
            isDeleted: false,
            updatedAt: undefined,
            deletedAt: undefined,
            customer: faker.person.fullName(),
            productId: id
        },
        {
            id: faker.string.uuid(),
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            score: faker.number.float({ min: 0, max: 5 }),
            createdAt: faker.date.recent(),
            isDeleted: false,
            updatedAt: undefined,
            deletedAt: undefined,
            customer: faker.person.fullName(),
            productId: id
        }
    ]
}