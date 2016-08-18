class Game {
    constructor() {
        this.canvas = document.createElement("canvas");
        document.body.appendChild(this.canvas);
        this.context = this.canvas.getContext("2d");
        this.rect = new Rectangle(0, 0, 10, 10);
        this.startTime = new Date();
        this.lastTime = this.startTime;
        this.run();
    }
    run() {
        const now = new Date();
        const dt = (now.getTime() - this.lastTime.getTime());
        this.lastTime = now;
        this.update(dt);
        this.draw();
        requestAnimationFrame(this.run.bind(this));
    }
    update(dt) {
        console.log(dt);
        this.rect.update(dt);
    }
    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.rect.draw(this.context);
    }
}
class Vector2d {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Rectangle {
    constructor(x, y, width, height) {
        this.position = new Vector2d(x, y);
        this.width = width;
        this.height = height;
    }
    update(dt) {
        this.position.x += dt / 1000;
    }
    draw(context) {
        context.fillStyle = "rgb(200,0,0)";
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
const game = new Game();
//# sourceMappingURL=index.js.map