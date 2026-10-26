// shaking the main board when explosions occur
let boardShakeTimeLeft = 0;       // ms remaining for shake
let boardShakeMagnitude = 6;      // maximum shake offset in pixels
let originalCanvasTransform = '';
// Initialize particle object 
class Particle {
    constructor(x, y, color, radius) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        // Firework effect: random direction and much higher speed for a sharper burst
        const angle = Math.random() * 2 * Math.PI;
        // base speed is now larger so debris shoots out aggressively
        const baseSpeed = 1200; // units/sec
        const speed = baseSpeed + Math.random() * baseSpeed; // 1200–2400 units/sec
        this.speedX = Math.cos(angle) * speed;
        this.speedY = Math.sin(angle) * speed;
        this.gravity = 0; // No gravity for firework effect
        this.alpha = 1;
        // fade completely in about 0.4 seconds
        const explosionDuration = 0.4; // seconds
        this.fadeRate = 1 / explosionDuration; // alpha per second
        this.restitution = 0.3; // Bounce energy retention
        // Store origin to limit how far particles can travel from explosion
        this.originX = x;
        this.originY = y;
        this.maxDistance = 80; // allow particles to spread a bit further
    }
    update(deltaTime) {
        // Convert deltaTime to seconds for easier calculations
        const dt = deltaTime / 1000;
        const containerWidth = explosionCanvas.width;
        const containerHeight = explosionCanvas.height;
        // No gravity: particles move in their initial direction
        // Apply air resistance to slow down
        this.speedX *= Math.pow(0.88, dt * 60);
        this.speedY *= Math.pow(0.88, dt * 60);
        // Update position
        let newX = this.x + this.speedX * dt;
        let newY = this.y + this.speedY * dt;
        // Handle horizontal bounds (bounce)
        if (newX - this.radius < 0) {
            newX = this.radius;
            this.speedX = Math.abs(this.speedX) * this.restitution;
        } else if (newX + this.radius > containerWidth) {
            newX = containerWidth - this.radius;
            this.speedX = -Math.abs(this.speedX) * this.restitution;
        }
        // Handle vertical bounds (bounce)
        if (newY - this.radius < 0) {
            newY = this.radius;
            this.speedY = Math.abs(this.speedY) * this.restitution;
        } else if (newY + this.radius > containerHeight) {
            newY = containerHeight - this.radius;
            this.speedY = -Math.abs(this.speedY) * this.restitution;
        }

        // Clamp particle to a max distance from its origin so it stays near the explosion
        const dx = newX - this.originX;
        const dy = newY - this.originY;
        const dist = Math.hypot(dx, dy);
        if (dist > this.maxDistance) {
            const nx = dx / dist;
            const ny = dy / dist;
            newX = this.originX + nx * this.maxDistance;
            newY = this.originY + ny * this.maxDistance;
            // Dampen velocity so particle stays near the limit
            this.speedX *= 0.2;
            this.speedY *= 0.2;
        }
        // Update position after collision checks
        this.x = newX;
        this.y = newY;
        // Update alpha
        this.alpha -= this.fadeRate * dt;
        // Draw the particle
        exCtx.globalAlpha = this.alpha;
        exCtx.drawImage(this.color, this.x - this.radius, this.y - this.radius, this.radius, this.radius);
        exCtx.globalAlpha = 1;
    }
}
let particles = [];
// Generate a new set of particles for the explosion
function createExplosion(x, y, width, height, color) {
    // create a larger burst of pieces to feel more explosive
    const particleCount = 16;
    const offsetX = x + canvasOffsetX;
    const offsetY = y + canvasOffsetY;
    const particlesPerRow = Math.ceil(Math.sqrt(particleCount));
    const particlesPerColumn = Math.ceil(particleCount / particlesPerRow);
    const xSpacing = width / particlesPerRow;
    const ySpacing = height / particlesPerColumn;
    for (let row = 0; row < particlesPerColumn; row++) {
        for (let col = 0; col < particlesPerRow; col++) {
            const particleX = offsetX + col * xSpacing + xSpacing / 2;
            const particleY = offsetY + row * ySpacing + ySpacing / 2;
            const radius = blockSize / particlesPerRow / 2;
            particles.push(new Particle(particleX, particleY, color, radius));
        }
    }

    // Trigger board shake for a short duration
    if (!originalCanvasTransform) {
        // capture whatever transform is currently applied (CSS or inline)
        originalCanvasTransform = canvas.style.transform || window.getComputedStyle(canvas).transform;
    }
    boardShakeTimeLeft = 400; // milliseconds

    // Start animation with proper timing
    lastFrameTime = performance.now();
    requestAnimationFrame(animateParticles);
}

function animateParticles(currentTime) {
    // Calculate deltaTime
    const deltaTime = currentTime - lastFrameTime;
    lastFrameTime = currentTime;
    const particlesToRemove = [];
    exCtx.clearRect(0, 0, explosionCanvas.width, explosionCanvas.height);
    // Update particles with deltaTime
    particles.forEach((particle, index) => {
        particle.update(deltaTime);
        if (particle.alpha <= 0.02) {
            particlesToRemove.push(index);
        }
    });
    // Remove dead particles
    particlesToRemove.reverse().forEach((index) => {
    particles.splice(index, 1);
    });
    // update board shake effect if active
    if (boardShakeTimeLeft > 0) {
        boardShakeTimeLeft -= deltaTime;
        const shakeX = (Math.random() * 2 - 1) * boardShakeMagnitude;
        const shakeY = (Math.random() * 2 - 1) * boardShakeMagnitude;
        // prepend shake to original transform
        canvas.style.transform = `translate(${shakeX}px, ${shakeY}px) ${originalCanvasTransform}`;
        if (boardShakeTimeLeft <= 0) {
            // restore original transform exactly
            canvas.style.transform = originalCanvasTransform;
        }
    }

    if (particles.length > 0) {
        requestAnimationFrame(animateParticles);
    }
} 