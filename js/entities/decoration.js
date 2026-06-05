import { Entity } from './entity.js';

export class Decoration extends Entity {
    constructor(x, y) {
        super(x, y, 32, 32, null);
    }
}
