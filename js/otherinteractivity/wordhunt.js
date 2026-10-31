// Word Hunt

const SIZE = 13;
const GAME_TIME = 500;

const WORDS = [
  "CYBERSECURITY",
  "ENCRYPTION",
  "PASSWORD",
  "PHISHING",
  "FIREWALL",
  "PRIVACY",
  "MALWARE",
  "NETWORK"
];

const $ = selector => document.querySelector(selector);

const boardElement = $("#board");
const wordListElement = $("#word-list");
const scoreElement = $("#score");
const foundElement = $("#found");
const timerElement = $("#timer");
const messageElement = $("#message");
const restartButton = $("#restart");

const DIRECTIONS = [
  [0, 1],   // Horizontal
  [1, 0],   // Vertical
  [1, 1],   // Diagonal
  [-1, 1]   // Diagonal
];

let grid;
let placements;
let foundWords;
let score;
let timeLeft;
let timerId;
let gameOver;
let isSelecting = false;
let selectedStart = null;
let previewCells = [];
// Generate a random uppercase letter.
function randomLetter() {
  return String.fromCharCode(
    65 + Math.floor(Math.random() * 26)
  );
}

// Create an empty grid.
function createGrid() {
  return Array.from(
    { length: SIZE },
    () => Array(SIZE).fill("")
  );
}

// Generate the puzzle and place each word.
function generatePuzzle() {
  for (let attempt = 0; attempt < 100; attempt++) {
    const nextGrid = createGrid();
    const nextPlacements = {};

    const sortedWords = [...WORDS].sort(
      (a, b) => b.length - a.length
    );

    let success = true;

    for (const word of sortedWords) {
      let placed = false;

      for (let tries = 0; tries < 1500; tries++) {
        const [dr, dc] =
          DIRECTIONS[
            Math.floor(Math.random() * DIRECTIONS.length)
          ];

        // Reverse some directions for variety.
        const direction =
          Math.random() < 0.5
            ? [dr, dc]
            : [-dr, -dc];

        const [rowStep, colStep] = direction;

        const row = Math.floor(Math.random() * SIZE);
        const col = Math.floor(Math.random() * SIZE);

        const endRow = row + rowStep * (word.length - 1);
        const endCol = col + colStep * (word.length - 1);

        if (
          endRow < 0 || endRow >= SIZE ||
          endCol < 0 || endCol >= SIZE
        ) {
          continue;
        }

        let fits = true;

        for (let i = 0; i < word.length; i++) {
          const r = row + rowStep * i;
          const c = col + colStep * i;
          const existing = nextGrid[r][c];

          if (existing && existing !== word[i]) {
            fits = false;
            break;
          }
        }

        if (!fits) continue;

        const cells = [];

        for (let i = 0; i < word.length; i++) {
          const r = row + rowStep * i;
          const c = col + colStep * i;

          nextGrid[r][c] = word[i];
          cells.push(`${r},${c}`);
        }

        nextPlacements[word] = cells;
        placed = true;
        break;
      }

      if (!placed) {
        success = false;
        break;
      }
    }

    if (success) {
      for (let r = 0; r < SIZE; r++) {
        for (let c = 0; c < SIZE; c++) {
          if (!nextGrid[r][c]) {
            nextGrid[r][c] = randomLetter();
          }
        }
      }

      grid = nextGrid;
      placements = nextPlacements;
      return;
    }
  }

  throw new Error("Could not generate the word grid.");
}

// Render the letter grid.

 // Render the letter grid.
function renderBoard() {
  boardElement.replaceChildren();

  const fragment = document.createDocumentFragment();

  grid.forEach((row, r) => {
    row.forEach((letter, c) => {
      const cell = document.createElement("button");

      cell.type = "button";
      cell.className = "cell";
      cell.textContent = letter;
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.setAttribute(
        "aria-label",
        `Row ${r + 1}, column ${c + 1}, ${letter}`
      );

      // Keep correctly found word cells green.
      if (correctCells.has(`${r},${c}`)) {
        cell.classList.add("correct");
      }

      // Highlight cells while selecting a word.
      if (previewCells.some(p => p.row === r && p.col === c)) {
        cell.classList.add("selected");
      }

      fragment.appendChild(cell);
    });
  });

  boardElement.appendChild(fragment);
}


