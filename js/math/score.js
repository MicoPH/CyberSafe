
let lastFrameTime = 0;
let score2 = 0;
let displayedScore = 0; // For smooth counter animation
let scoreAnimationStart = 0;
let scoreAnimationTarget = 0;
let scoreAnimationFrameId = null;

function animateScore() {
    if (scoreAnimationFrameId) {
        cancelAnimationFrame(scoreAnimationFrameId);
    }

    const duration = 500;
    const startTime = performance.now();

    function updateScore(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeProgress = progress < 0.5
            ? 2 * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 2) / 2;

        displayedScore = Math.round(scoreAnimationStart + (scoreAnimationTarget - scoreAnimationStart) * easeProgress);
        document.getElementById('scoreDisplay').textContent = displayedScore;

        if (progress < 1) {
            scoreAnimationFrameId = requestAnimationFrame(updateScore);
            return;
        }

        displayedScore = scoreAnimationTarget;
        document.getElementById('scoreDisplay').textContent = displayedScore;
        scoreAnimationFrameId = null;
    }

    scoreAnimationFrameId = requestAnimationFrame(updateScore);
}