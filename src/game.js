import Block from './block';
import Cursor from './cursor';

class Game {
    constructor() {

        this.DIM_X = 400;
        this.DIM_Y = 700;
        this.NUM_START_ROWS = 4;
        this.NUM_COLUMNS = 6;
        this.blocks = this.createAllRows();
        this.cursor = new Cursor({pos: [78,560]});
    }

    createAllRows() {
        let blocks = [];
        let yPos = 690;
        for(let i = 0; i < this.NUM_START_ROWS; i++) {
            blocks.push(this.createSingleRow(yPos));
            yPos -= 65;
        }
        return blocks
    }

    createSingleRow(rowStartPos) {
        let pos = [10, rowStartPos]
        let blocks = []
        for(let i = 0; i < this.NUM_COLUMNS; i ++){
            let block = new Block({pos: [pos[0], pos[1]]})
            blocks.push(block);
            pos[0] += 65;
        }
        return blocks;
    } 

    draw(ctx) {
        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 50, this.DIM_X, this.DIM_Y);

        this.blocks.forEach(row => {
            this.drawRow(row, ctx)
        });
        this.cursor.draw(ctx);
    }

    drawRow(blocks, ctx) {
        blocks.forEach(block => {
            block.draw(ctx);
        });
    }

    moveBlocks() {
        this.blocks.forEach(row => {
            this.moveRow(row);
        });
    }

    moveRow(blocks) {
        blocks.forEach(block => {
            block.move();
        });
    }

    moveCursor() {
        this.cursor.move();
    }
}

export default Game;