import { Product } from '@domain/entities';
import { Entity } from './entity';

export class Customer extends Entity {
  private _favorites?: Product[] = [];

  constructor(
    public name: string,
    public email: string,
    id?: string,
  ) {
    super(id);
    this.name = name;
    this.email = email;
  }

  public favoriteExists(id: string): boolean {
    return this._favorites?.some((favorite) => favorite.id === id) ?? false;
  }

  public addFavorite(product: Product): void {
    if (!this.favoriteExists(product.id)) {
      this._favorites.push(product);
    }
  }

  public getFavorites(): Product[] {
    return this._favorites;
  }

  public update(data: Customer): void {
    this.name = data.name;
    this.email = data.email;
    this.updatedAt = new Date();
  }
}
