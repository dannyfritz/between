class Game {
  private startTime: Date;
  private lastTime: Date;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private rect: Rectangle;
  public constructor () {
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.rect = new Rectangle(0, 0, 10, 10);
    this.startTime = new Date();
    this.lastTime = this.startTime;
    this.run();
  }
  private run() {
    const now = new Date();
    const dt = (now.getTime() - this.lastTime.getTime());
    this.lastTime = now;
    this.update(dt);
    this.draw();
    requestAnimationFrame(this.run.bind(this));
  }
  private update (dt: number) {
    console.log(dt);
    this.rect.update(dt);
  }
  private draw () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.rect.draw(this.context);
  }
}

class Vector2d {
  public x: number;
  public y: number;
  public constructor (x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

class Rectangle {
  private position: Vector2d;
  private width: number;
  private height: number;
  public constructor (x: number, y: number, width: number, height: number) {
    this.position = new Vector2d(x, y);
    this.width = width;
    this.height = height;
  }
  public update (dt: number) {
    this.position.x += dt / 1000
  }
  public draw (context: CanvasRenderingContext2D) {
    context.fillStyle = "rgb(200,0,0)";
    context.fillRect(
      this.position.x, this.position.y,
      this.width, this.height);
  }
}

const game = new Game();