// Render the word list.

function renderWords() {
  wordListElement.replaceChildren();

  WORDS.forEach(word => {
    const item = document.createElement("span");

    item.className = "word";
    item.textContent = word;
    item.dataset.word = word;

    // Turn the word green when found.
    if (foundWords.has(word)) {
      item.classList.add("found");
    }

    wordListElement.appendChild(item);
  });
}


function getCellFromPointer(event) {
  const element = document.elementFromPoint(
    event.clientX,
    event.clientY
  );

  const cell = element?.closest(".cell");

  if (!cell || !boardElement.contains(cell)) {
    return null;
  }

  return {
    row: Number(cell.dataset.row),
    col: Number(cell.dataset.col)
  };
}

function handlePointerDown(event) {
  if (gameOver) return;

  const cell = event.target.closest(".cell");
  if (!cell) return;

  event.preventDefault();

  isSelecting = true;

  selectedStart = {
    row: Number(cell.dataset.row),
    col: Number(cell.dataset.col)
  };

  previewCells = [selectedStart];

  cell.setPointerCapture?.(event.pointerId);
  renderBoard();
}

function handlePointerMove(event) {
  if (!isSelecting || gameOver) return;

  const cell = getCellFromPointer(event);
  if (!cell) return;

  const line = getLine(selectedStart, cell);

  if (line) {
    previewCells = line;
    renderBoard();
  }
}

function handlePointerUp(event) {
  if (!isSelecting) return;

  const end = getCellFromPointer(event);

  isSelecting = false;

  if (!end || !selectedStart) {
    selectedStart = null;
    previewCells = [];
    renderBoard();
    return;
  }

  const cells = getLine(selectedStart, end);

  selectedStart = null;
  previewCells = [];

  if (!cells) {
    renderBoard();
    return;
  }

  const word = cells
    .map(({ row, col }) => grid[row][col])
    .join("");

  const reversed = word.split("").reverse().join("");

  const match = WORDS.find(w =>
    !foundWords.has(w) &&
    (w === word || w === reversed)
  );

  if (match) {
    foundWords.add(match);
    score += 10;
    state.points += 30;
    toast( `You got a +30 XP`)
    saveState();
    cells.forEach(({ row, col }) => {
        correctCells.add(`${row},${col}`);
        
    });

    messageElement.textContent = `Correct! You found ${match}.`;

    updateStats();
    renderWords();

    if (foundWords.size === WORDS.length) {
      renderBoard();
      finishGame(true);
      return;
    }
  } else {
    messageElement.textContent = "Not a word. Try again!";
  }

  renderBoard();
}

function cancelSelection() {
  isSelecting = false;
  selectedStart = null;
  previewCells = [];
  renderBoard();
}
const correctCells = new Set();
boardElement.addEventListener("pointerdown", handlePointerDown);
boardElement.addEventListener("pointermove", handlePointerMove);
boardElement.addEventListener("pointerup", handlePointerUp);
boardElement.addEventListener("pointercancel", cancelSelection);


function getLine(start, end) {
  const rowDiff = end.row - start.row;
  const colDiff = end.col - start.col;

  // Only allow horizontal, vertical, or diagonal selections.
  if (
    rowDiff !== 0 &&
    colDiff !== 0 &&
    Math.abs(rowDiff) !== Math.abs(colDiff)
  ) {
    return null;
  }

  const steps = Math.max(
    Math.abs(rowDiff),
    Math.abs(colDiff)
  );

  const rowStep = Math.sign(rowDiff);
  const colStep = Math.sign(colDiff);

  const cells = [];

  for (let i = 0; i <= steps; i++) {
    cells.push({
      row: start.row + i * rowStep,
      col: start.col + i * colStep
    });
  }

  return cells;
}


