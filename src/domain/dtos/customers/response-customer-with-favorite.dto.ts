export interface ResponseCustomerWithFavoriteDto {
    id: string;
    name: string;
    email: string;
    quantityOfFavorites: number;
    favorites: {
        id: string;
        title: string;
        brand: string;
        price: number;
        image: string;
        averageScore: number;
        quantityOfReviews: number;
        reviews: {
            id: string;
            title: string;
            content: string;
            customer: string;
            score: number;
        }[]
    }[]
}