function drawRainbowBorderShadow(x, y, cellIndex, totalCells) {
    const borderWidth = 4;
    const time = performance.now();
    
    // Linear color cycling for each cell
    const waveSpeed = time / 250; // Color change speed
    const cellHueOffset = (cellIndex / Math.max(totalCells, 1)) * 120; // Spread colors across spectrum
    const hue = (waveSpeed * 60 + cellHueOffset) % 360; // Continuous linear cycling
    
    const rainbowColor = `hsl(${hue}, 100%, 50%)`;
    
    // Pulsing/breathing effect with alternating intensity
    const pulseSpeed = time / 800; // Slower cycle for pulsing
    const pulseCycle = pulseSpeed % 1; // Repeats from 0 to 1
    
    // Create alternating glow: strong -> weak -> strong
    const glowIntensity = Math.sin(pulseCycle * Math.PI * 2) * 0.5 + 0.5; // 0 to 1
    const shadowBlur = 5 + glowIntensity * 8; // Ranges from 5 to 13 (reduced)
    const outerAlpha = 0.15 + glowIntensity * 0.15; // Ranges from 0.15 to 0.3 (very subtle)
    const innerAlpha = 0.08 + glowIntensity * 0.1; // Ranges from 0.08 to 0.18 (very subtle)
    
    // Outer border with pulsing glow
    ctx.strokeStyle = rainbowColor;
    ctx.lineWidth = borderWidth;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalAlpha = outerAlpha;
    
    // Draw glowing border with pulsing effect
    ctx.shadowColor = rainbowColor;
    ctx.shadowBlur = shadowBlur;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    
    // Draw outer border
    ctx.strokeRect(x + borderWidth / 2, y + borderWidth / 2, blockSize - borderWidth, blockSize - borderWidth);
    
    // Inner glow with alternating opacity
    ctx.strokeStyle = rainbowColor;
    ctx.globalAlpha = innerAlpha;
    ctx.lineWidth = borderWidth / 2;
    ctx.strokeRect(x + borderWidth / 2 + 2, y + borderWidth / 2 + 2, blockSize - borderWidth - 4, blockSize - borderWidth - 4);
    
    // Optional: Add an extra alternating layer for more visual interest
    const alternateAlpha = Math.sin((pulseCycle + 0.5) * Math.PI * 2) * 0.08 + 0.05; // Offset pulse, very subtle
    ctx.globalAlpha = alternateAlpha;
    ctx.shadowBlur = shadowBlur * 0.6;
    ctx.strokeRect(x + borderWidth / 2 - 1, y + borderWidth / 2 - 1, blockSize - borderWidth + 2, blockSize - borderWidth + 2);
    
    ctx.globalAlpha = 1.0;
    ctx.shadowBlur = 0;
}