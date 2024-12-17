const board = document.getElementById('game-board');
const statusDisplay = document.getElementById('game-status');
const cells = [];
let currentPlayer = 'X';
let gameActive = true;

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

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i; 
        board.appendChild(cell);
        cells.push(cell);

        cell.addEventListener('click', handleCellClick);
    }
}


function handleCellClick(event) {
    const clickedCell = event.target;

    if (clickedCell.textContent || !gameActive) {
        return; 
    }

    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('taken');

    checkForWin();
    switchPlayer();
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkForWin() {
    let roundWon = false;

    for (let condition of winningCombinations) {
        const [a, b, c] = condition;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            roundWon = true;
            highlightWinningCells([cells[a], cells[b], cells[c]]);
            endGame(`Player ${currentPlayer} Wins! 🎉`);
            return;
        }
    }

    if (cells.every(cell => cell.textContent)) {
        endGame("It's a Draw! 🤝");
    }
}

function highlightWinningCells(winningCells) {
    for (let cell of winningCells) {
        cell.classList.add('win');
    }
}

function endGame(message) {
    gameActive = false;
    statusDisplay.textContent = message;

    setTimeout(() => {
        restartGame();
    }, 2000); 
}

function restartGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken', 'win');
    });
    currentPlayer = 'X';
    gameActive = true;
    statusDisplay.textContent = "Player X's Turn";
}

createBoard();
