
const pieceSelection = document.querySelectorAll('.pieceCanvas');

let cursor = {x: null, y: null}
let objWin = {dom:null, x:null, y:null, width:null, height:null}
let grid1, selectedPiece, combo = 0, piecePos, isDragging = false, movesWithoutClear = 0, currentPieceIndex = -1;
pieceSelection.forEach((canvas, index) => {
    canvas.addEventListener('mousedown', (e) => {
        if (quizActive) return; // ignore interactions while quiz is active
        cursor = {
            x: e.clientX,
            y: e.clientY
        }
        objWin = {
            dom: e.target,
            x: e.target.getBoundingClientRect().left,
            y: e.target.getBoundingClientRect().top,
            width: e.target.offsetWidth,
            height: e.target.offsetHeight
        }
        objWin.dom.style.transform = "scale(2.5)";
        canvas.style.position = 'fixed';
        canvas.style.top = objWin.y + 'px';
        canvas.style.left = objWin.x + 'px';
        e.preventDefault();
        selectedPiece = canvas.piece;
        if (!selectedPiece) return;
        piecePos = pieceColors[index];
        currentPieceIndex = index;
        isDragging = true;
        document.getElementById('pieceinf').innerHTML = "Piece No. " + currentPieceIndex  + "\n piecePos: " + piecePos + "\n cursorX: " + cursor.x + "\n cursorY: " + cursor.y + "\n objWinX: " + objWin.x + "\n objWinY: " + objWin.y + "\n objWinWidth: " + objWin.width + "\n objWinHeight: " + objWin.height;
    });
});