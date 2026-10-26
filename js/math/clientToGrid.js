// Convert client (screen) coordinates to grid indices, accounting for CSS scaling
function clientToGrid(clientX, clientY) {
    const rect = canvas.getBoundingClientRect();
    const relX = (clientX - rect.left) / rect.width;
    let relY;
    if (vertmode) {
        relY = (clientY - (rect.top - (rect.height * -0.45))) / rect.height;
    } else{
        relY = (clientY - rect.top) / rect.height;
    }
    const x = Math.floor(relX * gridSize);
    const y = Math.floor(relY * gridSize);
    document.getElementById('datainf').innerHTML = "X-piece: " + rect.top + " Y-piece: "+ rect.left+ " Vertical:" + vertmode + "\nrelX: " + relX + " clientX: " + clientX +"\n relY: "+ relY + " clientY: " + clientY + "\n rectWidth: " +  rect.width + "\n rectHeight: " + rect.height + "\n gridX: " + x + "\n gridY: " + y;
    return { x, y };
}