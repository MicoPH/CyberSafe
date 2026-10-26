// helper that determines whether a piece can be placed at a given grid coordinate
function canPlacePiece(piece, x, y) {
    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
            if (piece[row][col]) {
                const gridX = x + col;
                const gridY = y + row;
                if (
                    gridX < 0 ||
                    gridX >= gridSize ||
                    gridY < 0 ||
                    gridY >= gridSize ||
                    grid[gridY][gridX] !== 'gray'
                ) {
                    return false;
                }
            }
        }
    }
    return true;
}
