import { GameScene } from './game_scene.js';
import { resources } from './resources.js';
import DataBus from './databus.js';

const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');

const databus = new DataBus();
const loadedImages = {};
const gameScene = new GameScene(loadedImages);

async function main() {
    await loadResources();
    await gameScene.loadLevel('level1');
    gameLoop();
}

async function loadResources() {
    const imagePromises = Object.entries(resources.images).map(([name, src]) => {
        return new Promise((resolve, reject) => {
            const image = wx.createImage();
            image.onload = () => {
                loadedImages[name] = image;
                resolve();
            };
            image.onerror = reject;
            image.src = src;
        });
    });

    await Promise.all(imagePromises);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameScene.update(1 / 60);
    gameScene.draw(ctx);

    if (databus.gameOver) {
        ctx.font = "16px Arial";
        ctx.fillStyle = "green";
        ctx.textAlign = "center";
        ctx.fillText("You Win!", canvas.width / 2, canvas.height / 2);
    } else {
        requestAnimationFrame(gameLoop);
    }
}

main();
