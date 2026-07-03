let canvas, ctx;
let gameObjects = {
    player: null,
    opponent: null,
    ball: null,
    obstacles: [],
    particles: []
};

let gameCamera = {
    x: 0,
    y: 0,
    z: 50,
    targetX: 0,
    targetY: 0,
    targetZ: 50,
    fov: 75
};

function initGame() {
    console.log('🎮 Initializing game...');
    canvas = document.getElementById('game-canvas');
    ctx = canvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    initializeGameObjects();
    startGameLoop();
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initializeGameObjects() {
    gameObjects.player = createCar({x: -20, y: 0, z: 0}, 'player', gameState.selectedCar, gameState.carColor);
    gameObjects.opponent = createCar({x: 20, y: 0, z: 0}, 'opponent', 'balanced-rider', '#ff006e');
    gameObjects.ball = createBall({x: 0, y: 0, z: 10});
    createStadium(gameState.selectedStadium);
}

function createCar(position, team, type, color) {
    return {
        position: {...position},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        type: type,
        team: team,
        color: color,
        width: 2,
        length: 3,
        height: 1.5,
        boost: 100,
        maxBoost: 100,
        isGrounded: true,
        canDoubleJump: false,
        moveForce: 200,
        boostForce: 500,
        jumpForce: 15,
        mass: 2,
        friction: 0.95,
        trailParticles: [],
        health: 100
    };
}

function createBall(position) {
    return {
        position: {...position},
        velocity: {x: 0, y: 0, z: 0},
        rotation: {x: 0, y: 0, z: 0},
        radius: 0.7,
        mass: 1,
        friction: 0.98,
        bounceDamping: 0.6,
        trail: []
    };
}

function playGame() {
    console.log('▶️ Game loop started');
}

function startGameLoop() {
    function loop() {
        if (gameState.isPlaying && !gameState.isPaused) {
            update();
            render();
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
}

function update() {
    if (gameState.gameTime > 0) {
        gameState.gameTime -= 1 / 60;
    }

    updateCar(gameObjects.player);
    updateOpponentAI(gameObjects.opponent);
    updateBall(gameObjects.ball);
    checkCollisions();
    updateCamera();
    updateHUD();
}

function updateCar(car) {
    car.velocity.z -= 9.81 / 60;
    car.velocity.x *= car.friction;
    car.velocity.y *= car.friction;
    car.position.x += car.velocity.x / 60;
    car.position.y += car.velocity.y / 60;
    car.position.z += car.velocity.z / 60;

    if (car.position.z <= car.height / 2) {
        car.position.z = car.height / 2;
        car.velocity.z = 0;
        car.isGrounded = true;
        car.canDoubleJump = true;
    } else {
        car.isGrounded = false;
    }

    if (car.boost < car.maxBoost) {
        car.boost += 20 / 60;
        if (car.boost > car.maxBoost) car.boost = car.maxBoost;
    }
}

function updateBall(ball) {
    ball.velocity.z -= 9.81 / 60;
    ball.velocity.x *= ball.friction;
    ball.velocity.y *= ball.friction;
    ball.velocity.z *= ball.friction;
    ball.position.x += ball.velocity.x / 60;
    ball.position.y += ball.velocity.y / 60;
    ball.position.z += ball.velocity.z / 60;

    if (ball.position.z <= ball.radius) {
        ball.position.z = ball.radius;
        ball.velocity.z *= -ball.bounceDamping;
    }

    ball.trail.push({...ball.position});
    if (ball.trail.length > 50) {
        ball.trail.shift();
    }
}

function updateOpponentAI(opponent) {
    const dx = gameObjects.ball.position.x - opponent.position.x;
    const dy = gameObjects.ball.position.y - opponent.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 2) {
        const force = 50;
        opponent.velocity.x += (dx / distance) * force / 60;
        opponent.velocity.y += (dy / distance) * force / 60;
    }
    updateCar(opponent);
}

function checkCollisions() {
    checkCarBallCollision(gameObjects.player, gameObjects.ball);
    checkCarBallCollision(gameObjects.opponent, gameObjects.ball);
    checkCarCarCollision(gameObjects.player, gameObjects.opponent);

    if (gameObjects.ball.position.y > 60) {
        gameState.score.blue++;
        resetGameObjects();
        playSound('goal');
    } else if (gameObjects.ball.position.y < -60) {
        gameState.score.orange++;
        resetGameObjects();
        playSound('goal');
    }
}

function checkCarBallCollision(car, ball) {
    const dx = ball.position.x - car.position.x;
    const dy = ball.position.y - car.position.y;
    const dz = ball.position.z - car.position.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const minDistance = car.width / 2 + car.length / 2 + ball.radius;

    if (distance < minDistance) {
        const nx = dx / distance;
        const ny = dy / distance;
        const nz = dz / distance;
        const impulseMagnitude = 20;
        ball.velocity.x = nx * impulseMagnitude;
        ball.velocity.y = ny * impulseMagnitude;
        ball.velocity.z = nz * impulseMagnitude + 5;
        ball.position.x = car.position.x + nx * minDistance;
        ball.position.y = car.position.y + ny * minDistance;
        ball.position.z = car.position.z + nz * minDistance;
        playSound('collision');
    }
}

function checkCarCarCollision(car1, car2) {
    const dx = car2.position.x - car1.position.x;
    const dy = car2.position.y - car1.position.y;
    const dz = car2.position.z - car1.position.z;
    const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const minDistance = car1.width + car2.width;

    if (distance < minDistance) {
        const nx = dx / distance;
        const ny = dy / distance;
        const overlap = minDistance - distance;
        car1.position.x -= nx * overlap / 2;
        car1.position.y -= ny * overlap / 2;
        car2.position.x += nx * overlap / 2;
        car2.position.y += ny * overlap / 2;
        playSound('collision');
    }
}

function updateCamera() {
    gameCamera.targetX = gameObjects.player.position.x;
    gameCamera.targetY = gameObjects.player.position.y - 15;
    gameCamera.targetZ = gameObjects.player.position.z + 8;
    gameCamera.x += (gameCamera.targetX - gameCamera.x) * 0.1;
    gameCamera.y += (gameCamera.targetY - gameCamera.y) * 0.1;
    gameCamera.z += (gameCamera.targetZ - gameCamera.z) * 0.1;
}

function updateHUD() {
    updateScoreDisplay();
    updateTimerDisplay();
    updateBoostDisplay(gameObjects.player.boost);
}

function resetGameObjects() {
    gameObjects.ball.position = {x: 0, y: 0, z: 10};
    gameObjects.ball.velocity = {x: 0, y: 0, z: 0};
    gameObjects.player.position = {x: -20, y: -30, z: 1};
    gameObjects.player.velocity = {x: 0, y: 0, z: 0};
    gameObjects.opponent.position = {x: 20, y: 30, z: 1};
    gameObjects.opponent.velocity = {x: 0, y: 0, z: 0};
}

function render() {
    ctx.fillStyle = 'rgba(5, 8, 17, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, 'rgba(10, 14, 39, 0.8)');
    gradient.addColorStop(0.5, 'rgba(26, 15, 58, 0.6)');
    gradient.addColorStop(1, 'rgba(10, 14, 39, 0.8)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drawStadium();
    drawBallTrail(gameObjects.ball);
    drawCar(gameObjects.player);
    drawCar(gameObjects.opponent);
    drawBall(gameObjects.ball);

    for (let i = gameObjects.particles.length - 1; i >= 0; i--) {
        const particle = gameObjects.particles[i];
        particle.lifetime -= 1 / 60;
        if (particle.lifetime <= 0) {
            gameObjects.particles.splice(i, 1);
        } else {
            drawParticle(particle);
            particle.position.x += particle.velocity.x / 60;
            particle.position.y += particle.velocity.y / 60;
            particle.position.z += particle.velocity.z / 60;
        }
    }
}

function drawCar(car) {
    const screenX = car.position.x - gameCamera.x + canvas.width / 2;
    const screenY = car.position.y - gameCamera.y + canvas.height / 2;
    const scale = gameCamera.z / (car.position.z + gameCamera.z);
    ctx.save();
    ctx.globalAlpha = 0.9 + Math.sin(Date.now() / 200) * 0.1;
    ctx.fillStyle = car.color;
    ctx.shadowColor = car.color;
    ctx.shadowBlur = 20;
    ctx.fillRect(screenX - (car.width * scale) / 2, screenY - (car.length * scale) / 2, car.width * scale, car.length * scale);
    ctx.strokeStyle = car.color;
    ctx.lineWidth = 2;
    ctx.strokeRect(screenX - (car.width * scale) / 2, screenY - (car.length * scale) / 2, car.width * scale, car.length * scale);
    ctx.restore();
}

function drawBall(ball) {
    const screenX = ball.position.x - gameCamera.x + canvas.width / 2;
    const screenY = ball.position.y - gameCamera.y + canvas.height / 2;
    ctx.save();
    ctx.fillStyle = '#ffff00';
    ctx.shadowColor = '#ffff00';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(screenX, screenY, ball.radius * 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

function drawBallTrail(ball) {
    ctx.strokeStyle = 'rgba(255, 255, 0, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ball.trail.forEach((point, index) => {
        const screenX = point.x - gameCamera.x + canvas.width / 2;
        const screenY = point.y - gameCamera.y + canvas.height / 2;
        if (index === 0) {
            ctx.moveTo(screenX, screenY);
        } else {
            ctx.lineTo(screenX, screenY);
        }
    });
    ctx.stroke();
}

function drawParticle(particle) {
    const screenX = particle.position.x - gameCamera.x + canvas.width / 2;
    const screenY = particle.position.y - gameCamera.y + canvas.height / 2;
    ctx.fillStyle = particle.color;
    ctx.globalAlpha = particle.lifetime / particle.maxLifetime;
    ctx.shadowColor = particle.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(screenX, screenY, particle.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
}

function drawStadium() {
    ctx.strokeStyle = 'rgba(0, 212, 255, 0.3)';
    ctx.lineWidth = 3;
    const fieldWidth = 100;
    const fieldHeight = 130;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.strokeRect(centerX - fieldWidth / 2, centerY - fieldHeight / 2, fieldWidth, fieldHeight);
    ctx.setLineDash([10, 10]);
    ctx.beginPath();
    ctx.moveTo(centerX - fieldWidth / 2, centerY);
    ctx.lineTo(centerX + fieldWidth / 2, centerY);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(0, 212, 255, 0.2)';
    ctx.fillRect(centerX - 20, centerY - fieldHeight / 2 - 10, 40, 10);
    ctx.fillRect(centerX - 20, centerY + fieldHeight / 2, 40, 10);
}

function cleanupGame() {
    gameObjects = {player: null, opponent: null, ball: null, obstacles: [], particles: []};
    gameState.score = {blue: 0, orange: 0};
    gameState.gameTime = 300;
}
