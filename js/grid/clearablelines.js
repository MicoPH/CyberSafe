function detectClearableLines(piece, x, y, color) {
    // Create a temporary grid to check what lines would be cleared
    let tempGrid = grid.map(row => [...row]);
    
    // Place the piece on the temp grid
    for (let row = 0; row < piece.length; row++) {
        for (let col = 0; col < piece[row].length; col++) {
            if (piece[row][col] && x + col < gridSize && y + row < gridSize && x + col >= 0 && y + row >= 0) {
                tempGrid[y + row][x + col] = color;
            }
        }
    }
    
    let clearableRows = new Set();
    let clearableCols = new Set();
    
    // Check rows
    for (let row = 0; row < gridSize; row++) {
        if (tempGrid[row].every((cell) => cell !== 'gray')) {
            clearableRows.add(row);
        }
    }
    
    // Check columns
    for (let col = 0; col < gridSize; col++) {
        if (tempGrid.every((row) => row[col] !== 'gray')) {
            clearableCols.add(col);
        }
    }
    
    return { rows: clearableRows, cols: clearableCols };
}


function highlightClearableLines(clearableRows, clearableCols, color) {
    // Store the highlight state for continuous animation
    currentClearableRows = clearableRows;
    currentClearableCols = clearableCols;
    currentHighlightColor = color;
    
    // Cancel any existing animation frame
    if (highlightAnimationFrameId) {
        cancelAnimationFrame(highlightAnimationFrameId);
    }
    
    // Start smooth animation loop
    const animateHighlight = () => {
        let cellIndex = 0;
        let totalCells = clearableRows.size * gridSize + clearableCols.size * gridSize;
        
        // Don't redraw the grid - just draw highlights on top of current state
        
        // Highlight clearable rows with rainbow border shadow
        clearableRows.forEach((row) => {
            for (let col = 0; col < gridSize; col++) {
                const x = col * blockSize;
                const y = row * blockSize;
                drawRainbowBorderShadow(x, y, cellIndex, totalCells);
                cellIndex++;
            }
        });
        
        // Highlight clearable columns with rainbow border shadow
        clearableCols.forEach((col) => {
            for (let row = 0; row < gridSize; row++) {
                const x = col * blockSize;
                const y = row * blockSize;
                drawRainbowBorderShadow(x, y, cellIndex, totalCells);
                cellIndex++;
            }
        });
        
        ctx.globalAlpha = 1;
        
        // Continue animation
        if (cellIndex > 0) {
            highlightAnimationFrameId = requestAnimationFrame(animateHighlight);
        } else {
            highlightAnimationFrameId = null; // No cells to highlight, stop animation
        }
    };
    
    // Start the animation
    highlightAnimationFrameId = requestAnimationFrame(animateHighlight);
}