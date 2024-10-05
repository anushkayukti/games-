// Tic Tac Toe
let tttBoard = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';

function makeMove(index) {
    if (tttBoard[index] === '') {
        tttBoard[index] = currentPlayer;
        document.getElementById('ttt-grid').children[index].innerText = currentPlayer;
        if (checkWinner()) {
            document.getElementById('ttt-status').innerText = currentPlayer + ' wins!';
        } else if (tttBoard.every(cell => cell)) {
            document.getElementById('ttt-status').innerText = 'It\'s a draw!';
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function resetTicTacToe() {
    tttBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    const cells = document.getElementById('ttt-grid').children;
    for (let i = 0; i < cells.length; i++) {
        cells[i].innerText = '';
    }
    document.getElementById('ttt-status').innerText = '';
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        if (tttBoard[a] && tttBoard[a] === tttBoard[b] && tttBoard[a] === tttBoard[c]) {
            return true;
        }
    }
    return false;
}

// Snake Game
const snakeCanvas = document.getElementById('snakeCanvas');
const ctx = snakeCanvas.getContext('2d');
let snake = [{ x: 5, y: 5 }];
let food = {};
let direction = { x: 0, y: 0 };
let score = 0;

function drawSnake() {
    ctx.clearRect(0, 0, snakeCanvas.width, snakeCanvas.height);
    snake.forEach(part => {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x * 10, part.y * 10, 10, 10);
    });
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
}

function generateFood() {
    food.x = Math.floor(Math.random() * (snakeCanvas.width / 10));
    food.y = Math.floor(Math.random() * (snakeCanvas.height / 10));
}

function updateSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }
    if (head.x < 0 || head.x >= snakeCanvas.width / 10 || head.y < 0 || head.y >= snakeCanvas.height / 10 || checkCollision(head)) {
        alert('Game Over! Score: ' + score);
        resetSnake();
    }
}

function checkCollision(head) {
    return snake.some((part, index) => index !== 0 && part.x === head.x && part.y === head.y);
}

function resetSnake() {
    snake = [{ x: 5, y: 5 }];
    score = 0;
    direction = { x: 0, y: 0 };
    generateFood();
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp': direction = { x: 0, y: -1 }; break;
        case 'ArrowRight': direction = { x: 1, y: 0 }; break;
        case 'ArrowDown': direction = { x: 0, y: 1 }; break;
        case 'ArrowLeft': direction = { x: -1, y: 0 }; break;
    }
});

setInterval(() => {
    updateSnake();
    drawSnake();
}, 100);

// Car Race
let car = document.getElementById('car');
let carPosition = 0;

function resetCarRace() {
    carPosition = 0;
    car.style.bottom = carPosition + 'px';
}

function moveCar(event) {
    if (event.key === 'ArrowUp' && carPosition < 260) {
        carPosition += 10;
        car.style.bottom = carPosition + 'px';
    }
}

document.addEventListener('keydown', moveCar);

function showGame(game) {
    document.querySelectorAll('.game').forEach(g => g.style.display = 'none');
    document.getElementById(game).style.display = 'block';
    if (game === 'snake') {
        resetSnake();
        generateFood();
    }
    if (game === 'carRace') {
        resetCarRace();
    }
}