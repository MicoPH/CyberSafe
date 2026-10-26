function rotatePiece(piece, rotations) {
    let rotatedPiece = piece;
    for (let i = 0; i < rotations; i++) {
        rotatedPiece = rotatedPiece[0].map((_, colIndex) =>
            rotatedPiece.map((row) => row[colIndex]).reverse()
        );
    }
    return rotatedPiece;
}