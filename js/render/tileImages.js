const tileBase64 = {
    red:'img/BLASTACTS/red.png',
    orange:'img/BLASTACTS/orange.png',
    yellow:'img/BLASTACTS/yellow.png',
    green:'img/BLASTACTS/green.png',
    lightBlue:'img/BLASTACTS/lightBlue.png',
    blue:'img/BLASTACTS/blue.png',
    gray: 'img/BLASTACTS/gray.png',
};
const tileImages = {
    red: new Image(),
    orange: new Image(),
    yellow: new Image(),
    green: new Image(),
    lightBlue: new Image(),
    blue: new Image(),
    gray: new Image(),
};
const colors = ['red', 'orange', 'yellow', 'lightBlue', 'blue', 'green'];
let pieceColors = Array(pieceSelection.length).fill(null);
function loadImages() {
    // Create an array of promises, one for each image
    const imagePromises = Object.keys(tileImages).map((color) => {
        return new Promise((resolve, reject) => {
        tileImages[color].src = tileBase64[color];
        tileImages[color].onload = resolve;
        tileImages[color].onerror = () =>
        reject(`Failed to load image for color: ${color}`);
        });
    });
    return Promise.all(imagePromises);
}