// variable to track if the player wins
let playerWon = false;

// Canvas 
const canvas = document.getElementById('infoCanvas');
const ctx = canvas.getContext('2d');

//Font Setup
ctx.fillStyle = '#00ff00';
ctx.font = '20px "Press Start 2P"';
ctx.textAlign = 'center';

// Load spaceship and alien images
const spaceshipImg = new Image();
spaceshipImg.src = 'space-ship_1970302.png'; 

const alienImg = new Image();
alienImg.src = 'file.png'; 

// Player (Spaceship) setup
const player = {
    x: canvas.width / 2 - 20,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    speed: 5,
    dx: 0
};

// Alien setup (Array for multiple aliens)
const aliens = [];
const alienRows = 4;
const alienColumns = 6;
const alienWidth = 40;
const alienHeight = 40;
const alienSpeed = 2;

// Create the grid of aliens
for (let row = 0; row < alienRows; row++) {
    for (let col = 0; col < alienColumns; col++) {
        aliens.push({
            x: col * (alienWidth + 10) + 20,
            y: row * (alienHeight + 10) + 20,
            width: alienWidth,
            height: alienHeight,
            dx: alienSpeed 
        });
    }
}

// Bullets
const bullets = [];
const bulletSpeed = 4;

// Score
let score = 0;
let gameOver = false;

// Audio Effects
const shootSound = new Audio('shoot.mp3');
const hitSound = new Audio('hit.mp3');
const gameOverSound = new Audio('gameover.mp3');

// Restart Game
function restartGame() {
    score = 0;
    gameOver = false;
    player.x = canvas.width / 2 - 20;
    playerWon = false;

    // Reset aliens
    aliens.length = 0;
    for (let row = 0; row < alienRows; row++) {
        for (let col = 0; col < alienColumns; col++) {
            aliens.push({
                x: col * (alienWidth + 10) + 20,
                y: row * (alienHeight + 10) + 20,
                width: alienWidth,
                height: alienHeight,
                dx: alienSpeed 
            });
        }
    }

    draw(); // Restart the game loop
}

// Draw Retro Borders
function drawBorders() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 3;
    ctx.strokeRect(10, 10, canvas.width - 20, canvas.height - 20);
}


function drawPlayer() {
   ctx.drawImage(spaceshipImg, player.x, player.y, player.width, player.height);
}

// Draw Aliens
function drawAliens() {
   aliens.forEach(alien => {
        ctx.drawImage(alienImg, alien.x, alien.y, alien.width, alien.height);
    });
}

// Draw Bullets
function drawBullets() {
    ctx.fillStyle = '#ff0000';
    bullets.forEach(bullet => {
        ctx.fillRect(bullet.x, bullet.y, 5, 10);
    });
}

// Move Player (Spaceship)
function movePlayer() {
    player.x += player.dx;
    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;
}

// Move Aliens
function moveAliens() {
    aliens.forEach(alien => {
    alien.x += alien.dx;
    if (alien.x + alien.width > canvas.width || alien.x < 0) {
    alien.dx = -alien.dx;
    alien.y += 20;
        }

        // if collision with player
        if (
            alien.x < player.x + player.width &&
            alien.x + alien.width > player.x &&
            alien.y < player.y + player.height &&
            alien.y + alien.height > player.y
        ) {
            gameOverSound.play();
            gameOver = true;
        }
    });
}

// Move Bullets
function moveBullets() {
    bullets.forEach((bullet, index) => {
        bullet.y -= bulletSpeed;

        if (bullet.y < 0) bullets.splice(index, 1);
    });
}

// Check Bullet Collision
function checkBulletCollision() {
    bullets.forEach((bullet, bulletIndex) => {
        aliens.forEach((alien, alienIndex) => {
            if (bullet.x < alien.x + alien.width && bullet.x + 5 > alien.x && bullet.y < alien.y + alien.height && bullet.y + 10 > alien.y) {
                bullets.splice(bulletIndex, 1);
                aliens.splice(alienIndex, 1);
                hitSound.play();
                score += 10;
            }
        });
    });
}

// Check Win Condition
function checkWinCondition() {
    if (aliens.length === 0) {
        playerWon = true; 
        gameOver = true; 
    }
}

// Shooting
canvas.addEventListener('click', () => {
    if (gameOver) {
        restartGame(); 
    } else {
        bullets.push({ x: player.x + player.width / 2 - 2, y: player.y });
        shootSound.play();
    }
});

// Draw Score
function drawScore() {
    ctx.fillStyle = '#ff00ff';
    ctx.font = '18px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('Score: ' + score, canvas.width / 2, canvas.height - 40);
}

// Draw Game Over )
function drawGameOver() {
    ctx.fillStyle = '#ff00ff';
    ctx.font = '30px "Press Start 2P"';
    ctx.textAlign = 'center';

    if (playerWon) {
        ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2 - 30);
    } else { 
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 30);
    }

    // Draw "Restart" 
    ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = '#00ff00';
    ctx.fillText('Click to Restart', canvas.width / 2, canvas.height / 2 + 30);
}

// Draw everything
function draw() {
    if (gameOver) {
     drawGameOver();
     return;
    }
    drawBorders();
    drawPlayer();
    drawAliens();
    drawBullets();
    drawScore();
    movePlayer();
    moveAliens();
    moveBullets();
    checkBulletCollision();
    checkWinCondition(); // Check if player won
    requestAnimationFrame(draw);
}

// Start game loop after images are loaded
let imagesLoaded = 0;

spaceshipImg.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) draw();
};

alienImg.onload = () => {
    imagesLoaded++;
    if (imagesLoaded === 2) draw();
};
