import { USER_REPOSITORY, USER_SERVICE } from '@adapters/constants';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryProtocol } from '@ports/application/protocols';
import { UsersService } from '@ports/application/services';

describe('UsersService', () => {
  let sut: UsersService;
  let repository: UsersRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
            provide: USER_REPOSITORY,
            useClass: jest.fn(),
        }
      ],
    }).compile();

    sut = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepositoryProtocol>(USER_REPOSITORY);

  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });
});
