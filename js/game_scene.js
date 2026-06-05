import { Player } from './entities/player.js';
import { Wall } from './entities/wall.js';
import { Floor } from './entities/floor.js';
import { Box } from './entities/box.js';
import { Target } from './entities/target.js';
import { Decoration } from './entities/decoration.js'; // Import Decoration
import { resources } from './resources.js';
import DataBus from './databus.js';

const databus = new DataBus();

export class GameScene {
    constructor(loadedImages) {
        this.entities = [];
        this.player = null;
        this.level = null;
        this.isMoving = false;
        this.loadedImages = loadedImages;
        this.initInput();
    }

    initInput() {
        wx.onKeyDown((e) => {
            if (this.isMoving || databus.gameOver) {
                return;
            }

            let dx = 0;
            let dy = 0;

            switch (e.keyCode) {
                case 38: // ArrowUp
                    dy = -1;
                    break;
                case 40: // ArrowDown
                    dy = 1;
                    break;
                case 37: // ArrowLeft
                    dx = -1;
                    break;
                case 39: // ArrowRight
                    dx = 1;
                    break;
                default:
                    return;
            }

            if (dx !== 0 || dy !== 0) {
                this.movePlayer(dx, dy);
            }
        });
    }

    movePlayer(dx, dy) {
        const newX = this.player.x + dx;
        const newY = this.player.y + dy;

        if (this.isWall(newX, newY)) {
            return;
        }

        const box = this.getBoxAt(newX, newY);
        if (box) {
            const nextBoxX = newX + dx;
            const nextBoxY = newY + dy;
            if (this.isWall(nextBoxX, nextBoxY) || this.getBoxAt(nextBoxX, nextBoxY)) {
                return;
            }
            box.x = nextBoxX;
            box.y = nextBoxY;
        }

        this.player.x = newX;
        this.player.y = newY;
        
        this.isMoving = true;
        setTimeout(() => {
            this.isMoving = false;
        }, 100);
    }

    isWall(x, y) {
        return this.entities.some(entity => entity instanceof Wall && entity.x === x && entity.y === y);
    }
    
    getBoxAt(x, y) {
        return this.entities.find(entity => entity instanceof Box && entity.x === x && entity.y === y);
    }

    checkWinCondition() {
        const boxes = this.entities.filter(e => e instanceof Box);
        const targets = this.entities.filter(e => e instanceof Target);

        if (boxes.length === 0 || boxes.length !== targets.length) {
            return false;
        }

        return boxes.every(box => {
            return targets.some(target => target.x === box.x && target.y === box.y);
        });
    }

    async loadLevel(level) {
        const levelData = require(`../levels/${level}.json`);
        this.level = levelData;

        this.entities = [];
        this.player = null;

        for (let y = 0; y < this.level.length; y++) {
            for (let x = 0; x < this.level[y].length; x++) {
                const tile = this.level[y][x];
                if (tile === 1) {
                    this.entities.push(new Wall(x, y));
                } else if (tile === 2) {
                    this.player = new Player(x, y);
                    this.entities.push(new Floor(x, y)); // Floor under the player
                } else if (tile === 3) {
                    this.entities.push(new Box(x, y));
                    this.entities.push(new Floor(x, y)); // Floor under the box
                } else if (tile === 4) {
                    this.entities.push(new Target(x, y));
                } else if (tile === 5) { // Decoration tile
                    this.entities.push(new Decoration(x, y));
                } else {
                    this.entities.push(new Floor(x, y));
                }
            }
        }
    }

    update(dt) {
        if (databus.gameOver) {
            return;
        }

        if (this.checkWinCondition()) {
            databus.gameOver = true;
        }
    }

    draw(ctx) {
        // Separate drawing for different layers if needed, for now, one loop is fine
        this.entities.sort((a, b) => a.y - b.y); // Simple sort for some pseudo-3D effect

        for (const entity of this.entities) {
            entity.draw(ctx, this.getImage(entity));
        }
        if (this.player) {
            this.player.draw(ctx, this.getImage(this.player));
        }
    }

    getImage(entity) {
        if (entity instanceof Player) {
            return this.loadedImages.player;
        }
        if (entity instanceof Wall) {
            return this.loadedImages.wall;
        }
        if (entity instanceof Floor) {
            return this.loadedImages.floor;
        }
        if (entity instanceof Box) {
            return this.loadedImages.box;
        }
        if (entity instanceof Target) {
            return this.loadedImages.target;
        }
        if (entity instanceof Decoration) { // Get image for Decoration
            return this.loadedImages.tree;
        }
    }
}
