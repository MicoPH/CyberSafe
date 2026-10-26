document.body.addEventListener('mousemove', (e) => {
    if (quizActive) return; // ignore while question displayed
    if (isDragging && selectedPiece) {
        if(objWin.dom == null) return;
        // Hide the dragged canvas element since we draw on main canvas
        objWin.dom.style.display = 'none';
        drawGrid();
        const { x, y } = clientToGrid(e.clientX, e.clientY);
        let canPlaceAtOriginal = canPlacePiece(selectedPiece, x, y);
        let nearestPos = null;

        if (!canPlaceAtOriginal) {
            nearestPos = findNearestValidPosition(selectedPiece, x, y);
            if (!nearestPos) {
                if (highlightAnimationFrameId) {
                    cancelAnimationFrame(highlightAnimationFrameId);
                    highlightAnimationFrameId = null;
                }
            }
        }
        drawPiece(selectedPiece, x, y, piecePos, true);

    }
        
});