const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Example: 1
// Remove this code and resize the window then you will observe the width of the canvas stretches from actuall width.
// window.addEventListener('resize', function() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     ctx.fillStyle = "white";
//     ctx.fillRect(10, 20, 150, 50);
// });

// ctx.fillStyle = 'white';
// ctx.fillRect(10, 20, 150, 50);

// Example: 2
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Experiment with these values. fillStyle to fill the background color of the draw object. Fill stroke is for the outline of the object.
// ctx.fillStyle = 'blue';
// ctx.strokeStyle = 'red';
// ctx.lineWidth = 2;
// ctx.beginPath(); // To begin the draw of the object.
// //ctx.arc(x, y, radius, startAngle, endAngle);
// ctx.arc(100, 100, 50 , 0, Math.PI * 2); // To draw the circle, x and y is the position of the center, and 
// ctx.fill();
// ctx.stroke();

// Example: 3
// const mouse = {
//     x: 100, 
//     y: 100,
// }

// canvas.addEventListener('click', function(dvent) {
//     console.log(event);
//     mouse.x = event.x;
//     mouse.y = event.y;
//     //drawCircle();
// });

// canvas.addEventListener('mousemove', function(event) {
//     mouse.x = event.x;
//     mouse.y = event.y;
//     //drawCircle(); 
// });

// function drawCircle() {
//     ctx.fillStyle = 'blue';
//     ctx.beginPath();
//     ctx.arc(mouse.x, mouse.y, 50, 0, Math.PI * 2);
//     ctx.fill();
// }
// drawCircle();

// function animate(){
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     drawCircle();
//     requestAnimationFrame(animate);
// }

// animate();

// Example: 4
let hue = 0;
const mouse = {
    x: 100, 
    y: 100,
}

canvas.addEventListener('click', function(dvent) {
    console.log(event);
    mouse.x = event.x;
    mouse.y = event.y;
    //drawCircle();
    for(let i=0; i< 10; i++) {
        particlesArray.push(new Particle);
    }
    
});

canvas.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    //drawCircle(); 
    for(let i=0; i< 2; i++) {
        particlesArray.push(new Particle);
    }
});
class Particle {
    constructor() {
        this.x = mouse.x;
        this.y = mouse.y;
        // this.x = Math.random() * canvas.width;
        // this.y = Math.random() * canvas.height;
        this.size = Math.random() * 15 + 1;
        this.speedX = Math.random() * 3 - 1.5;
        this.speedY = Math.random() * 3 - 1.5;
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) {
            this.size -= 0.1;
        }
    }
    draw() {
        // ctx.fillStyle = 'white';
        // ctx.fillStyle = 'hsl(' + hue + ', 100%, 50%)';
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}
const particlesArray = [];
// function init() {
//     for (let i = 0; i < 100; i++) {
//         particlesArray.push(new Particle());
//     }

// }
// init();
console.log(particlesArray);

function handleParticle() {
    for(let i=0; i< particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for(let j= i; j< particlesArray.length; j++) {
            const dx = particlesArray[i].x - particlesArray[j].x;
            const dy = particlesArray[i].y - particlesArray[j].y;

            const distance = Math.sqrt(dx*dx + dy*dy);
            if (distance < 40) {
                ctx.beginPath();
                ctx.strokeStyle = particlesArray[i].color;
                ctx.lineWidth = particlesArray[i].size /10;
                ctx.lineWidth = 0.2;
                ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
                ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            console.log(particlesArray.length);
            i--;
        }
    }
    // particlesArray.forEach(particle => {
    //     particle.update();
    //     particle.draw();
    // });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
    // ctx.fillRect(0, 0, canvas.width, canvas.height);
    handleParticle();
    hue +=5;
    requestAnimationFrame(animate);
}
animate();