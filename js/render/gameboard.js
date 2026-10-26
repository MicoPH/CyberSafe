function drawGrid() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            ctx.drawImage(
                tileImages[grid[row][col]],
                col * blockSize,
                row * blockSize,
                blockSize,
                blockSize
            );
        }
    }
}