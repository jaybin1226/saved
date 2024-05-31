const gameContainer = document.getElementById('gameContainer');
const player = document.getElementById('player');
const timerElement = document.getElementById('timer');
const gameOverScreen = document.getElementById('gameOver');
const retryButton = document.getElementById('retryButton');
const finalTimeElement = document.getElementById('finalTime');
let playerX = window.innerWidth / 2;
let playerY = window.innerHeight / 2;
const playerSpeed = 20;  // Increased player speed (2x)
const laserSpeed = 4;    // Increased laser speed
let lasers = [];
let gameOver = false;
let laserCreationInterval = 1000;  // Initial laser creation interval
let laserCreationTimer;
let gameTimer;
let elapsedTime = 0;

function movePlayer(event) {
    if (gameOver) return;

    switch (event.key) {
        case 'ArrowUp':
            playerY -= playerSpeed;
            break;
        case 'ArrowDown':
            playerY += playerSpeed;
            break;
        case 'ArrowLeft':
            playerX -= playerSpeed;
            break;
        case 'ArrowRight':
            playerX += playerSpeed;
            break;
    }

    playerX = Math.max(0, Math.min(window.innerWidth - 50, playerX));
    playerY = Math.max(0, Math.min(window.innerHeight - 50, playerY));

    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
}

function createLaser() {
    if (gameOver) return;

    const laser = document.createElement('div');
    laser.classList.add('laser');

    const side = Math.floor(Math.random() * 4);
    let pos;

    switch (side) {
        case 0: // Top
            laser.style.top = '0px';
            laser.style.left = Math.random() * window.innerWidth + 'px';
            pos = { x: parseInt(laser.style.left), y: 0 };
            break;
        case 1: // Bottom
            laser.style.bottom = '0px';
            laser.style.left = Math.random() * window.innerWidth + 'px';
            pos = { x: parseInt(laser.style.left), y: window.innerHeight };
            break;
        case 2: // Left
            laser.style.left = '0px';
            laser.style.top = Math.random() * window.innerHeight + 'px';
            pos = { x: 0, y: parseInt(laser.style.top) };
            break;
        case 3: // Right
            laser.style.right = '0px';
            laser.style.top = Math.random() * window.innerHeight + 'px';
            pos = { x: window.innerWidth, y: parseInt(laser.style.top) };
            break;
    }

    gameContainer.appendChild(laser);
    lasers.push({ element: laser, position: pos, direction: side });
}

function moveLasers() {
    if (gameOver) return;

    lasers.forEach((laser, index) => {
        switch (laser.direction) {
            case 0: // From Top
                laser.position.y += laserSpeed;
                laser.element.style.top = laser.position.y + 'px';
                break;
            case 1: // From Bottom
                laser.position.y -= laserSpeed;
                laser.element.style.top = laser.position.y + 'px';
                break;
            case 2: // From Left
                laser.position.x += laserSpeed;
                laser.element.style.left = laser.position.x + 'px';
                break;
            case 3: // From Right
                laser.position.x -= laserSpeed;
                laser.element.style.left = laser.position.x + 'px';
                break;
        }

        if (checkCollision(player, laser.element)) {
            endGame();
        }

        if (laser.position.x < 0 || laser.position.x > window.innerWidth ||
            laser.position.y < 0 || laser.position.y > window.innerHeight) {
            laser.element.remove();
            lasers.splice(index, 1);
        }
    });
}

function checkCollision(player, laser) {
    const playerRect = player.getBoundingClientRect();
    const laserRect = laser.getBoundingClientRect();

    return !(playerRect.right < laserRect.left || 
             playerRect.left > laserRect.right || 
             playerRect.bottom < laserRect.top || 
             playerRect.top > laserRect.bottom);
}

function endGame() {
    gameOver = true;
    gameOverScreen.style.display = 'block';
    clearInterval(laserCreationTimer);  // Stop laser creation
    clearInterval(gameTimer);  // Stop game timer
    finalTimeElement.textContent = `You survived for ${elapsedTime} seconds.`;
}

function restartGame() {
    gameOver = false;
    gameOverScreen.style.display = 'none';
    lasers.forEach(laser => laser.element.remove());
    lasers = [];
    playerX = window.innerWidth / 2;
    playerY = window.innerHeight / 2;
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
    laserCreationInterval = 1000;  // Reset laser creation interval
    elapsedTime = 0;
    timerElement.textContent = `Time: 0s`;
    startLaserCreation();
    startGameTimer();
}

function startLaserCreation() {
    laserCreationTimer = setInterval(() => {
        createLaser();
        // Speed up laser creation by decreasing the interval
        if (laserCreationInterval > 200) {  // Prevent the interval from getting too short
            clearInterval(laserCreationTimer);
            laserCreationInterval -= 50;
            startLaserCreation();
        }
    }, laserCreationInterval);
}

function startGameTimer() {
    gameTimer = setInterval(() => {
        elapsedTime++;
        timerElement.textContent = `Time: ${elapsedTime}s`;
    }, 1000);
}

document.addEventListener('keydown', movePlayer);
retryButton.addEventListener('click', restartGame);
startLaserCreation();
startGameTimer();
setInterval(moveLasers, 20);
