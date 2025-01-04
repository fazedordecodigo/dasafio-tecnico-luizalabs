import { Entity } from "./entity";

export class User extends Entity {
  constructor(
    public email: string,
    public password: string,
    public role: string,
    id?: string
  ) {
    super(id);
  }
}