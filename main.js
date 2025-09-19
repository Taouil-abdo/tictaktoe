// choosing the game piece
const radiobtnX = document.getElementById('x');
const radiobtnO = document.getElementById('o');
const player1 = document.getElementById('player-1');
const player2 = document.getElementById('player-2');
const xWinsSpan = document.getElementById('x-wins');
const oWinsSpan = document.getElementById('o-wins');
let choose = false;
let board = [];
let currentPlayer = 'X';
let gameOver = false;
let xWins = parseInt(localStorage.getItem('xWins')) || 0;
let oWins = parseInt(localStorage.getItem('oWins')) || 0;
xWinsSpan.textContent = xWins;
oWinsSpan.textContent = oWins;

radiobtnX.addEventListener('change', function () {
    if (radiobtnX.checked) {
        player1.textContent = 'player 1 : X';
        player2.textContent = 'player 2 : O';
        choose = true;
    }
});

radiobtnO.addEventListener('change', function () {
    if (radiobtnO.checked) {
        player1.textContent = 'player 1 : O';
        player2.textContent = 'player 2 : X';
        choose = true;
    }
});

// the game management Zone
const boradDiv = document.getElementById('board');
const startGameBtn = document.getElementById('start-game');

function checkWin(board, row, col) {
    const size = board.length;
    const player = board[row][col];

    let rowWin = true;
    for (let j = 0; j < size; j++) {
        if (board[row][j] !== player) {
            rowWin = false;
            break;
        }
    }
    if (rowWin) return true;

    let colWin = true;
    for (let i = 0; i < size; i++) {
        if (board[i][col] !== player) {
            colWin = false;
            break;
        }
    }
    if (colWin) return true;

    if (row === col) {
        let diag1Win = true;
        for (let i = 0; i < size; i++) {
            if (board[i][i] !== player) {
                diag1Win = false;
                break;
            }
        }
        if (diag1Win) return true;
    }

    if (row + col === size - 1) {
        let diag2Win = true;
        for (let i = 0; i < size; i++) {
            if (board[i][size - 1 - i] !== player) {
                diag2Win = false;
                break;
            }
        }
        if (diag2Win) return true;
    }

    return false;
}

function isDraw(board) {
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

startGameBtn.addEventListener('click', function (e) {
    if (!choose) {
        alert('please choose your game piece');
        return;
    }
    const boardSize = parseInt(document.getElementById('board-size').value);

    e.preventDefault();
    boradDiv.innerHTML = '';
    board = [];
    for (let i = 0; i < boardSize; i++) {
        board[i] = [];
        for (let j = 0; j < boardSize; j++) {
            board[i][j] = '';
        }
    }
    gameOver = false;
    currentPlayer = radiobtnX.checked ? 'X' : 'O';
    for (let i = 0; i < boardSize; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        for (let j = 0; j < boardSize; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.style.width = '5rem';
            cell.style.height = '5rem';
            cell.style.border = '2px solid gray';
            cell.style.display = 'flex';
            cell.style.color= '#3c3c3c';

            cell.id = `cell-${i}-${j}`;
            row.appendChild(cell);
        }
        boradDiv.appendChild(row);
    }
    const cells = document.querySelectorAll('.cell');
    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', function () {
            if (gameOver || cells[i].textContent !== '') {
                return;
            }
            const idParts = cells[i].id.split('-');
            const row = parseInt(idParts[1]);
            const col = parseInt(idParts[2]);
            cells[i].textContent = currentPlayer;
            board[row][col] = currentPlayer;
            if (checkWin(board, row, col)) {
                alert(`Player ${currentPlayer} wins!`);
                if (currentPlayer === 'X') {
                    xWins++;
                    localStorage.setItem('xWins', xWins);
                    xWinsSpan.textContent = xWins;
                } else {
                    oWins++;
                    localStorage.setItem('oWins', oWins);
                    oWinsSpan.textContent = oWins;
                }
                gameOver = true;
                return;
            }
            if (isDraw(board)) {
                alert("It's a draw!");
                gameOver = true;
                return;
            }
            // Switch player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        });
    }
});

const resetBtn = document.getElementById('Reset');
resetBtn.addEventListener('click', function () {
    boradDiv.innerHTML = '';
    board = [];
    gameOver = false;
});


// dark mode 

const themeToggle = document.getElementById('theme-toggle');
        const lightbtn = document.getElementById('light');
        const logo = document.getElementById("logo");
    
        themeToggle.addEventListener('click', () => {
            const body = document.body;
    
            body.classList.toggle('light-mode');
            body.classList.toggle('dark-mode');

            if (body.classList.contains('dark-mode')) {
                lightbtn.innerHTML = '<i class="fa-solid fa-moon" style="color: #5c77fe;"></i>';
                logo.style.color ='white';

            } else {
                lightbtn.innerHTML = '<i class="fa-solid fa-sun" style="color: #FFD43B;"></i>';
                logo.style.color ='black';

            }
        });