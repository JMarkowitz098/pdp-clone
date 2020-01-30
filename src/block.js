class Block {
    constructor(options) {
        this.canvPos = options.canvPos;
        this.gridPos = options.gridPos;
        this.vel = .5;
        this.color = options.color || this.randColor();
        this.size = 50;
    }

    randColor() {
        const COLORS = ["red", "yellow", "green", "blue"]
        let color = COLORS[Math.floor(Math.random() * COLORS.length)];
        return color;
    }

    draw(ctx) {

        ctx.fillStyle = this.color;
        let x = this.canvPos[0];
        let y = this.canvPos[1];

        ctx.fillRect(x, y, this.size, this.size);

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
}

export default Block;