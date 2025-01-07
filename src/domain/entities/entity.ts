import { v7 } from 'uuid';

export abstract class Entity {
    id: string = v7();
    createdAt: Date = new Date();
    updatedAt: Date | null;
    isDeleted: boolean = false;
    deletedAt: Date | null;

    constructor(id?: string) {
        if (id) {
            this.id = id;
        }
    }
}