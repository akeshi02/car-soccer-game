// Physics Engine
const PHYSICS = {
    GRAVITY: 9.81,
    AIR_RESISTANCE: 0.99,
    GROUND_FRICTION: 0.95,
    ANGULAR_FRICTION: 0.9,
    MAX_VELOCITY: 50,
    COLLISION_DAMPING: 0.8,
    BOUNCE_DAMPING: 0.6
};

class PhysicsBody {
    constructor(position = {x: 0, y: 0, z: 0}, mass = 1) {
        this.position = {...position};
        this.velocity = {x: 0, y: 0, z: 0};
        this.acceleration = {x: 0, y: 0, z: 0};
        this.mass = mass;
        this.friction = PHYSICS.GROUND_FRICTION;
    }
    applyForce(force) {
        this.acceleration.x += force.x / this.mass;
        this.acceleration.y += force.y / this.mass;
        this.acceleration.z += force.z / this.mass;
    }
    update(deltaTime = 1 / 60) {
        this.acceleration.z -= PHYSICS.GRAVITY;
        this.velocity.x += this.acceleration.x * deltaTime;
        this.velocity.y += this.acceleration.y * deltaTime;
        this.velocity.z += this.acceleration.z * deltaTime;
        this.velocity.x *= PHYSICS.AIR_RESISTANCE;
        this.velocity.y *= PHYSICS.AIR_RESISTANCE;
        this.velocity.z *= PHYSICS.AIR_RESISTANCE;
        const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2 + this.velocity.z ** 2);
        if (speed > PHYSICS.MAX_VELOCITY) {
            const scale = PHYSICS.MAX_VELOCITY / speed;
            this.velocity.x *= scale;
            this.velocity.y *= scale;
            this.velocity.z *= scale;
        }
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
        this.position.z += this.velocity.z * deltaTime;
        this.acceleration = {x: 0, y: 0, z: 0};
    }
    distance(other) {
        const dx = other.position.x - this.position.x;
        const dy = other.position.y - this.position.y;
        const dz = other.position.z - this.position.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
}