function getCell(row, col) {
  return boardElement.querySelector(
    `[data-row="${row}"][data-col="${col}"]`
  );
}

function clearSelection() {
  boardElement
    .querySelectorAll(".selected")
    .forEach(cell => cell.classList.remove("selected"));

  selectedStart = null;
}

function updateStats() {
  scoreElement.textContent = score;
  foundElement.textContent = `${foundWords.size} / ${WORDS.length}`;
}

function updateTimer() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerElement.textContent =
    `${String(minutes).padStart(2, "0")}:` +
    `${String(seconds).padStart(2, "0")}`;
}

function startTimer() {
  clearInterval(timerId);

  timerId = setInterval(() => {
    if (gameOver) return;

    timeLeft--;
    updateTimer();

    if (timeLeft <= 0) {
      finishGame(false);
    }
  }, 1000);
}


function finishGame(won) {
  gameOver = true;
  document.getElementById("closewh").style.display = "none"
  document.getElementById("restart").textContent = "Go to Results"
  clearInterval(timerId);
  clearSelection();
  if (!won) {
    // Reveal every word that was not found.
    WORDS.forEach(word => {
      if (foundWords.has(word)) return;

      const cells = placements[word];

      cells.forEach(key => {
        const [row, col] = key.split(",").map(Number);
        const cell = getCell(row, col);

        if (cell) {
          cell.classList.add("revealed");
        }
      });

      // Mark the word as revealed in the word list.
      const item = wordListElement.querySelector(
        `[data-word="${word}"]`
      );

      if (item) {
        item.classList.add("revealed-word");
      }
    });
  }
  if (won){
    addActivity(`Word Hunt: all found with ${score} points `)
    toast(`Excellent! You found all the words and scored ${score} points!`)
  } else {
    addActivity(`Word Hunt: ${foundWords.size} found with ${score} points `)
    toast(`Time's up! The remaining words are now revealed. You found ${foundWords.size} of ${WORDS.length}.`)
  }
  const percent = Math.round((foundWords.size / WORDS.length) * 100)
  state.wordHuntBestScore =  Math.max(state.wordHuntBestScore, percent);
  state.wordHuntFoundWords = Math.max(state.wordHuntFoundWords, foundWords.size)
  saveState()
  messageElement.textContent = won
    ? `Excellent! You found all the words and scored ${score} points!`
    : `Time's up! The remaining words are now revealed. You found ${foundWords.size} of ${WORDS.length}.`;
  boardElement.querySelectorAll(".cell").forEach(cell => {
    cell.disabled = true;
  });
}


function startGame() {
  clearInterval(timerId);

  score = 0;
  timeLeft = GAME_TIME;
  foundWords = new Set();
  selectedStart = null;
  gameOver = false;
    correctCells.clear();
    document.getElementById("closewh").textContent = "Close"
  document.getElementById("restart").style.display = "inline-block"
  generatePuzzle();
  renderBoard();
  renderWords();
  updateStats();
  updateTimer();

  messageElement.textContent =
    "Tap a starting letter, then tap the ending letter.";
  startTimer();
}

restartButton.addEventListener("click", startGame);

function wordHuntStart() {
    pushAppModalHistory("word-hunt", closeWordHuntWindow);
    document.getElementById("wordHuntCard").classList.add("active");
    document.getElementById("overlay").classList.add("active");
    startGame();
}

function wordHuntClose() {
    closeAppModalHistory("word-hunt", closeWordHuntWindow);
}

function closeWordHuntWindow() {
    clearInterval(timerId)
    document.getElementById("overlay").classList.remove("active");
    document.getElementById('wordHuntCard').style.animation = 'lesson-detail-animationOut 0.3s ease forwards';
    setTimeout(() => {
        document.getElementById('wordHuntCard').style.animation = '';
        document.getElementById("wordHuntCard").classList.remove("active");
        if (gameOver) {
            navigate("results")
        }
    }, 300);
}
