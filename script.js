document.addEventListener('DOMContentLoaded', function () {
    createHearts();
    createFireworks();
});

// Function to create random hearts floating across the screen
function createHearts() {
    const heartsContainer = document.querySelector('.hearts');
    const numHearts = 50;

    for (let i = 0; i < numHearts; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.style.top = `${Math.random() * 100}vh`;
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 5 + 2}s`;
        heartsContainer.appendChild(heart);
    }
}

// Function to create fireworks animation
function createFireworks() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createParticle(x, y) {
        const particle = {
            x: x,
            y: y,
            dx: random(-5, 5), // Larger spread horizontally
            dy: random(-5, 5), // Larger spread vertically
            radius: random(3, 5), // Larger particle size
            color: `hsl(${Math.random() * 360}, 100%, 50%)`,
            life: random(50, 70) // Longer particle life
        };
        particles.push(particle);
    }

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((p, index) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            p.x += p.dx;
            p.y += p.dy;
            p.life--;

            if (p.life <= 0) {
                particles.splice(index, 1);
            }
        });

        // Fireworks spread across the entire width and height
        if (Math.random() > 0.92) { // More frequent explosions
            const x = random(0, canvas.width); // Randomize X position
            const y = random(0, canvas.height); // Randomize Y position
            for (let i = 0; i < 150; i++) { // More particles per explosion
                createParticle(x, y);
            }
        }

        requestAnimationFrame(animateFireworks);
    }

    animateFireworks();
}
