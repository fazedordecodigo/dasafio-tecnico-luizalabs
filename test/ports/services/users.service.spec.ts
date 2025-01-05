import { faker } from '@faker-js/faker/locale/pt_BR';
import { USER_REPOSITORY } from '@adapters/constants';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@ports/application/services';
import { UsersRepositoryProtocol } from '@ports/application/protocols';
import { User } from '@ports/domain/entities';
import { Role } from '@ports/domain/entities/enums';

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
                getByEmail: jest.fn()
            }
        }
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
      const email = faker.internet.email()
      const spy = jest.spyOn(repository, 'getByEmail');
      await sut.getByEmail({ email });
      expect(spy).toHaveBeenCalledWith(email);
    });

    it('should return user if found', async () => {
      const email = faker.internet.email()
      const user = new User(
        email,
        faker.internet.password(),
        Role.Admin
      )
      const expected = {
        email: user.email,
        role: user.role
      }
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(user);
      const result = await sut.getByEmail({ email });
      expect(result.value).toEqual(expected);
    });

    it('should return error if user not found', async () => {
      const email = faker.internet.email()
      const expected = {
        message: 'User not found'
      }
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(null);
      const result = await sut.getByEmail({ email });
      expect(result.error).toEqual(expected);
    });

    it('should return error if repository throws', async () => {
      const email = faker.internet.email();
      const expected = 'Internal error';
      jest.spyOn(repository, 'getByEmail').mockRejectedValue(new Error(expected));
      expect(async () => {
        await sut.getByEmail({ email });
      }).rejects.toThrow(expected);
    });
  });
});
