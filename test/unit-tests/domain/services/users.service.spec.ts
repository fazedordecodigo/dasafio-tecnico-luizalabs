import { faker } from '@faker-js/faker/locale/pt_BR';
import { USER_REPOSITORY } from '@adapters/constants';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@domain/services';
import { UsersRepositoryProtocol } from '@domain/protocols';
import { userFake } from '../fakers/user.faker';
import { Result } from 'typescript-result';

describe('UsersService', () => {
  let sut: UsersService;
  let repository: UsersRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: USER_REPOSITORY,
          useValue: {
            getByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<UsersService>(UsersService);
    repository = await module.resolve<UsersRepositoryProtocol>(USER_REPOSITORY);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('getByEmail', () => {
    it('should call repository.getByEmail with correct value', async () => {
      const email = faker.internet.email();
      const spy = jest.spyOn(repository, 'getByEmail');
      await sut.getByEmail({ email });
      expect(spy).toHaveBeenCalledWith(email);
    });

    it('should return user if found', async () => {
      const expected = {
        email: userFake.email,
        role: userFake.role,
      };
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(userFake);
      const result = await sut.getByEmail({ email: userFake.email });
      expect(result.value).toEqual(expected);
    });

    it('should return error if user not found', async () => {
      const expected = {
        message: 'User not found',
      };
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(null);
      const result = await sut.getByEmail({ email: userFake.email });
      expect(result.error).toEqual(expected);
    });

    it('should return error if repository throws', async () => {
      const expected = 'Internal error';
      jest
        .spyOn(repository, 'getByEmail')
        .mockRejectedValue(new Error(expected));
      expect(async () => {
        await sut.getByEmail({ email: userFake.email });
      }).rejects.toThrow(expected);
    });
  });

  describe('create', () => {
    it('should call getByEmail once time', async () => {
      userFake.role = 'USER';
      const spy = jest.spyOn(sut, 'getByEmail');
      await sut.create({
        email: userFake.email,
        password: userFake.password,
        role: 'USER',
      });
      expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should return error if user already exists', async () => {
      userFake.role = 'USER';
      const expected = {
        message: 'User already exists',
      };
      jest
        .spyOn(sut, 'getByEmail')
        .mockResolvedValue(
          Result.ok({ email: userFake.email, role: userFake.role }),
        );
      const result = await sut.create({
        email: userFake.email,
        password: userFake.password,
        role: 'USER',
      });
      expect(result.error).toEqual(expected);
    });

    it('should return error if repository throws', async () => {
      const expected = 'Internal error';
      jest.spyOn(sut, 'getByEmail').mockRejectedValue(new Error(expected));
      expect(async () => {
        await sut.create({
          email: userFake.email,
          password: userFake.password,
          role: 'USER',
        });
      }).rejects.toThrow(expected);
    });

    it('should return error if repository.create returns null', async () => {
      const expected = {
        message: 'Error creating user',
      };
      jest.spyOn(sut, 'getByEmail').mockResolvedValue(Result.error({ message: 'User not found' }));
      jest.spyOn(repository, 'create').mockResolvedValue(null);
      const result = await sut.create({
        email: userFake.email,
        password: userFake.password,
        role: 'USER',
      });
      expect(result.error).toEqual(expected);
    });

    it('should return void if user created', async () => {
      userFake.role = 'USER';
      jest.spyOn(sut, 'getByEmail').mockResolvedValue(Result.error({ message: 'User not found' }));
      jest.spyOn(repository, 'create').mockResolvedValue(userFake);
      const result = await sut.create({
        email: userFake.email,
        password: userFake.password,
        role: 'USER',
      });
      expect(result.isOk()).toBeTruthy();
    });

  });
});
