pieceSelection.forEach((canvas, index) => {
    canvas.getContext('2d').imageSmoothingEnabled = false;
    canvas.addEventListener('touchstart', (e) => {
        if (quizActive) return; // block during quiz
        cursor = {
            x: e.touches[0].clientX,
            y: e.touches[0].clientY
        }
        objWin = {
            dom: e.target,
            x: e.target.getBoundingClientRect().left,
            y: e.target.getBoundingClientRect().top,
            width: e.target.offsetWidth,
            height: e.target.offsetHeight
        }
        if  (vertmode) {
            objWin.dom.style.transform = "scale(2.5) translateY(-50%)";
        } else {
            objWin.dom.style.transform = "scale(2.5)";
        }
        objWin.dom.style.cursor = "drag";
        canvas.style.position = 'fixed';
        canvas.style.top = objWin.y + 'px';
        canvas.style.left = objWin.x + 'px';
        e.preventDefault();
        selectedPiece = canvas.piece;
        if (!selectedPiece) return;
        piecePos = pieceColors[index];
        currentPieceIndex = index;
        isDragging = true;
        document.getElementById('pieceinf').innerHTML = "Piece No. " + currentPieceIndex  + "\n pieceColor: " + piecePos + "\n objWinX: " + objWin.x + "\n objWinY: " + objWin.y + "\n objWinWidth: " + objWin.width + "\n objWinHeight: " + objWin.height;
    });
});