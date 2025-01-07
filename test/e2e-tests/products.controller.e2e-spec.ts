import * as request from 'supertest';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { prismaService } from './setup-tests.e2e';
import { PrismaService } from '@adapters/services';
import { ProductsController } from '@adapters/controllers';

describe('ProductsController (e2e)', () => {
  let app: INestApplication;
  let controller: ProductsController;
  let token: string;
  const email: string = faker.internet.email();
  const password: string = faker.internet.password({ length: 32, pattern: /[A-Za-z0-9!@#$%^&*()\-_=+\[\]{};:'",.<>?/\\|`~ ]*/ });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe(
      {
        transform: true,
      }
    ));
    await app.init();

    await request(app.getHttpServer())
      .post('/users')
      .send({ email, password, role: 'ADMIN' })
      .expect(201);

    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email, password })
      .expect(201)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body).toHaveProperty('access_token');
        token = response.body.access_token;
      });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('/products (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/products')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  it('/products?take=xx&skip=xx (GET)', async () => {
    return await request(app.getHttpServer())
      .get('/products?skip=0&take=5')
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body).toBeInstanceOf(Array)
        expect(response.body.length).toBeLessThanOrEqual(5)
      });
  });

  it('/products/{id} (GET)', async () => {
    return await request(app.getHttpServer())
      .get(`/products/${process.env.ID_PRODUCT_TO_GET_TEST_E2E}`)
      .auth(token, { type: 'bearer' })
      .expect(200)
      .expect('Content-Type', /json/)
      .expect((response) => {
        expect(response.body).toHaveProperty('id')
        expect(response.body).toHaveProperty('title')
        expect(response.body).toHaveProperty('brand')
        expect(response.body).toHaveProperty('price')
        expect(response.body).toHaveProperty('image')
        expect(response.body).toHaveProperty('reviewScore')
        expect(response.body.id).toBe(process.env.ID_PRODUCT_TO_GET_TEST_E2E)
        expect(response.body.title).not.toBeNull()
        expect(response.body.brand).not.toBeNull()
        expect(response.body.price).not.toBeNull()
        expect(response.body.image).not.toBeNull()
        expect(response.body.reviewScore).not.toBeNull()
      });
  });
});
