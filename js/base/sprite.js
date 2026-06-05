import { gridToPixel } from './utils.js';

export class Sprite {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, image) {
        const { x, y } = gridToPixel(this.x, this.y);
        ctx.drawImage(image, x, y, 32, 32);
    }
}
