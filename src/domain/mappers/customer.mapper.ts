import { ResponseCustomerWithFavoriteDto } from "@domain/dtos";
import { Customer } from "@domain/entities";

export const mapToDto = ((entity: Customer): ResponseCustomerWithFavoriteDto => {
    return {
        id: entity.id,
        name: entity.name,
        email: entity.email,
        quantityOfFavorites: entity.getFavorites().length,
        favorites: entity.getFavorites().map((favorite) => ({
            id: favorite.id,
            title: favorite.title,
            brand: favorite.brand,
            price: favorite.price,
            image: favorite.image,
            averageScore: favorite.getAverageScore(),
            quantityOfReviews: favorite.getReviews().length,
            reviews: favorite.getReviews().map((review) => ({
                id: review.id,
                title: review.title,
                content: review.content,
                customer: review.customer,
                score: review.score,
            })),
        })),
    };
});