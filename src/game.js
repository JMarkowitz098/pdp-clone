import Block from './block';
import Cursor from './cursor';

class Game {
    constructor() {

        this.DIM_X = 400;
        this.DIM_Y = 800;
        this.NUM_START_ROWS = 4;
        this.NUM_COLUMNS = 6;
        this.blocks = this.createAllRows();
        this.cursor = new Cursor({pos: [100,600]});
    }

    createAllRows() {
        let blocks = [];
        let yPos = 700;
        for(let i = 0; i < this.NUM_START_ROWS; i++) {
            blocks.push(this.createSingleRow(yPos));
            yPos -= 50;
        }
        return blocks
    }

    createSingleRow(rowStartPos) {
        let pos = [0, rowStartPos]
        let blocks = []
        for(let i = 0; i < this.NUM_COLUMNS; i ++){
            let block = new Block({pos: [pos[0], pos[1]]})
            blocks.push(block);
            pos[0] += 50;
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

    swapBlocks() {
        const cursorPos = this.cursor.pos;
        

        this.blocks.forEach((row, rowIdx) => {
            row.forEach((block, colIdx) => {
                if (block.pos[0] === cursorPos[0] && block.pos[1] === cursorPos[1]) {
                    console.log(`Cursor: ${cursorPos}`)
                    console.log(`Block1: ${block.pos}`)
                    console.log(`Block2: ${this.blocks[rowIdx][colIdx + 1].pos}`)


                    let oldPos = block.pos;
                    block.pos = this.blocks[rowIdx][colIdx + 1].pos;
                    this.blocks[rowIdx][colIdx + 1].pos = oldPos;

                    let first = this.blocks[rowIdx][colIdx];
                    this.blocks[rowIdx][colIdx] = this.blocks[rowIdx][colIdx + 1]
                    this.blocks[rowIdx][colIdx + 1] = first

                }
            })
        })


    }
}

export default Game;