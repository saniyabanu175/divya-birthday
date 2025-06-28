const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

function createParticle(x, y) {
  const size = Math.random() * 5 + 5;
  const speed = Math.random() * 3 + 2;
  const direction = Math.random() * 2 * Math.PI;

  particles.push({
    x: x,
    y: y,
    size: size,
    speed: speed,
    direction: direction,
    opacity: 1
  });
}

function updateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += Math.cos(p.direction) * p.speed;
    p.y += Math.sin(p.direction) * p.speed;
    p.opacity -= 0.02;

    if (p.opacity <= 0) {
      particles.splice(i, 1);
    }
  }
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = 'lighter';

  for (const p of particles) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.fill();
  }
}

function animate() {
  updateParticles();
  drawParticles();
  requestAnimationFrame(animate);
}

canvas.addEventListener('click', (e) => {
  for (let i = 0; i < 10; i++) {
    createParticle(e.clientX, e.clientY);
  }
});

animate();
