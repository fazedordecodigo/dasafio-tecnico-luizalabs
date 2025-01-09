import { Customer } from '@domain/entities';
import { faker } from '@faker-js/faker/locale/pt_BR';

describe('Customer', () => {
  let sut: Customer;
  let name: string = faker.person.fullName();
  let email: string = faker.internet.email();

  beforeEach(() => {
    sut = new Customer(name, email);
  });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    });

    it('should have a name', () => {
        expect(sut.name).toBe(name);
    });

    it('should have an email', () => {
        expect(sut.email).toBe(email);
    });

    it('should have an id', () => {
        expect(sut.id).toBeDefined();
    });

    it('should have a createdAt', () => {
        expect(sut.createdAt).toBeDefined();
    });

    it('should return false if favorite does not exist', () => {
        expect(sut.favoriteExists('1')).toBe(false);
    });

    it('should return true if favorite exists', () => {
        sut.addFavorite({ id: '1' } as any);
        expect(sut.favoriteExists('1')).toBe(true);
    });

    it('should add favorite', () => {
        sut.addFavorite({ id: '1' } as any);
        expect(sut.getFavorites()).toHaveLength(1);
    });

    it('should not add favorite if already exists', () => {
        sut.addFavorite({ id: '1' } as any);
        sut.addFavorite({ id: '1' } as any);
        expect(sut.getFavorites()).toHaveLength(1);
    });

    it('should update customer', () => {
        const newName = faker.person.fullName();
        const newEmail = faker.internet.email();
        sut.update({ name: newName, email: newEmail } as any);
        expect(sut.name).toBe(newName);
        expect(sut.email).toBe(newEmail);
    });

    it('should update updatedAt', () => {
        const updatedAt = sut.updatedAt;
        sut.update({ name, email } as any);
        expect(sut.updatedAt).not.toBe(updatedAt);
    });

    it('should not update createdAt', () => {
        const createdAt = sut.createdAt;
        sut.update({ name, email } as any);
        expect(sut.createdAt).toBe(createdAt);
    });

    it('should not update id', () => {
        const id = sut.id;
        sut.update({ name, email } as any);
        expect(sut.id).toBe(id);
    });

    it('should not update favorites', () => {
        sut.addFavorite({ id: '1' } as any);
        const favorites = sut.getFavorites();
        sut.update({ name, email } as any);
        expect(sut.getFavorites()).toBe(favorites);
    });
});
