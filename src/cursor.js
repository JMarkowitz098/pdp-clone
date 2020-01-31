class Cursor {
    constructor(options) {
        this.pos = options.pos;
        this.vel = options.vel;
        this.color = "black";
        this.size = 50;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.lineWidth = "6";
        let x = this.pos[0];
        let y = this.pos[1];

        ctx.strokeRect(x, y, this.size * 2, this.size);
    }

    move() {
        let x = this.pos[0];
        let y = this.pos[1];

        if (this.pos[1] <= 50) {
            this.pos = [x, y + 50];
        } else {
            this.pos = [x, y - this.vel];
        }
    }

    changePos(dir, dimX, dimY) {
        let newX = this.pos[0] + dir[0];
        let newY = this.pos[1] + dir[1];
        let data = {
            x: newX,
            y: newY,
            dimX: dimX,
            dimY: dimY
        }

        if (this.validMove(data)) this.pos = [newX, newY];
    }

    validMove(data) {
        if (data.x > data.dimX - 200 || data.x < 0) {
            return false;
        } else if (data.y > data.dimY - 100 || data.y < 50) {
            return false;
        } else {
            return true;
        }
    }
}

export default Cursor;