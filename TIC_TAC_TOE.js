const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartButton = document.querySelector("#restartButton");
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameRunning = false;

initializeGame();

function initializeGame() {
    gameRunning = true;
    cells.forEach((cell, index) => {
        cell.setAttribute("cellIndex", index);
        cell.addEventListener("click", cellClicked);
    });
    restartButton.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn`;
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !gameRunning) {
        return;
    }
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
}

function checkWinner() {
    let roundWon = false;
    let winningCells = [];

    for (let i = 0; i < winningCombinations.length; i++) {
        const [a, b, c] = winningCombinations[i];
        const cellA = options[a];
        const cellB = options[b];
        const cellC = options[c];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }
        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            winningCells = [a, b, c];
            break;
        }
    }

    if (roundWon) {
        blinkWinningCells(winningCells);
        statusText.textContent = `${currentPlayer} wins!`;
        gameRunning = false;
    } else if (!options.includes("")) {
        statusText.textContent = "DRAW!";
        gameRunning = false;
    } else {
        changePlayer();
    }
}

function blinkWinningCells(winningCells) {
    let blinkCount = 0;
    const interval = setInterval(() => {
        winningCells.forEach(index => {
            const cell = cells[index];
            cell.style.backgroundColor = (cell.style.backgroundColor == "yellow") ? "red" : "yellow";
        });
        blinkCount++;
        if (blinkCount >= 8) { // Blink 8 times (4 color changes)
            clearInterval(interval);
            winningCells.forEach(index => {
                cells[index].style.backgroundColor = "yellow"; // Ensure final color is yellow
            });
        }
    }, 100);
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.style.backgroundColor = "white"; // Reset the background color to white
    });
    gameRunning = true;
}


