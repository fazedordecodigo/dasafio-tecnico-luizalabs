import { CUSTOMER_REPOSITORY, PRODUCT_REPOSITORY } from '@adapters/constants';
import {
  CustomersRepositoryProtocol,
  ProductsRepositoryProtocol,
} from '@domain/protocols';
import { CustomersService } from '@domain/services';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Test, TestingModule } from '@nestjs/testing';
import { customerFaker } from '../fakers/customer.faker';
import { productFaker } from '../fakers/product.faker';
import { Product } from '@domain/entities';
import { mapToDto } from '@domain/mappers';
import { Result } from 'typescript-result';

describe('CustomersService', () => {
  let sut: CustomersService;
  let repository: CustomersRepositoryProtocol;
  let productRepository: ProductsRepositoryProtocol;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CustomersService,
        {
          provide: CUSTOMER_REPOSITORY,
          useValue: {
            getByEmail: jest.fn(),
            getById: jest.fn(),
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
            removeFavorite: jest.fn(),
            addFavorite: jest.fn(),
          },
        },
        {
          provide: PRODUCT_REPOSITORY,
          useValue: {
            getAll: jest.fn(),
            getById: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<CustomersService>(CustomersService);
    repository =
      await module.resolve<CustomersRepositoryProtocol>(CUSTOMER_REPOSITORY);
    productRepository =
      await module.resolve<ProductsRepositoryProtocol>(PRODUCT_REPOSITORY);
  });

  it('should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('getByEmail', () => {
    it('should call repository.getByEmail with correct value', async () => {
      const email = faker.internet.email();
      const spy = jest.spyOn(repository, 'getByEmail');
      await sut.getByEmail(email);
      expect(spy).toHaveBeenCalledWith(email);
    });

    it('should return customer if found', async () => {
      const expected = {
        id: customerFaker.id,
        name: customerFaker.name,
        email: customerFaker.email,
      };
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(customerFaker);
      const result = await sut.getByEmail(faker.internet.email());
      expect(result.value).toEqual(expected);
    });

    it('should return error if customer not found', async () => {
      const expected = {
        message: 'Customer not found',
      };
      jest.spyOn(repository, 'getByEmail').mockResolvedValue(null);
      const result = await sut.getByEmail(faker.internet.email());
      expect(result.error).toEqual(expected);
    });
  });

  describe('removeFavorite', () => {
    it('should call repository.getById with correct value', async () => {
      const id = faker.string.uuid();
      const favorite = {
        id: faker.string.uuid(),
      };
      const spy = jest.spyOn(repository, 'getById');
      await sut.removeFavorite(id, favorite);
      expect(spy).toHaveBeenCalledWith(id);
    });

    it('should return error if customer not found', async () => {
      const expected = {
        message: 'Customer not found',
      };
      jest.spyOn(repository, 'getById').mockResolvedValue(null);
      const result = await sut.removeFavorite(faker.string.uuid(), {
        id: faker.string.uuid(),
      });
      expect(result.error).toEqual(expected);
    });

    it('should call productRepository.getById with correct value', async () => {
      const id = faker.string.uuid();
      const favorite = {
        id: faker.string.uuid(),
      };
      const spy = jest.spyOn(productRepository, 'getById');
      jest.spyOn(repository, 'getById').mockResolvedValue(customerFaker);
      await sut.removeFavorite(id, favorite);
      expect(spy).toHaveBeenCalledWith(favorite.id);
    });

    it('should return error if product not exists', async () => {
      const expected = {
        message: 'Product not exists',
      };
      jest.spyOn(repository, 'getById').mockResolvedValue(customerFaker);
      jest.spyOn(productRepository, 'getById').mockResolvedValue(null);
      const result = await sut.removeFavorite(faker.string.uuid(), {
        id: faker.string.uuid(),
      });
      expect(result.error).toEqual(expected);
    });

    it('should return error if product not exists in favorites', async () => {
      const expected = {
        message: 'Product not exists in favorites',
      };
      jest.spyOn(repository, 'getById').mockResolvedValue(customerFaker);
      jest.spyOn(productRepository, 'getById').mockResolvedValue(productFaker);
      const result = await sut.removeFavorite(faker.string.uuid(), {
        id: faker.string.uuid(),
      });
      expect(result.error).toEqual(expected);
    });

    it('should call repository.removeFavorite with correct values', async () => {
      const id = customerFaker.id;
      const favorite = {
        id: productFaker.id,
      };
      const product = new Product(
        productFaker.title,
        productFaker.brand,
        productFaker.price,
        productFaker.image,
        productFaker.id,
      );
      customerFaker.addFavorite(product);
      const spy = jest.spyOn(repository, 'removeFavorite');
      jest.spyOn(repository, 'getById').mockResolvedValue(customerFaker);
      jest.spyOn(productRepository, 'getById').mockResolvedValue(productFaker);
      await sut.removeFavorite(id, favorite);
      expect(spy).toHaveBeenCalledWith(id, favorite.id);
    });
  });

  describe('getById', () => {
    it('should call repository.getById with correct value', async () => {
      const id = faker.string.uuid();
      const spy = jest.spyOn(repository, 'getById');
      await sut.getById(id);
      expect(spy).toHaveBeenCalledWith(id);
    });

    it('should return customer if found', async () => {
      const expected = mapToDto(customerFaker);
      jest.spyOn(repository, 'getById').mockResolvedValue(customerFaker);
      const result = await sut.getById(customerFaker.id);
      expect(result.value).toEqual(expected);
    });

    it('should return error if customer not found', async () => {
      const expected = {
        message: 'Customer not found',
      };
      jest.spyOn(repository, 'getById').mockResolvedValue(null);
      const result = await sut.getById(faker.string.uuid());
      expect(result.error).toEqual(expected);
    });

    it('should return error if repository throws', async () => {
      const expected = {
        message: 'Error fetching customer',
      };
      jest
        .spyOn(repository, 'getById')
        .mockRejectedValue(new Error('Internal error'));
      const result = await sut.getById(faker.string.uuid());
      expect(result.error).toEqual(expected);
    });
  });

  describe('getAll', () => {
    it('should call repository.getAll', async () => {
      const spy = jest.spyOn(repository, 'getAll');
      await sut.getAll({ take: 10, skip: 0 });
      expect(spy).toHaveBeenCalled();
    });

    it('should return customers if found', async () => {
      const expected = [
        {
          id: customerFaker.id,
          name: customerFaker.name,
          email: customerFaker.email,
        },
      ];
      jest.spyOn(repository, 'getAll').mockResolvedValue([customerFaker]);
      const result = await sut.getAll({ take: 10, skip: 0 });
      expect(result.value).toEqual(expected);
    });

    it('should return error if repository throws', async () => {
      const expected = {
        message: 'Error fetching customers',
      };
      jest
        .spyOn(repository, 'getAll')
        .mockRejectedValue(new Error('Internal error'));
      const result = await sut.getAll({ take: 10, skip: 0 });
      expect(result.error).toEqual(expected);
    });
  });

  describe('create', () => {
    it('should call repository.create with correct value', async () => {
      const data = {
        name: faker.person.fullName(),
        email: faker.internet.email(),
      };
      const spy = jest.spyOn(repository, 'create');
      jest
        .spyOn(sut, 'getByEmail')
        .mockResolvedValue(Result.error({ message: 'Customer not found' }));
      await sut.create(data);
      expect(spy).toHaveBeenCalled();
    });

    it('should return customer if created', async () => {
      const expected = {
        id: customerFaker.id,
        name: customerFaker.name,
        email: customerFaker.email,
      };
      jest.spyOn(sut, 'getByEmail').mockResolvedValue(Result.error({ message: 'Customer not found' }));
      jest.spyOn(repository, 'create').mockResolvedValue(customerFaker);
      const result = await sut.create({
        name: customerFaker.name,
        email: customerFaker.email,
      });
      expect(result.value).toEqual(expected);
    });

    it('should return error if customer already exists', async () => {
      const expected = {
        message: 'Customer already exists',
      };
        jest
            .spyOn(sut, 'getByEmail')
            .mockResolvedValue(Result.ok(customerFaker));
      jest.spyOn(repository, 'create').mockResolvedValue(null);
      const result = await sut.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      });
      expect(result.error).toEqual(expected);
    });

    it('should return error if repository throws', async () => {
      const expected = {
        message: 'Error creating customer',
      };
      jest
        .spyOn(repository, 'create')
        .mockRejectedValue(new Error('Internal error'));
      const result = await sut.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
      });
      expect(result.error).toEqual(expected);
    });
  });
});
