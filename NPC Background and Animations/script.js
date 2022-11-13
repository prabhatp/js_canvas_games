/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 1000;
const CANVAS_HEIGHT = canvas.height = 600;

const numberOfEnemies = 10;
const enemiesArray = [];
let gameFrame = 0;
// let enemy1 = {
//     x: 50,
//     y: 50,
//     width: 200,
//     height: 200
// }

class Enemy {
    constructor() {
        this.image = new Image();
        this.image.src = 'enemy1.png';
        this.x = Math.random() * CANVAS_WIDTH;
        this.y = Math.random() * CANVAS_HEIGHT;
        this.speed = Math.random() * 4 - 2; // Random number between +2 and -2. Create random number between 0 and 4 and then set the starting point as -2 so it will become +2 to -2.
        this.spritWidth = 293;
        this.spritHeight = 155;
        this.width = this.spritWidth / 2.5;
        this.height = this.spritHeight / 2.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    }

    update() {
        this.x += this.speed;
        this.y += this.speed;
        if (gameFrame % this.flapSpeed  == 0) {
            this.frame > 4 ? this.frame = 0 : this.frame++;
        }
    }
    draw() {
        //ctx.strokeRect(this.x, this.y, this.width, this.height);
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spritWidth, 0, this.spritWidth, this.spritHeight, this.x, this.y, this.width, this.height);
    }
}
for (let i = 0; i< numberOfEnemies; i++) {
    enemiesArray.push(new Enemy());
}

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemiesArray.forEach(enemy => {
        enemy.update();
        enemy.draw();
    })
    // enemy1.update();
    // enemy2.update();

    // enemy1.draw();
    // enemy2.draw();
    // ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
    // ctx.fillRect(enemy2.x, enemy2.y, enemy2.width, enemy2.height);
    gameFrame++;
    requestAnimationFrame(animate);
}
animate();
