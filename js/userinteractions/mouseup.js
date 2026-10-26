document.body.addEventListener('mouseup', (e) => {

    if( objWin.dom == null) return;
    if (isDragging && selectedPiece) {
    const { x, y } = clientToGrid(e.clientX, e.clientY);
        objWin.dom.removeAttribute("style");
        if (placePiece(selectedPiece, x, y, piecePos, false)) {
            objWin.dom.style.display = 'none';
            drawGrid();
            selectedPiece = null;
            isDragging = false;
            pieceSelection[currentPieceIndex].piece = null;
            pieceSelection[currentPieceIndex].getContext('2d').clearRect(0, 0, 250, 250);
            if (Array.from(pieceSelection).every((canvas) => !canvas.piece)) {
                renderPieceSelection();
            }
            saveBlastProgress();
            checkGameOver();
        }
        isDragging = false;
        selectedPiece = null;
        objWin.dom = null; 
        drawGrid()
    }
})