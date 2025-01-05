import { Product } from '@ports/domain/entities';
import { Entity } from './entity';

export class Customer extends Entity {
  public favorities?: Product[];

  constructor(
    public name: string,
    public email: string,
    id?: string,
  ) {
    super(id);
    this.name = name;
    this.email = email;
    this.favorities = [];
  }
}
