export class Camera {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    update(player, map) {
        this.x = player.x - window.innerWidth / 2;
        this.y = player.y - window.innerHeight / 2;

        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.x > map.width * 32 - window.innerWidth) {
            this.x = map.width * 32 - window.innerWidth;
        }
        if (this.y > map.height * 32 - window.innerHeight) {
            this.y = map.height * 32 - window.innerHeight;
        }
    }
}
