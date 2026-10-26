document.getElementById('datainf').style.display = 'none';
document.getElementById('pieceinf').style.display = "none";
document.getElementById('showLogs').addEventListener('change', (e) => {
    if (e.target.checked) {
        document.getElementById('datainf').style.display = 'block';
        document.getElementById('pieceinf').style.display = "block"
    } else {
        document.getElementById('datainf').style.display = 'none';
        document.getElementById('pieceinf').style.display = "none";
    }
});