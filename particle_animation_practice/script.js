/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = window.innerWidth;
const CANVAS_HEIGHT = canvas.height = window.innerHeight;
const particlesLength = 10;
const particlesArray = [];
function Particle(x, y, directionX, directionY, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = 'hsl(' + color + ', 100%, 50%)';
    this.directionX = directionX;
    this.directionY = directionY;
}

Particle.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
    ctx.fill();
}

Particle.prototype.update = function () {
    if (this.x + this.size > CANVAS_WIDTH || this.x - this.size <= 0) {
        this.directionX = -this.directionX;
    }
    if (this.y + this.size >= CANVAS_HEIGHT || this.y - this.size <= 0 ) {
        this.directionY = -this.directionY;
    }
    this.color = 'hsl(' + Math.floor(this.x)+ ', 100%, 50%)';
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
}

function inite() {
    for (let i=0; i< particlesLength; i++) {
        let x = Math.random() *  CANVAS_WIDTH + 1;
        let y = Math.random() *  CANVAS_HEIGHT + 1;
        let directionX = Math.random() * 2 + 0.1;
        let directionY = Math.random() * 2 + 0.1;
        let size = 60;//Math.random() * 20 + 10;
        particlesArray.push(new Particle(x, y, directionX, directionY, size, i));
    }
}
function handleParticle() {
    for(let i=0; i<particlesArray.length; i++) {
        particlesArray[i].update();
    }
}
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    handleParticle();
    requestAnimationFrame(animate);
}
inite();
animate();