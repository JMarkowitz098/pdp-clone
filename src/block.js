class Block {
    constructor(options) {
        this.pos = options.pos;
        this.vel = 2;
        this.color = "blue";
        this.size = 60;
    }

    draw(ctx) {

        ctx.fillStyle = this.color;
        let x = this.pos[0];
        let y = this.pos[1];

        ctx.fillRect(x, y, this.size, this.size);
    }

    move() {
        let x = this.pos[0];
        let y = this.pos[1];

        this.pos = [x, y - this.vel];
    }
}

export default Block;