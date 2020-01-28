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
                    let nextBlock = this.blocks[rowIdx][colIdx + 1]
                    this.swapBlockPositions(block, nextBlock)
                    this.swapPosInBlocksArrHor(rowIdx, colIdx)
                }
            })
        })
    }

    swapBlockPositions(firstBlock, nextBlock) {
        let firstBlockPos = firstBlock.pos;
        firstBlock.pos = nextBlock.pos;
        nextBlock.pos = firstBlockPos;
    }

    swapPosInBlocksArrHor(rowIdx, colIdx) {
        let first = this.blocks[rowIdx][colIdx];
        this.blocks[rowIdx][colIdx] = this.blocks[rowIdx][colIdx + 1]
        this.blocks[rowIdx][colIdx + 1] = first
    }

    clearMatchingBlocks() {
        for (let rowIdx = 0; rowIdx < this.blocks.length; rowIdx ++){
            for (let colIdx = 0; colIdx < this.blocks[0].length; colIdx ++) {
        
                if (colIdx < this.blocks[rowIdx].length - 2){
                    this.clearMatchingRow(rowIdx, colIdx)
                }
                if (rowIdx < this.blocks.length - 2) {
                    this.clearMatchingCol(rowIdx, colIdx)
                }
            }
        }
    }

    clearMatchingRow(rowIdx, colIdx) {
        let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx);

        if (this.colorsMatched(matchingBlocks[0], matchingBlocks[1], matchingBlocks[2])) {
            this.turnBlocksWhite(matchingBlocks[0], matchingBlocks[1], matchingBlocks[2])
        }
    }

    clearMatchingCol(rowIdx, colIdx) {
        let firstBlock = this.blocks[rowIdx][colIdx];
        let secondBlock = this.blocks[rowIdx + 1][colIdx];
        let thirdBlock = this.blocks[rowIdx + 2][colIdx];

        if (this.colorsMatched(firstBlock, secondBlock, thirdBlock)) {
            this.turnBlocksWhite(firstBlock,secondBlock, thirdBlock)
        }
    }

    createMatchingBlocksArr(rowIdx, colIdx, type) {
        let matchingBlocks = [];
        let firstBlock = this.blocks[rowIdx][colIdx];
        let secondBlock = this.blocks[rowIdx][colIdx + 1];
        let thirdBlock = this.blocks[rowIdx][colIdx + 2];
        matchingBlocks = [firstBlock, secondBlock, thirdBlock]
        return matchingBlocks;
    }

    colorsMatched(firstBlock, secondBlock, thirdBlock) {
        if (firstBlock.color === secondBlock.color && firstBlock.color === thirdBlock.color && firstBlock.color !== "white"){
            return true;
        } else {
            return false;
        }
    }

    turnBlocksWhite(firstBlock, secondBlock, thirdBlock) {
        firstBlock.color = "white";
        secondBlock.color = "white";
        thirdBlock.color = "white";
    }

    haveBlocksFall() {
        for (let rowIdx = 1; rowIdx < this.blocks.length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.blocks[0].length; colIdx++) {
                let topBlock = this.blocks[rowIdx][colIdx];
                let bottomBlock = this.blocks[rowIdx - 1][colIdx];

                if(bottomBlock.color === "white" && topBlock.color !== "white") {
                    this.swapBlockPositions(topBlock, bottomBlock)
                    this.swapPosInBlocksArrVert(rowIdx, colIdx);
                }
            }
        }
    }

    swapPosInBlocksArrVert(rowIdx, colIdx) {
        let first = this.blocks[rowIdx][colIdx];
        this.blocks[rowIdx][colIdx] = this.blocks[rowIdx - 1][colIdx]
        this.blocks[rowIdx - 1][colIdx] = first
    }
}

export default Game;