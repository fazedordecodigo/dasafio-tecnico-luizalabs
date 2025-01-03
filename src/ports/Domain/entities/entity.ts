import { randomUUID, UUID } from "node:crypto";

export abstract class Entity {
    id: UUID = randomUUID();
    createdAt: Date = new Date();
    updatedAt: Date;
    isDeleted: boolean = false;
    deletedAt: Date;
}