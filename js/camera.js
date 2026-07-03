// Camera System
function setupCamera() {
    console.log('📷 Camera initialized');
}

function updateCameraView(camera, target) {
    if (!camera || !target) return;
    camera.targetX = target.x;
    camera.targetY = target.y - 15;
    camera.targetZ = target.z + 8;
}
