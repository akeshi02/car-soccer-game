// Global Game State
let gameState = {
    isPlaying: false,
    isPaused: false,
    currentMenu: 'features',
    selectedCar: 'speed-demon',
    selectedStadium: 'neon-arena',
    carColor: '#00d4ff',
    trailEffect: 'neon',
    score: {
        blue: 0,
        orange: 0
    },
    gameTime: 300
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 3D Car Soccer Game Initialized');
    initializeGame();
    setupEventListeners();
});

function initializeGame() {
    const heroCanvas = document.getElementById('hero-canvas');
    if (heroCanvas) {
        setupHeroAnimation(heroCanvas);
    }
    initializeAudio();
}

function setupEventListeners() {
    document.querySelectorAll('.car-card').forEach(card => {
        card.addEventListener('click', () => {
            selectCar(card.dataset.car);
        });
    });

    document.querySelectorAll('.stadium-card').forEach(card => {
        card.addEventListener('click', () => {
            selectStadium(card.dataset.stadium);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (gameState.isPaused) {
                resumeGame();
            }
        }
    });
}

function startGame() {
    console.log('🎮 Starting game with car:', gameState.selectedCar);
    document.getElementById('hero-screen').classList.remove('active');
    document.getElementById('main-menu').classList.remove('active');
    document.getElementById('game-canvas').classList.add('active');
    document.getElementById('hud').classList.remove('hidden');

    gameState.isPlaying = true;
    gameState.isPaused = false;

    initGame();
    playGame();
}

function showMenu(section) {
    document.getElementById('main-menu').classList.add('active');
    switchMenuSection(section);
}

function switchMenuSection(section) {
    document.querySelectorAll('.menu-section').forEach(sec => {
        sec.classList.remove('active');
    });
    const targetSection = document.getElementById(section + '-menu');
    if (targetSection) {
        targetSection.classList.add('active');
    }
    gameState.currentMenu = section;
}

function closeMenu() {
    document.getElementById('main-menu').classList.remove('active');
}

function selectCar(carId) {
    gameState.selectedCar = carId;
    document.querySelectorAll('.car-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-car="${carId}"]`).classList.add('active');
    playSound('select');
}

function selectStadium(stadiumId) {
    gameState.selectedStadium = stadiumId;
    document.querySelectorAll('.stadium-card').forEach(card => {
        card.classList.remove('active');
    });
    document.querySelector(`[data-stadium="${stadiumId}"]`).classList.add('active');
    playSound('select');
}

function setCarColor(color) {
    gameState.carColor = color;
    playSound('select');
}

function setTrailEffect(effect) {
    gameState.trailEffect = effect;
    playSound('select');
}

function pauseGame() {
    if (!gameState.isPlaying) return;
    gameState.isPaused = true;
    document.getElementById('pause-menu').classList.add('active');
    playSound('pause');
}

function resumeGame() {
    if (!gameState.isPlaying) return;
    gameState.isPaused = false;
    document.getElementById('pause-menu').classList.remove('active');
    playSound('resume');
}

function returnToMenu() {
    gameState.isPlaying = false;
    gameState.isPaused = false;
    document.getElementById('game-canvas').classList.remove('active');
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('pause-menu').classList.remove('active');
    document.getElementById('hero-screen').classList.add('active');
    cleanupGame();
}

function toggleSettings() {
    playSound('select');
}

function setupHeroAnimation(canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    });

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = 'rgba(0, 212, 255, 0.1)';
        ctx.lineWidth = 1;

        const gridSize = 50;
        for (let i = 0; i < canvas.width; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
        }
        for (let i = 0; i < canvas.height; i += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, i);
            ctx.lineTo(canvas.width, i);
            ctx.stroke();
        }

        ctx.fillStyle = 'rgba(0, 212, 255, 0.3)';
        for (let i = 0; i < 20; i++) {
            const x = (Math.sin(Date.now() / 1000 + i) * canvas.width) / 2 + canvas.width / 2;
            const y = (Math.cos(Date.now() / 1500 + i) * canvas.height) / 2 + canvas.height / 2;
            ctx.beginPath();
            ctx.arc(x, y, 2, 0, Math.PI * 2);
            ctx.fill();
        }

        requestAnimationFrame(animate);
    }

    animate();
}

document.addEventListener('keydown', (e) => {
    if (!gameState.isPlaying || gameState.isPaused) return;
    handleGameInput(e);
});

function updateBoostDisplay(boostPercent) {
    const boostFill = document.getElementById('boost-fill');
    const boostText = document.getElementById('boost-text');
    if (boostFill) boostFill.style.width = boostPercent + '%';
    if (boostText) boostText.textContent = `BOOST: ${Math.round(boostPercent)}%`;
}

function updateScoreDisplay() {
    const blueScore = document.getElementById('blue-score');
    const orangeScore = document.getElementById('orange-score');
    if (blueScore) blueScore.textContent = gameState.score.blue;
    if (orangeScore) orangeScore.textContent = gameState.score.orange;
}

function updateTimerDisplay() {
    const timer = document.getElementById('timer');
    if (!timer) return;
    const minutes = Math.floor(gameState.gameTime / 60);
    const seconds = Math.floor(gameState.gameTime % 60);
    timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

console.log('%c🚗 3D Car Soccer', 'color: #00d4ff; font-size: 20px; font-weight: bold;');
console.log('%cVersion 1.0.0', 'color: #ff006e; font-size: 12px;');
