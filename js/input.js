const inputState = {
    keys: {},
    mouse: {x: 0, y: 0, pressed: false},
    touch: {x: 0, y: 0, pressed: false}
};

document.addEventListener('keydown', (e) => {
    inputState.keys[e.key.toLowerCase()] = true;
    if (e.key === 'Escape') pauseGame();
});

document.addEventListener('keyup', (e) => {
    inputState.keys[e.key.toLowerCase()] = false;
});

document.addEventListener('mousemove', (e) => {
    inputState.mouse.x = e.clientX;
    inputState.mouse.y = e.clientY;
});

document.addEventListener('mousedown', () => {
    inputState.mouse.pressed = true;
});

document.addEventListener('mouseup', () => {
    inputState.mouse.pressed = false;
});

document.addEventListener('touchstart', (e) => {
    inputState.touch.x = e.touches[0].clientX;
    inputState.touch.y = e.touches[0].clientY;
    inputState.touch.pressed = true;
});

document.addEventListener('touchmove', (e) => {
    inputState.touch.x = e.touches[0].clientX;
    inputState.touch.y = e.touches[0].clientY;
});

document.addEventListener('touchend', () => {
    inputState.touch.pressed = false;
});

function handleGameInput(event) {
    const player = gameObjects.player;
    if (!player) return;
    const keys = inputState.keys;
    if (keys['w'] || keys['arrowup']) player.velocity.y += player.moveForce / 60;
    if (keys['s'] || keys['arrowdown']) player.velocity.y -= player.moveForce / 60;
    if (keys['a'] || keys['arrowleft']) player.velocity.x -= player.moveForce / 60;
    if (keys['d'] || keys['arrowright']) player.velocity.x += player.moveForce / 60;
    if ((keys[' '] || keys['space']) && player.isGrounded) {
        player.velocity.z += player.jumpForce;
        player.isGrounded = false;
        playSound('jump');
    }
    if ((keys['e'] || keys['shift']) && player.boost > 0) {
        const boostMagnitude = Math.sqrt(player.velocity.x ** 2 + player.velocity.y ** 2);
        if (boostMagnitude > 0) {
            const boostX = (player.velocity.x / boostMagnitude) * player.boostForce;
            const boostY = (player.velocity.y / boostMagnitude) * player.boostForce;
            player.velocity.x += boostX / 60;
            player.velocity.y += boostY / 60;
            player.boost -= 30 / 60;
            if (player.boost < 0) player.boost = 0;
            playSound('boost');
        }
    }
}

function handleGameInputUp(event) {}
