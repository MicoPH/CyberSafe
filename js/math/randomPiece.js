function generateRandomPiece() {
    // First, try to find a piece that matches an empty pattern on the board
    const matchedPiece = findMatchingPiece();
    if (matchedPiece) {
        return matchedPiece;
    }
    
    // Fall back to random piece generation
    while (true) {
        const piece = pieces[Math.floor(Math.random() * pieces.length)] ;
        const rotations = Math.floor(Math.random() * 4); // Randomly decide on 0, 90, 180, or 270 degree rotation
        let fit = rotatePiece(piece, rotations);
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                if (placePiece(fit, col, row, 'gray', true)) {
                    return fit;
                }
            }
        }
    }
}