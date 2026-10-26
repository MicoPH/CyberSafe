let highlightAnimationActive = false;
let currentClearableRows = new Set();
let currentClearableCols = new Set();
let currentHighlightColor = null;
let highlightAnimationId = null;
let highlightAnimationFrameId = null;
let realcombo = 0;
async function checkClearLines(gameOverCheck = false) {
    let clearedRows = new Set();
    let clearedCols = new Set();
    // Identify rows to clear
    for (let row = 0; row < gridSize; row++) {
        if (grid[row].every((cell) => cell !== 'gray')) {
            clearedRows.add(row);
        }
    }
    // Identify columns to clear
    for (let col = 0; col < gridSize; col++) {
        if (grid.every((row) => row[col] !== 'gray')) {
            clearedCols.add(col);
        }
    }
    linesCleared = clearedCols.size + clearedRows.size;
    // Clear identified rows and columns
    if (linesCleared > 0) {
        console.log(clearedCols)
        console.log(clearedRows)
        linesclearedscore++
        console.log(gameOverCheck)
        if (!gameOverCheck) {
            questachieve++;
        } else {
            questachieve = 3;
        }
        // Cancel highlight animation before explosions
        if (highlightAnimationFrameId) {
            cancelAnimationFrame(highlightAnimationFrameId);
            highlightAnimationFrameId = null;
        }
        
        // explosions before emptying
        clearedRows.forEach((row, rowIndex) => {
            for (let col = 0; col < gridSize; col++) {
                createExplosion(
                col * blockSize,
                rowIndex * blockSize,
                blockSize,
                blockSize,
                tileImages[grid[row][col]]
                );
            }
        });
        clearedCols.forEach((col, colIndex) => {
        for (let row = 0; row < gridSize; row++) {
            createExplosion(
            colIndex * blockSize,
            row * blockSize,
            blockSize,
            blockSize,
            tileImages[grid[row][col]]
            );
        }
        });
        clearedRows.forEach((row) => {
            for (let col = 0; col < gridSize; col++) {
                grid[row][col] = 'gray';
            }
            });
        clearedCols.forEach((col) => {
            for (let row = 0; row < gridSize; row++) {
                grid[row][col] = 'gray';
            }
        });
        if (combo > 3) {
        	realcombo += 1;
        }
        combo += linesCleared;
        // Calculate combo score: each cleared line earns additional points based on the combo multiplier
        let comboScore = 0;
        for (let i = 0; i < linesCleared; i++) {
            comboScore += Math.floor(Math.random() * 401) + 100 * ((realcombo + combo) - linesCleared + 1 + i); // Incremental combo multiplier
        }
        let correct = false
        if (!gameOverCheck) {
            document.getElementById("questogo").innerText = (3 - questachieve) + " left cleared moves to get question";
        }
        
         // brief pause after question before applying score

        score2 += comboScore * (correct ? 2 : 1);

        // Start score animation
        scoreAnimationStart = displayedScore;
        scoreAnimationTarget = score2;
        animateScore();
        movesWithoutClear = 0; // Reset moves counter because lines were cleared
    } else if (!gameOverCheck && combo > 0) {
        movesWithoutClear += 1; // Increment moves counter if no lines were cleared
        if (movesWithoutClear >= 3) {
            combo = 0; // Reset combo if 3 moves without a clear
            realcombo = 0;
        }
    }
    // Update the score and combo displays
    console.log(linesCleared)
    scoreAnimationStart = displayedScore;
    scoreAnimationTarget = score2;
    animateScore();
    document.getElementById('comboDisplay').textContent = `Combo: ${realcombo}`;
    drawGrid();
}
