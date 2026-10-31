let gameOverInProgress = false;
let gameOverXpAwarded = false;

async function checkGameOver() {
    if (gameOverInProgress || gameOverXpAwarded) {
        return false;
    }
    gameOverInProgress = true;

    for (const piece of Array.from(pieceSelection, (canvas) => canvas.piece)) {
        if (piece) {
            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    if (placePiece(piece, col, row, 'gray', true)) {
                        // Pause and ask a question before applying score
                        if (questachieve >= 3) {
                            correct = await showRandomQuestion();
                        }
                        gameOverInProgress = false;
                        return false;
                    }
                }
            }
        }
    }
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] == 'gray')
            grid[row][col] = colors[Math.floor(Math.random() * colors.length)];
            
        }
        drawGrid();
        await wait(60)
    }
    await wait(100);
    const finalScore = Math.max(0, Number(score2) || 0);
    const highScore = Math.max(Number(blastScore) || 0, finalScore);
    blastScore = highScore;
    blastProgress = null;
    const xpEarned = Math.floor(finalScore / 1000);
    state.points = (Number(state.points) || 0) + xpEarned;
    addActivity(`Earned ${xpEarned} XP from Hype Blast (${finalScore} points).`);
    saveState();
    gameOverXpAwarded = true;
    gameOverInProgress = false;

    document.getElementById('highScore').textContent = "High Score: " + highScore;
    document.getElementById("game-over").classList.remove("hide");
    document.querySelector('.overlay').classList.remove("hide");
    document.getElementById("finalScore").textContent = finalScore;
    document.getElementById("finalLines").textContent = linesclearedscore;
    document.getElementById("finalHighScoreValue").textContent = highScore;
    document.getElementById("finalXp").textContent = `XP earned: ${xpEarned} (${finalScore} points / 1,000)`;
}
function tryAgain(){
    document.getElementById("game-over").classList.add("hide");
    document.querySelector('.overlay').classList.add("hide")
    gameOverInProgress = false;
    gameOverXpAwarded = false;
    questachieve = 0;
   document.getElementById("questogo").innerText = "3 left correct moves to get question";
    resetGrid();
    drawGrid();
    renderPieceSelection();
    particles = [];
    linesclearedscore = 0;
    score2 = 0;
    displayedScore = 0;
    combo = 0;
    realcombo = 0;
    movesWithoutClear = 0;
    scoreAnimationStart = 0;
    scoreAnimationTarget = 0;
    checkClearLines(true);
    saveBlastProgress();
}