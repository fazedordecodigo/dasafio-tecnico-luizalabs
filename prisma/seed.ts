import { v7 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';

const prisma = new PrismaClient();
async function main() {
  await prisma.customer.create({
    data: {
      id: process.env.ID_CUSTOMER_TO_GET_TEST_E2E,
      name: faker.person.fullName(),
      email: faker.internet.email(),
      createdAt: faker.date.recent(),
      isDeleted: false,
      favorites: {
        create: [
          {
            id: process.env.ID_PRODUCT_TO_GET_TEST_E2E,
            title: faker.commerce.productName(),
            brand: faker.company.name(),
            price: Number(faker.commerce.price()),
            image: faker.image.dataUri({ type: 'svg-base64' }),
            reviews: {
              create: [
                {
                  id: process.env.ID_REVIEW_TO_GET_TEST_E2E,
                  title: faker.lorem.words(),
                  content: faker.lorem.paragraph(),
                  customer: faker.person.firstName(),
                  score: Number(
                    faker.finance.amount({
                      min: 0,
                      max: 5,
                      dec: 2,
                      symbol: '',
                      autoFormat: true,
                    }),
                  ),
                  createdAt: faker.date.recent(),
                  isDeleted: false,
                },
                {
                  id: v7(),
                  title: faker.lorem.words(),
                  content: faker.lorem.paragraph(),
                  customer: faker.person.firstName(),
                  score: Number(
                    faker.finance.amount({
                      min: 0,
                      max: 5,
                      dec: 2,
                      symbol: '',
                      autoFormat: true,
                    }),
                  ),
                  createdAt: faker.date.recent(),
                  isDeleted: false,
                },
                {
                  id: v7(),
                  title: faker.lorem.words(),
                  content: faker.lorem.paragraph(),
                  customer: faker.person.firstName(),
                  score: Number(
                    faker.finance.amount({
                      min: 0,
                      max: 5,
                      dec: 2,
                      symbol: '',
                      autoFormat: true,
                    }),
                  ),
                  createdAt: faker.date.recent(),
                  isDeleted: false,
                },
              ],
            },
            createdAt: faker.date.recent(),
            isDeleted: false,
          },
        ],
      },
    },
  });
  await prisma.product.create({
    data: {
      id: process.env.ID_PRODUCT_TO_POST_TEST_E2E,
      title: faker.commerce.productName(),
      brand: faker.company.name(),
      price: Number(faker.commerce.price()),
      image: faker.image.dataUri({ type: 'svg-base64' }),
      reviews: {
        create: [
          {
            id: v7(),
            title: faker.lorem.words(),
            content: faker.lorem.paragraph(),
            customer: faker.person.firstName(),
            score: Number(
              faker.finance.amount({
                min: 0,
                max: 5,
                dec: 2,
                symbol: '',
                autoFormat: true,
              }),
            ),
            createdAt: faker.date.recent(),
            isDeleted: false,
          },
          {
            id: v7(),
            title: faker.lorem.words(),
            content: faker.lorem.paragraph(),
            customer: faker.person.firstName(),
            score: Number(
              faker.finance.amount({
                min: 0,
                max: 5,
                dec: 2,
                symbol: '',
                autoFormat: true,
              }),
            ),
            createdAt: faker.date.recent(),
            isDeleted: false,
          },
        ],
      },
      createdAt: faker.date.recent(),
      isDeleted: false,
    },
  });
  await prisma.product.create({
    data: {
      id: v7(),
      title: faker.commerce.productName(),
      brand: faker.company.name(),
      price: Number(faker.commerce.price()),
      image: faker.image.dataUri({ type: 'svg-base64' }),
      createdAt: faker.date.recent(),
      isDeleted: false,
    },
  });
  const salt = await bcrypt.genSalt();
  const password = process.env.PASSWORD_FAKE;
  await prisma.user.create({
    data: {
      id: v7(),
      email: process.env.EMAIL_FAKE,
      password: await bcrypt.hash(password, salt),
      role: 'ADMIN',
      createdAt: faker.date.recent(),
      isDeleted: false,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
