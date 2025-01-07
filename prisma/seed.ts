import { v7 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { env } from 'process';

const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        id: process.env.ID_PRODUCT_TO_GET_TEST_E2E,
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        price: Number(faker.commerce.price()),
        image: faker.image.dataUri({ type: 'svg-base64' }),
        reviewScore: Number(
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
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        price: Number(faker.commerce.price()),
        image: faker.image.dataUri({ type: 'svg-base64' }),
        reviewScore: Number(
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
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        price: Number(faker.commerce.price()),
        image: faker.image.dataUri({ type: 'svg-base64' }),
        reviewScore: Number(
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
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        price: Number(faker.commerce.price()),
        image: faker.image.dataUri({ type: 'svg-base64' }),
        reviewScore: Number(
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
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        price: Number(faker.commerce.price()),
        image: faker.image.dataUri({ type: 'svg-base64' }),
        reviewScore: Number(
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
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        price: Number(faker.commerce.price()),
        image: faker.image.dataUri({ type: 'svg-base64' }),
        reviewScore: Number(
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
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        price: Number(faker.commerce.price()),
        image: faker.image.dataUri({ type: 'svg-base64' }),
        reviewScore: Number(
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
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        price: Number(faker.commerce.price()),
        image: faker.image.dataUri({ type: 'svg-base64' }),
        reviewScore: Number(
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
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        price: Number(faker.commerce.price()),
        image: faker.image.dataUri({ type: 'svg-base64' }),
        reviewScore: Number(
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
        title: faker.commerce.productName(),
        brand: faker.company.name(),
        price: Number(faker.commerce.price()),
        image: faker.image.dataUri({ type: 'svg-base64' }),
        reviewScore: Number(
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
  });
  const salt = await bcrypt.genSalt();
  const password = faker.internet.password();
  const user = await prisma.user.create({
    data: {
      id: v7(),
      email: faker.internet.email(),
      password: await bcrypt.hash(password, salt),
      role: 'ADMIN',
      createdAt: faker.date.recent(),
      isDeleted: false,
    },
  });
  console.log(user, `password para acesso: ${password}`);
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
