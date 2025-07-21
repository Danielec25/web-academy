const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;


function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


function Particle(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size; 
}


Particle.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;

 
  const size = this.size;
  const x = this.x;
  const y = this.y - size * 0.3; 

  ctx.moveTo(x, y + size * 0.25);
  ctx.bezierCurveTo(x, y, x - size * 0.75, y, x - size * 0.75, y + size * 0.25);
  ctx.bezierCurveTo(x - size * 0.75, y + size * 0.65, x, y + size, x, y + size);
  ctx.bezierCurveTo(x, y + size, x + size * 0.75, y + size * 0.65, x + size * 0.75, y + size * 0.25);
  ctx.bezierCurveTo(x + size * 0.75, y, x, y, x, y + size * 0.25);
  
  ctx.fill();
  ctx.closePath();
};


Particle.prototype.update = function() {
  if ((this.x + this.size) >= width || (this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height || (this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};


Particle.prototype.collisionDetect = function() {
  for (let j = 0; j < particles.length; j++) {
    if (!(this === particles[j])) {
      const dx = this.x - particles[j].x;
      const dy = this.y - particles[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + particles[j].size) {
        particles[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
      }
    }
  }
};


let particles = [];

while (particles.length < 25) {
  let size = random(10, 20);
  let particle = new Particle(
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-4, 4),
    random(-4, 4),
    'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')',
    size
  );
  particles.push(particle);
}


function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for (let i = 0; i < particles.length; i++) {
    particles[i].draw();
    particles[i].update();
    particles[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

// Inicia a animação
loop();