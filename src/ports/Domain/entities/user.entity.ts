import { Entity } from "./entity";

export class User extends Entity {
  email: string;
  password: string;
  profile: string;
}