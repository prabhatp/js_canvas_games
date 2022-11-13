window.addEventListener('load', function(){
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            // this.x = Math.random() * this.effect.width;
            // this.y = Math.random() * this.effect.height;
            // this.x =x;
            // this.y = y; 
            this.x = Math.random() * this.effect.width * 5;
            this.y = Math.random() * this.effect.height * 5;
            // this.x = 0;
            // this.y = 0;

            this.originX = Math.floor(x);
            this.originY = Math.floor(y);
            this.color = color;
            
            this.size = this.effect.gap;
            // this.vx = Math.random() * 2 - 1;
            // this.vy = Math.random() * 2 - 1;
            this.vx = 0;
            this.vy = 0;
            this.ease = 0.01;
        }

        draw(context) {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, this.size, this.size);
        }
        update(){
            this.x += (this.originX - this.x) * this.ease;
            this.y += (this.originY - this.y) * this.ease;

            // this.x += this.vx;
            // this.y += this.vy;
            // if (this.x < 0 || this.x > canvas.width ) {
            //     this.vx = -this.vx;
            // }
            // if (this.y < 0 || this.y > canvas.height ) {
            //     this.vy = -this.vy;
            // }
        }
    }
    
    class Effect {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particlesArray= [];
            this.image = document.getElementById('image1');
            this.centerX = this.width * 0.5;
            this.centerY = this.height * 0.5;
            this.x = this.centerX - this.image.width * 0.5;
            this.y = this.centerY - this.image.height * 0.5;
            
            this.gap = 5;
        }
        
        init(context) {
            context.drawImage(this.image, this.x, this.y);
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            // console.log(pixels);
            
            for (let y = 0; y < this.height; y += this.gap) {
                for (let x = 0; x < this.width ; x += this.gap) {
                    const index = (y * this.width + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = 'rgb(' + red + ',' + green + ',' + blue +')';
                    if (alpha > 0) {
                        this.particlesArray.push(new Particle(this, x, y, color));
                    }
                }
            }
            
            // for (let i= 0; i< 100; i++) {
            //     this.particlesArray.push(new Particle(this));
            // }
        }
        draw(context) {
            this.particlesArray.forEach(function(particle) {
                particle.draw(context);
            });
            // context.drawImage(this.image, this.x, this.y);
        }
        update() {
            this.particlesArray.forEach(function(particle) {
                particle.update();
            });
        }
    }
    const effect= new Effect(canvas.width, canvas.height);
    effect.init(ctx);
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }
    animate();
    // ctx.fillRect(120, 150, 100, 200);
    // ctx.drawImage(images, 100, 200, 400, 300);
});