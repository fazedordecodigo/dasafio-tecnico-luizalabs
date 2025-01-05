import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('users/ (POST)', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "role": "USER"
       })
      .expect(201);
  });
});
