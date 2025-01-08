import request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { UsersController } from '@adapters/controllers/users.controller';
import { PrismaService } from '@adapters/services/prisma.service';
import { prismaService } from './setup-tests.e2e';
import { AppModule } from '../../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).overrideProvider(PrismaService)
      .useValue(prismaService)
      .compile();

    controller = module.get<UsersController>(UsersController);
    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
