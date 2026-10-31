const canvas = document.getElementById('gameCanvas');
const explosionCanvas = document.getElementById('explosionCanvas');
const ctx = canvas.getContext('2d');
const exCtx = explosionCanvas.getContext('2d');
const canvasRect = canvas.getBoundingClientRect();
ctx.imageSmoothingEnabled = false;
let canvasOffsetX = canvasRect.left;
let canvasOffsetY = canvasRect.top;
const gridSize =  8;
let blockSize = canvas.width / gridSize;
let linesclearedscore = 0;
let blaster = false;
function resizeCanvas() {
    vertmode = window.innerWidth < 600 ? true : false;
    if(vertmode){
        document.getElementById('scorebox').style.top = (canvas.getBoundingClientRect().top - document.getElementById("scorebox").getBoundingClientRect().height - 20) + 'px';
    } else {
        document.getElementById('scorebox').style.top = "5%";   
    }
    explosionCanvas.width = window.innerWidth;
    explosionCanvas.height = window.innerHeight;
    canvasOffsetX = canvas.getBoundingClientRect().left;
    canvasOffsetY = canvas.getBoundingClientRect().top;
    blockSize = canvas.width / gridSize;
    if (blaster){
        drawGrid();
    }
}

function resetGrid() {
    grid = Array.from({ length: gridSize }, () =>
        Array(gridSize).fill('gray')
    );
}

function saveBlastProgress() {
    if (typeof gameOverXpAwarded !== 'undefined' && gameOverXpAwarded) {
        blastProgress = null;
        return;
    }
    if (typeof grid === 'undefined' || !pieceSelection) return;
    const progress = {
        grid,
        score: Number(score2) || 0,
        linesCleared: Number(linesclearedscore) || 0,
        combo: Number(combo) || 0,
        realCombo: Number(realcombo) || 0,
        movesWithoutClear: Number(movesWithoutClear) || 0,
        questionsProgress: Number(questachieve) || 0,
        pieces: Array.from(pieceSelection, (canvas, index) => ({
            piece: canvas.piece || null,
            color: canvas.piece ? pieceColors[index] || null : null
        })),
        questionPending: Boolean(quizActive),
        questionIndex: quizActive ? currentQuestionIndex : -1,
        questionResponse: quizActive && typeof activeQuestionResponse !== 'undefined'
            ? activeQuestionResponse
            : null
    };
    blastProgress = progress;
}

function restoreBlastProgress() {
    const progress = blastProgress;
    if (!progress || !Array.isArray(progress.grid) || progress.grid.length !== gridSize ||
        !Array.isArray(progress.pieces) || progress.pieces.length !== pieceSelection.length) {
        return false;
    }

    const validColors = new Set([...colors, 'gray']);
    if (progress.grid.some((row) => !Array.isArray(row) || row.length !== gridSize ||
        row.some((color) => !validColors.has(color)))) {
        return false;
    }
    if (progress.pieces.some((item) => !item ||
        (item.piece === null
            ? item.color !== null && !colors.includes(item.color)
            : (!Array.isArray(item.piece) || item.piece.length === 0 ||
                item.piece.some((row) => !Array.isArray(row) || row.length === 0 ||
                    row.some((cell) => cell !== 0 && cell !== 1)) ||
                !colors.includes(item.color))))) {
        return false;
    }

    grid = progress.grid.map((row) => [...row]);
    score2 = Math.max(0, Number(progress.score) || 0);
    displayedScore = score2;
    scoreAnimationStart = score2;
    scoreAnimationTarget = score2;
    linesclearedscore = Math.max(0, Number(progress.linesCleared) || 0);
    combo = Math.max(0, Number(progress.combo) || 0);
    realcombo = Math.max(0, Number(progress.realCombo) || 0);
    movesWithoutClear = Math.max(0, Number(progress.movesWithoutClear) || 0);
    questachieve = Math.max(0, Number(progress.questionsProgress) || 0);
    return progress;
}

document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
        saveBlastProgress();
    }
});
window.addEventListener('pagehide', () => {
    saveBlastProgress();
    flushUserDataSave(blastProgress);
});

    // make sure quiz UI is hidden initially
const questBox = document.querySelector('.quest');
const overlay = document.querySelector('.overlay');
if (questBox) questBox.classList.add('hide');
if (overlay) overlay.classList.add('hide');
window.addEventListener('resize', resizeCanvas);
// Call loadImages to load the images and halt further execution
function gameBlasterClose(){
    closeAppModalHistory("hype-blast", closeHypeBlastWindow);
}

function closeHypeBlastWindow() {
    saveBlastProgress();
    flushUserDataSave(blastProgress);
    if (quizActive) cancelRandomQuestion();
    if (scoreAnimationFrameId) {
        cancelAnimationFrame(scoreAnimationFrameId);
        scoreAnimationFrameId = null;
    }
    blaster = false
    document.getElementById('blastCon').style.animation = 'lesson-detail-animationOut 0.3s ease forwards';
    document.getElementById('overlay').style.animation = 'overlay-animationOut   0.3s ease forwards';
    setTimeout(() => {
        document.getElementById('overlay').style.animation = '';
        document.getElementById('blastCon').style.animation = '';
        document.getElementById("overlay").classList.remove("blast");
        document.getElementById('blastCon').style.display = 'none';
    }, 300);
    document.getElementById("game-over").classList.add("hide");
    document.querySelector(".overlay").classList.add('hide')
}
function gameStart(){
    if (!isFinalBossCompleted()) {
        toast("Complete the Final Boss quiz to unlock HYPE BLAST.");
        return;
    }
    pushAppModalHistory("hype-blast", closeHypeBlastWindow);
    blaster = true;
    document.querySelector(".game-content").style.display = "block"
    document.getElementById("overlay").classList.add("blast")
    loadImages().then(() => {
        document.getElementById('highScore').textContent = "High Score: " + blastScore;
        console.log('All images loaded');
        explosionCanvas.width = window.innerWidth;
        explosionCanvas.height = window.innerHeight;
        const progress = restoreBlastProgress();
        if (!progress) {
            gameOverInProgress = false;
            gameOverXpAwarded = false;
            resetGrid();
            score2 = 0;
            displayedScore = 0;
            linesclearedscore = 0;
            combo = 0;
            realcombo = 0;
            movesWithoutClear = 0;
            questachieve = 0;
        }
        drawGrid();
        resizeCanvas();
        renderPieceSelection(progress?.pieces);
        document.getElementById('scoreDisplay').textContent = displayedScore;
        document.getElementById('comboDisplay').textContent = `Combo: ${realcombo}`;
        document.getElementById('questogo').innerText = `${Math.max(0, 3 - questachieve)} left cleared moves to get question`;
        saveBlastProgress();
        if (progress?.questionPending) {
            showRandomQuestion(progress.questionIndex, progress.questionResponse || null);
        } else if (progress) {
            checkGameOver();
        }
    }).catch((error) => {
        console.error(error); // Log any errors if an image fails to load
    });
}
document.getElementById("heroHypeBlastButton").innerHTML = restoreBlastProgress ? "Resume HYPE BLAST" : "Play HYPE BLAST"