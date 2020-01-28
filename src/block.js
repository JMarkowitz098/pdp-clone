class Block {
    constructor(options) {
        this.pos = options.pos;
        this.vel = 2;
        this.color = this.randColor();
        this.size = 50;
    }

    randColor() {
        const COLORS = ["red", "yellow", "green", "blue"]
        let color = COLORS[Math.floor(Math.random() * COLORS.length)];
        return color;
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