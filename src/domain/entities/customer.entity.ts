import { Product } from '@domain/entities';
import { Entity } from './entity';

export class Customer extends Entity {
  public favorities?: Product[] = [];

  constructor(
    public name: string,
    public email: string,
    id?: string,
  ) {
    super(id);
    this.name = name;
    this.email = email;
  }

  public addFavorite(product: Product): void {
    const exists = this.favorities.find((p) => p.id === product.id);
    if (exists) {
      return;
    }
    this.favorities.push(product);
  }

  public removeFavorite(product: Product): void {
    this.favorities = this.favorities.filter((p) => p.id !== product.id);
  }

  public getFavorites(): Product[] {
    return this.favorities;
  }

  public update(data: Customer): void {
    this.name = data.name;
    this.email = data.email;
  }
}
