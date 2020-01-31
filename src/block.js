class Block {
    constructor(options) {
        this.canvPos = options.canvPos;
        this.gridPos = options.gridPos;
        this.vel = options.vel;
        this.color = options.color || this.randColor();
        this.size = 50;
    }

    randColor() {
        let tan = "rgb(237, 201, 159)";
        let brightBlue = "rgb(2, 239, 238)";
        let blue = "rgb(4, 0, 248)";
        let darkestBlue = "rgb(1, 1, 124)";
        let darkBlue = "rgb(0, 1, 203)";
        let red = "rgb(221, 81, 70)";
        let green = "rgb(83, 181, 127)";
        let blonde = "rgb(225,175,110)"
        let white = "rgb(250,244,244)"

        const COLORS = [red, brightBlue, green, darkestBlue, blue]
        let color = COLORS[Math.floor(Math.random() * COLORS.length)];
        return color;
    }

    draw(ctx) {

        ctx.fillStyle = this.color;
        let x = this.canvPos[0];
        let y = this.canvPos[1];
        // if (!this.isWhite()) ctx.strokeRect(x, y, this.size, this.size);
        if (!this.isWhite()) ctx.fillRect(x, y, this.size, this.size);

    }

    move() {
        let x = this.canvPos[0];
        let y = this.canvPos[1];

        this.canvPos = [x, y - this.vel];
    }

    matches(otherBlock) {
        return this.color === otherBlock.color;
    }

    isWhite() {
        return this.color === "white"
    }

    swapBlock(otherBlock, grid) {
        let temp = new Block({
            canvPos: this.canvPos,
            gridPos: this.gridPos,
            color: this.color
        });

        let gridRow = this.gridPos[0]
        let gridCol = this.gridPos[1]
        let newRow = otherBlock.gridPos[0]
        let newCol = otherBlock.gridPos[1];

        [grid.blocks[gridRow][gridCol], grid.blocks[newRow][newCol]] = [grid.blocks[newRow][newCol], grid.blocks[gridRow][gridCol]]
        this.canvPos = otherBlock.canvPos;
        this.gridPos = otherBlock.gridPos;
        otherBlock.canvPos = temp.canvPos;
        otherBlock.gridPos = temp.gridPos;

    }

    increaseBlockSpeed(delta) {
        this.vel += delta;
    }
}

export default Block;