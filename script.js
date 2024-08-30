const statusDisplay = document.querySelector('.game--status');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const savePlayersButton = document.getElementById('save-players');

let gameActive = false; // Initially, the game is not active
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let player1Name = "";
let player2Name = "";

const winningMessage = () => `${currentPlayer === 'X' ? player1Name : player2Name} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer === 'X' ? player1Name : player2Name}'s turn`;

function startGame() {
    if (player1Name && player2Name) {
        gameActive = true; // Activate the game
        statusDisplay.innerHTML = currentPlayerTurn();
    }
}

savePlayersButton.addEventListener('click', () => {
    player1Name = player1Input.value || "Player 1";
    player2Name = player2Input.value || "Player 2";
    alert(`${player1Name} has X and ${player2Name} has O. Now start the game!`);
    startGame();
});

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }

    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }

    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = false;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = "Game has been reset. Enter player names and save to start.";
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
