import { faker } from '@faker-js/faker/locale/pt_BR';
import { USER_REPOSITORY } from '@adapters/constants';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '@ports/application/services';
import { UsersRepositoryProtocol } from '@ports/application/protocols';

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

  describe('getById', () => {
    it('should call repository.getByEmail with correct value', async () => {
      const email = faker.internet.email()
      const spy = jest.spyOn(repository, 'getByEmail');
      await sut.getByEmail({ email });
      expect(spy).toHaveBeenCalledWith(email);
    });
  });
});
