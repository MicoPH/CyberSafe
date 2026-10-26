function assignColors() {
    for (let i = 0; i < pieceColors.length; i++) {
        pieceColors[i] = colors[Math.floor(Math.random() * colors.length)];
    }
}