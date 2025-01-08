import { Product } from '@domain/entities';
import { Entity } from './entity';
import { Result } from 'typescript-result';
import { Notification } from './notification.entity';

export class Customer extends Entity {
  private _favorites?: Product[] = [];
  private _favoritesRemoved: Product[] = [];


  constructor(
    public name: string,
    public email: string,
    id?: string,
  ) {
    super(id);
    this.name = name;
    this.email = email;
  }

  public addFavorite(product: Product): Result<void, Notification> {
    const exists = this._favorites.find((p) => p.id === product.id);
    if (exists) {
      return Result.error({ message: 'Product already in favorites' });
    }
    this._favorites.push(product);
    return Result.ok();
  }

  public removeFavorite(product: Product): void {
    this._favoritesRemoved.push(this._favorites.find((p) => p.id === product.id));
    this._favorites = this._favorites.filter((p) => p.id !== product.id);
  }

  public getFavorites(): Product[] {
    return this._favorites;
  }

  public update(data: Customer): void {
    this.name = data.name;
    this.email = data.email;
    this.updatedAt = new Date();
  }

  public getFavoritesRemoved(): Product[] {
    return this._favoritesRemoved;
  }
}
