class MovingObject {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.color = options.color;
        this.size = options.size
    }

    draw(ctx) {

        ctx.fillStyle = this.color;
        let x = this.pos[0];
        let y = this.pos[1];

        ctx.fillRect(x, y, this.size, this.size);
    }

    move(offsetX, offsetY) {
        let x = this.pos[0];
        let y = this.pos[1];

        this.pos = [x + this.vel, y];
    }
}

export default MovingObject