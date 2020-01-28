class Cursor {
    constructor(options) {
        this.pos = options.pos;
        this.vel = 2;
        this.color = "black";
        this.size = 60;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.lineWidth = "6";
        let x = this.pos[0];
        let y = this.pos[1];

        ctx.strokeRect(x, y, this.size * 2, this.size);
        // ctx.strok();
    }

    move() {
        let x = this.pos[0];
        let y = this.pos[1];

        this.pos = [x, y - this.vel];
    }

    changePos(dir) {
        let newX = this.pos[0] + dir[0];
        let newY = this.pos[1] + dir[1];

        this.pos = [newX, newY];
    }
}

export default Cursor;