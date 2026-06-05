export class Entity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    draw(ctx, image) {
        if (!image) {
            return;
        }
        const size = 32; // Assuming 32x32 tiles
        ctx.drawImage(image, this.x * size, this.y * size, size, size);
    }
}
