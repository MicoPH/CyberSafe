// Detect empty space patterns on the board and try to match pieces to them
function detectEmptyPatterns() {
    const patterns = [];
    const visited = Array(gridSize).fill(null).map(() => Array(gridSize).fill(false));
    
    // Find all contiguous empty regions and extract their patterns
    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            if (grid[row][col] === 'gray' && !visited[row][col]) {
                const pattern = extractPattern(row, col, visited);
                if (pattern.length > 0) {
                    patterns.push(pattern);
                }
            }
        }
    }
    return patterns;
}

// Extract a connected empty region as a pattern
function extractPattern(startRow, startCol, visited) {
    const pattern = [];
    const queue = [[startRow, startCol]];
    const bounds = { minRow: startRow, maxRow: startRow, minCol: startCol, maxCol: startCol };
    const tempVisited = new Set();
    tempVisited.add(`${startRow},${startCol}`);
    
    // BFS to find all connected empty cells
    while (queue.length > 0) {
        const [r, c] = queue.shift();
        visited[r][c] = true;
        bounds.minRow = Math.min(bounds.minRow, r);
        bounds.maxRow = Math.max(bounds.maxRow, r);
        bounds.minCol = Math.min(bounds.minCol, c);
        bounds.maxCol = Math.max(bounds.maxCol, c);
        
        // Check neighbors
        const neighbors = [[r-1, c], [r+1, c], [r, c-1], [r, c+1]];
        for (const [nr, nc] of neighbors) {
            if (nr >= 0 && nr < gridSize && nc >= 0 && nc < gridSize && 
                grid[nr][nc] === 'gray' && !tempVisited.has(`${nr},${nc}`)) {
                tempVisited.add(`${nr},${nc}`);
                queue.push([nr, nc]);
            }
        }
    }
    
    // Convert to normalized pattern matrix
    const height = bounds.maxRow - bounds.minRow + 1;
    const width = bounds.maxCol - bounds.minCol + 1;
    const matrix = Array(height).fill(null).map(() => Array(width).fill(0));
    
    for (const key of tempVisited) {
        const [r, c] = key.split(',').map(Number);
        matrix[r - bounds.minRow][c - bounds.minCol] = 1;
    }
    
    return { pattern: matrix, size: tempVisited.size };
}

// Check if two patterns match (accounting for rotations)
function patternsMatch(pattern1, pattern2, maxRotations = 4) {
    let currentPattern = pattern2;
    
    for (let rotation = 0; rotation < maxRotations; rotation++) {
        if (matricesEqual(pattern1, currentPattern)) {
            return true;
        }
        currentPattern = rotatePiece(currentPattern, 1);
    }
    return false;
}

// Check if two matrices are equal
function matricesEqual(matrix1, matrix2) {
    if (matrix1.length !== matrix2.length) return false;
    if (matrix1[0].length !== matrix2[0].length) return false;
    
    for (let i = 0; i < matrix1.length; i++) {
        for (let j = 0; j < matrix1[i].length; j++) {
            if (matrix1[i][j] !== matrix2[i][j]) return false;
        }
    }
    return true;
}

// Try to find a piece that matches an empty pattern on the board
function findMatchingPiece() {
    const emptyPatterns = detectEmptyPatterns();
    
    if (emptyPatterns.length === 0) return null;
    
    // Try to match each empty pattern with available pieces
    for (const emptyPattern of emptyPatterns) {
        for (let i = 0; i < pieces.length; i++) {
            for (let rotation = 0; rotation < 4; rotation++) {
                let rotatedPiece = rotatePiece(pieces[i], rotation);
                
                if (matricesEqual(emptyPattern.pattern, rotatedPiece)) {
                    // Found a matching piece, verify it can be placed somewhere
                    for (let row = 0; row < gridSize; row++) {
                        for (let col = 0; col < gridSize; col++) {
                            if (canPlacePiece(rotatedPiece, col, row)) {
                                return rotatedPiece;
                            }
                        }
                    }
                }
            }
        }
    }
    return null;
}