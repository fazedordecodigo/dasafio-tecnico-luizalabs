import { Customer } from "./customer.entity";
import { Entity } from "./entity";

export class Product extends Entity {
    private customers: Customer[] = [];

    constructor(
        public title: string,
        public brand: string,
        public price: number,
        public image: string,
        public reviewScore: number,
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
}
