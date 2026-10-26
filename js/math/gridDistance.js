// find the nearest valid placement for a piece relative to a starting coordinate
function findNearestValidPosition(piece, startX, startY) {
    let best = null;
    // use Chebyshev (grid-line) distance so we measure in grid units along rows/cols
    let bestDist = Infinity;
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (canPlacePiece(piece, col, row)) {
                const dx = Math.abs(col - startX);
                const dy = Math.abs(row - startY);
                const cheb = Math.max(dx, dy);
                if (cheb < bestDist) {
                    bestDist = cheb;
                    best = { x: col, y: row };
                }
            }
        }
    }
    // If the nearest valid position is farther than 2 grid units, don't snap — treat as no valid nearby spot
    const snap = 2; // grid units
    if (bestDist === Infinity || bestDist > snap) return null;
    return best;
}
