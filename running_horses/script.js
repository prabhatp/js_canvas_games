const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let gameSpeed = 0;
let timeslap = 0;
class Horse {
    constructor(x, y, directionX) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.spriteWidth = 152;
        this.spriteHeight = 145;
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 4;
        this.markDeletion = false;
        this.image = new Image();
        this.image.src = 'horse.png';
    }
    update() {
        if (gameSpeed % 15 == 0) {
            this.frameX > this.maxFrame ? this.frameX = 1 : this.frameX++;
        }
        if (gameSpeed * 2 - this.spriteWidth  > canvas.width) {
            gameSpeed = 0;
        }
        if (this.x + this.spriteWidth > canvas.width) {
            //this.x = 0;
            this.markDeletion = true;
        }
        if (timeslap % 10 == 0) {
            this.x +=this.directionX;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x * 2, this.y, 200, 200); 
    }
}


// let horse = new Horse();
let horsesArray = [];
function init() {
    let max = 500;
    let min = 0;
    let x = 0;
    let y = Math.floor(Math.random() * (max - min)) + min;
    let directionX = Math.random() + 5 + 2;
    horsesArray.push(new Horse(x, y, directionX));
    setInterval(function() {
        y = Math.floor(Math.random() * (max - min)) + min;
        directionX = Math.random() + 5 + 2;
        horsesArray.push(new Horse(x, y, directionX));
    }, 5000);
    // for(let i=0; i<10; i++) {

    // }
}
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    horsesArray.forEach(function(obj) {
        obj.update();
        obj.draw();
    })
    gameSpeed++;
    timeslap++;
    requestAnimationFrame(animate); 
}
init();
animate();
