import { CustomerDto } from "@adapters/dtos";
import { Customer as Entity, Product, Review } from "@domain/entities";
import { Customer } from "@prisma/client";

export const mapToEntity = ((data: Customer): Entity => {
    return new Entity(data.name, data.email, data.id);
});

export const mapToEntityFull = ((data: CustomerDto): Entity => {
    const customer = new Entity(data.name, data.email, data.id);
    data.favorites.map(favorite => {
        const product = new Product(
            favorite.title,
            favorite.brand,
            favorite.price,
            favorite.image,
            favorite.id,
        );
        favorite.reviews.map(review => {
            product.addReview(
                new Review(
                    review.title,
                    review.content,
                    review.customer,
                    review.score,
                    product,
                    review.id
                ),
            );
        });
        customer.addFavorite(product);
    });
    return customer;
});

export const mapToDtoCreate = ((entity: Entity) => {
    return {
        data: {
            id: entity.id,
            name: entity.name,
            email: entity.email,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
            isDeleted: entity.isDeleted,
            favorites: {
                connectOrCreate: entity.getFavorites().map(favorite => ({
                    where: { id: favorite.id },
                    create: {
                        id: favorite.id,
                        title: favorite.title,
                        brand: favorite.brand,
                        price: favorite.price,
                        image: favorite.image,
                        createdAt: favorite.createdAt,
                        isDeleted: favorite.isDeleted,
                        reviews: {
                            connectOrCreate: favorite.getReviews().map(review => ({
                                where: { id: review.id },
                                create: {
                                    id: review.id,
                                    title: review.title,
                                    content: review.content,
                                    score: review.score,
                                    customer: review.customer,
                                    productId: review.product.id,
                                    createdAt: review.createdAt,
                                    isDeleted: review.isDeleted,
                                },
                            })),
                        },
                        customers: {
                            connect: { id: entity.id }
                        }
                    }
                }))
            }
        }
    };
});