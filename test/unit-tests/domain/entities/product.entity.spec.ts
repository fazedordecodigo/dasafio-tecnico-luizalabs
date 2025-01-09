import { Product } from "@domain/entities";
import { faker } from "@faker-js/faker/locale/pt_BR";

describe('Product', () => {
    let sut: Product;
    let title: string = faker.commerce.productName();
    let brand: string = faker.company.name();
    let price: number = Number(faker.commerce.price());
    let image: string = faker.image.dataUri({type: 'svg-base64'});

    beforeEach(() => {
      sut = new Product(title, brand, price, image);
    });

    it('should be defined', () => {
        expect(sut).toBeDefined();
    })

    it('should have a title', () => {
        expect(sut.title).toBe(title);
    });

    it('should have a brand', () => {
        expect(sut.brand).toBe(brand);
    });

    it('should have a price', () => {
        expect(sut.price).toBe(price);
    });

    it('should have an image', () => {
        expect(sut.image).toBe(image);
    });

    it('should have an id', () => {
        expect(sut.id).toBeDefined();
    });

    it('should have a createdAt', () => {
        expect(sut.createdAt).toBeDefined();
    });

    it('should add customer', () => {
        sut.addCustomer({ id: '1' } as any);
        expect(sut.getCustomers()).toHaveLength(1);
    });

    it('should not add customer if already exists', () => {
        sut.addCustomer({ id: '1' } as any);
        sut.addCustomer({ id: '1' } as any);
        expect(sut.getCustomers()).toHaveLength(1);
    });

    it('should remove customer', () => {
        sut.addCustomer({ id: '1' } as any);
        sut.removeCustomer({ id: '1' } as any);
        expect(sut.getCustomers()).toHaveLength(0);
    });

    it('should add review', () => {
        sut.addReview({ id: '1' } as any);
        expect(sut.getReviews()).toHaveLength(1);
    });

    it('should not add review if already exists', () => {
        sut.addReview({ id: '1' } as any);
        sut.addReview({ id: '1' } as any);
        expect(sut.getReviews()).toHaveLength(1);
    });

    it('should remove review', () => {
        sut.addReview({ id: '1' } as any);
        sut.removeReview({ id: '1' } as any);
        expect(sut.getReviews()).toHaveLength(0);
    });

    it('should get average score', () => {
        sut.addReview({ id: '1', score: 5 } as any);
        sut.addReview({ id: '2', score: 3 } as any);
        expect(sut.getAverageScore()).toBe(4);
    });

    it('should return 0 if there are no reviews', () => {
        expect(sut.getAverageScore()).toBe(0);
    });

});