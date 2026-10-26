function placePiece(piece, x, y, color, gameOverCheck = false) {
    // try direct placement first
    if (!canPlacePiece(piece, x, y)) {
        const nearest = findNearestValidPosition(piece, x, y);
        if (nearest) {
            x = nearest.x;
            y = nearest.y;
        } else {
            drawPiece()
            return false;
        }
    }

    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
            if (piece[row][col] &&
                (x + col < 0 ||
                y + row < 0 ||
                x + col >= gridSize ||
                y + row >= gridSize ||
                grid[y + row][x + col] !== 'gray')
            ) {
                return false;
            }
        }
    }
    piece.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell) {
                grid[y + rowIndex][x + colIndex] = color;
                if (!gameOverCheck) {
                score2 += Math.floor(Math.random() * 76) + 1;
            }
            }
        });
    });
    checkClearLines(gameOverCheck);
    return true;
}