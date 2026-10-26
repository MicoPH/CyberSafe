const pieces = [
    [[1, 1, 1, 1]],
    [
    [1, 1],
    [1, 1],
    ],
    [
    [1, 1, 1],
    [0, 1, 0],
    ],
    [
    [1, 0, 0],
    [1, 1, 1],
    ],
    [
    [0, 0, 1],
    [1, 1, 1],
    ],
    [
    [0, 1, 1],
    [1, 1, 0],
    ],
    [
    [1, 1, 0],
    [0, 1, 1],
    ],
    [[1, 1, 1, 1, 1]],
    [[1, 1, 1]],
    [
    [1, 1, 1],
    [1, 1, 1],
    ],
    [
    [1, 1, 1],
    [0, 0, 1],
    [0, 0, 1],
    ],
    [
    [1, 1],
    [0, 1],
    ],  
    [[1]],
    [[1, 1]],
    [[1,1,1],[1,1,1],[1,1,1]],
];




function drawPiece(piece, x, y, color, shadow = false) {
    // Determine where the piece will actually be drawn; snap if necessary
    let drawX = x;
    let drawY = y;
    if (piece === undefined) {
        return;
    }
    let canPlaceAtOriginal = canPlacePiece(piece, x, y);
    let nearestPos = null;

    if (!canPlaceAtOriginal) {
        nearestPos = findNearestValidPosition(piece, x, y);
        if (nearestPos) {
            drawX = nearestPos.x;
            drawY = nearestPos.y;
        } else {
            // nowehere to draw, bail out
            return;
        }
    }

    // render the piece (shadow opacity if requested)
    ctx.globalAlpha = shadow ? 0.5 : 1.0;
    piece.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            if (cell) {
                ctx.drawImage(
                    tileImages[color],
                    (drawX + colIndex) * blockSize,
                    (drawY + rowIndex) * blockSize,
                    blockSize,
                    blockSize
                );
            }
        });
    });
    ctx.globalAlpha = 1.0;

    // choose position to test for clearable lines: prefer original if valid, otherwise snapped coords
    const highlightX = canPlaceAtOriginal ? x : (nearestPos ? nearestPos.x : null);
    const highlightY = canPlaceAtOriginal ? y : (nearestPos ? nearestPos.y : null);

    if (highlightX !== null && highlightY !== null) {
        const { rows: clearableRows, cols: clearableCols } =
            detectClearableLines(selectedPiece, highlightX, highlightY, piecePos);

        if (clearableRows.size > 0 || clearableCols.size > 0) {
            highlightClearableLines(clearableRows, clearableCols, piecePos);
        } else {
            // cancel any running highlight if nothing to show
            if (highlightAnimationFrameId) {
                cancelAnimationFrame(highlightAnimationFrameId);
                highlightAnimationFrameId = null;
            }
        }
    } else {
        // piece can't go anywhere, clear highlight
        if (highlightAnimationFrameId) {
            cancelAnimationFrame(highlightAnimationFrameId);
            highlightAnimationFrameId = null;
        }
    }
}

function renderPieceSelection(savedPieces = null) {
    pieceSelection.forEach((canvas, index) => {
        canvas.removeAttribute("style");
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const savedPiece = savedPieces?.[index];
        const piece = savedPieces
            ? savedPiece?.piece || null
            : generateRandomPiece();
        pieceSelection[index].piece = piece;
        const color = savedPieces
            ? (colors.includes(savedPiece?.color) ? savedPiece.color : null)
            : colors[Math.floor(Math.random() * colors.length)];
        pieceColors[index] = color;
        if (!piece || !color) return;
        const adjustedBlockSize = canvas.width / 5;
        // Calculate the size of the piece grid in pixels
        const pieceWidth = piece[0].length * adjustedBlockSize;
        const pieceHeight = piece.length * adjustedBlockSize;
        // Calculate the starting x and y positions to center the piece
        const startX = (canvas.width - pieceWidth) / 2;
        const startY = (canvas.height - pieceHeight) / 2;
        // Image has fully loaded, now draw it
        piece.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                if (cell) {
                    ctx.drawImage(
                        tileImages[color],
                        startX + ((colIndex * adjustedBlockSize)),
                        startY + ((rowIndex * adjustedBlockSize)),
                        adjustedBlockSize,
                        adjustedBlockSize
                    );
                }
            });
        });
    });
}
