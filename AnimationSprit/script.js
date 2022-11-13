let playerState = 'idle';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e) {
    playerState = e.target.value;
});

let canvas = document.getElementById("canvas1");
let ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = 'shadow_dog.png';
const spritWidth = 575;
const spritHeight = 523;

// let frameX = 0;
// let frameY = 0;

let grameFrame = 0;
const staggerFrames = 5;
const spritAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 7,
    },
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'getHit',
        frames: 7,
    },
];

animationStates.forEach((state, index) => {
    let frames = {
        loc: [],
    } 

    for (let j= 0; j<state.frames; j++) {
        let positionX = j * spritWidth;
        let positionY = index * spritHeight;
        frames.loc.push({x: positionX, y: positionY});
    }
    spritAnimations[state.name] = frames;
});
console.log(spritAnimations);

function animate() {
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(grameFrame / staggerFrames) % spritAnimations[playerState].loc.length;
    let frameX = spritWidth * position;
    let frameY = spritAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, spritWidth, spritHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    grameFrame++;

    // ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // //ctx.fillRect(50, 50, 100, 100);
    // // ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
    
    // let position = Math.floor(grameFrame / staggerFrames) % spritAnimations['idle'].loc.length;
    // frameX = spritWidth * position;
    // ctx.drawImage(playerImage, frameX, frameY * spritHeight, spritWidth, spritHeight, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // // if (frameX < 6) {
    // //     frameX++;
    // // } else {
    // //     frameX = 0;
    // // }
    // grameFrame++;
    requestAnimationFrame(animate);
}
animate();