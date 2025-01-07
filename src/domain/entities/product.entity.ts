import { Customer } from "./customer.entity";
import { Entity } from "./entity";
import { Review } from "./review.entity";

export class Product extends Entity {
    private customers: Customer[] = [];
    private reviews: Review[] = [];

    constructor(
        public title: string,
        public brand: string,
        public price: number,
        public image: string,
        id?: string
    ) {
        super(id);
    }

    public addCustomer(customer: Customer): void {
        const exists = this.customers.find((c) => c.id === customer.id);
        if (exists) {
            return;
        }
        this.customers.push(customer);
    }

    public removeCustomer(customer: Customer): void {
        this.customers = this.customers.filter((c) => c.id !== customer.id);
    }

    public getCustomers(): Customer[] {
        return this.customers;
    }

    public addReview(review: Review): void {
        const exists = this.reviews.find((r) => r.id === review.id);
        if (exists) {
            return;
        }
        this.reviews.push(review);
    }

    public removeReview(review: Review): void {
        this.reviews = this.reviews.filter((r) => r.id !== review.id);
    }

    public getReviews(): Review[] {
        return this.reviews;
    }

    public getAverageScore(): number {
        if (this.reviews.length === 0) {
            return 0;
        }
        const totalScore = this.reviews.reduce((acc, review) => acc + review.score, 0);
        return totalScore / this.reviews.length;
    }
}
