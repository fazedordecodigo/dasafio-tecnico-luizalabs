import { CustomersController } from "@adapters/controllers";
import { PrismaService } from "@adapters/services";
import { faker } from "@faker-js/faker/locale/pt_BR";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../src/app.module";
import { prismaService } from "./setup-tests.e2e";
import request from 'supertest';

describe('CustomersController (e2e)', () => {
    let app: INestApplication;
    let controller: CustomersController;
    let token: string;

    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        imports: [AppModule],
      })
        .overrideProvider(PrismaService)
        .useValue(prismaService)
        .compile();

      controller = module.get<CustomersController>(CustomersController);
      app = module.createNestApplication();
      app.useGlobalPipes(new ValidationPipe(
        {
          transform: true,
        }
      ));
      await app.init();

      await request(app.getHttpServer())
        .post('/auth/login')
        .send({ email: process.env.EMAIL_FAKE, password: process.env.PASSWORD_FAKE })
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

    it('/customers (POST)', async () => {
      return await request(app.getHttpServer())
        .post('/customers')
        .auth(token, { type: 'bearer' })
        .send({ name: faker.person.fullName(), email: faker.internet.email() })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect((response) => {
          expect(response.body).toHaveProperty('id');
        });
    });

    it('/customers (GET)', async () => {
      return await request(app.getHttpServer())
        .get('/customers')
        .auth(token, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((response) => {
          expect(response.body).toBeInstanceOf(Array);
        });
    });

    it('/customers/{id} (GET)', async () => {
      return await request(app.getHttpServer())
        .get(`/customers/${process.env.ID_CUSTOMER_TO_GET_TEST_E2E}`)
        .auth(token, { type: 'bearer' })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((response) => {
          expect(response.body).toHaveProperty('id');
        });
    });

    it('/customers/{id}/favorites (POST)', async () => {
      return await request(app.getHttpServer())
        .post(`/customers/${process.env.ID_CUSTOMER_TO_GET_TEST_E2E}/favorites`)
        .auth(token, { type: 'bearer' })
        .send({ id: `${process.env.ID_PRODUCT_TO_POST_TEST_E2E}` })
        .expect(201)
        .expect('Content-Type', /json/)
        .expect((response) => {
          expect(response.body).toHaveProperty('id');
        });
    });

    it('/customers/{id}/favorites (PATCH)', async () => {
      return await request(app.getHttpServer())
        .patch(`/customers/${process.env.ID_CUSTOMER_TO_GET_TEST_E2E}/favorites`)
        .auth(token, { type: 'bearer' })
        .send({ id: `${process.env.ID_PRODUCT_TO_GET_TEST_E2E}` })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((response) => {
          expect(response.body).toHaveProperty('id');
        });
    });

    it('/customers/{id} (PATCH)', async () => {
      return await request(app.getHttpServer())
        .patch(`/customers/${process.env.ID_CUSTOMER_TO_GET_TEST_E2E}`)
        .auth(token, { type: 'bearer' })
        .send({ name: faker.person.fullName(), email: faker.internet.email() })
        .expect(200)
        .expect('Content-Type', /json/)
        .expect((response) => {
          expect(response.body).toHaveProperty('id');
        });
    });

    it('/customers/{id} (DELETE)', async () => {
      return await request(app.getHttpServer())
        .delete(`/customers/${process.env.ID_CUSTOMER_TO_GET_TEST_E2E}`)
        .auth(token, { type: 'bearer' })
        .expect(200);
    });
});