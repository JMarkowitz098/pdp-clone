import Block from './block';
import Cursor from './cursor';
import Grid from './grid'
import * as GameUtil from './game_util'

class Game {
    constructor() {

        this.DIM_X = 400;
        this.DIM_Y = 800;
        this.NUM_START_ROWS = 10;
        this.NUM_COLUMNS = 6;
        this.grid = new Grid(this.DIM_X, this.DIM_Y)
        // this.blocks = this.createAllRows();
        this.cursor = new Cursor({pos: [100,600]});
        this.clearMatchingBlocks = this.clearMatchingBlocks.bind(this)
    }

    // createAllRows() {
    //     let blocks = [];
    //     let yPos = 700;
    //     for(let i = 0; i < this.NUM_START_ROWS; i++) {
    //         blocks.push(this.createSingleRow(yPos));
    //         yPos -= 50;
    //     }
    //     return blocks
    // }

    // createSingleRow(rowStartPos) {
    //     let pos = [0, rowStartPos]
    //     let blocks = []
    //     for(let i = 0; i < this.NUM_COLUMNS; i ++){
    //         let block = new Block({pos: [pos[0], pos[1]]})
    //         blocks.push(block);
    //         pos[0] += 50;
    //     }
    //     return blocks;
    // } 

    draw(ctx) {
        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 50, this.DIM_X, this.DIM_Y);

        this.grid.blocks.forEach(row => {
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

    // swapBlocks() {
    //     const cursorPos = this.cursor.pos;

    //     this.blocks.forEach((row, rowIdx) => {
    //         row.forEach((block, colIdx) => {
    //             if (block.pos[0] === cursorPos[0] && block.pos[1] === cursorPos[1]) {
    //                 let nextBlock = this.blocks[rowIdx][colIdx + 1]
    //                 this.swapBlockPositions(block, nextBlock)
    //                 this.swapPosInBlocksArrHor(rowIdx, colIdx)
    //             }
    //         })
    //     })
    // }

    // swapBlockPositions(firstBlock, nextBlock) {
    //     let firstBlockPos = firstBlock.pos;
    //     firstBlock.pos = nextBlock.pos;
    //     nextBlock.pos = firstBlockPos;
    // }

    // swapPosInBlocksArrHor(rowIdx, colIdx) {
    //     let first = this.blocks[rowIdx][colIdx];
    //     this.blocks[rowIdx][colIdx] = this.blocks[rowIdx][colIdx + 1]
    //     this.blocks[rowIdx][colIdx + 1] = first
    // }

    // swapPosInBlocksArrVert(rowIdx, colIdx) {
    //     let first = this.blocks[rowIdx][colIdx];
    //     this.blocks[rowIdx][colIdx] = this.blocks[rowIdx - 1][colIdx]
    //     this.blocks[rowIdx - 1][colIdx] = first
    // }

    //Clear Matching Blocks Stuff -------------------
    clearMatchingBlocks() {
        for (let rowIdx = 0; rowIdx < this.blocks.length; rowIdx ++){
            for (let colIdx = 0; colIdx < this.NUM_COLUMNS; colIdx ++) {
                if (colIdx < this.blocks[rowIdx].length - 2){
                    this.clearMatchingRow(rowIdx, colIdx)
                }
                if (rowIdx < this.blocks.length - 2) {
                    this.clearMatchingCol(rowIdx, colIdx)
                }
            }
        }
        // GameUtil.clearMatchingBlocks(this)
    }

    clearMatchingRow(rowIdx, colIdx) {
        let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx, 'row');

        if (matchingBlocks.length > 2 && this.colorsMatched(matchingBlocks)) {
            this.turnBlocksWhite(matchingBlocks)
        }
    }

    clearMatchingCol(rowIdx, colIdx) {
        let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx, 'col');

        if (matchingBlocks.length > 2 && this.colorsMatched(matchingBlocks)) {
            this.turnBlocksWhite(matchingBlocks)
        }
    }

    createMatchingBlocksArr(rowIdx, colIdx, type) {
        let matchingBlocks = [];
        matchingBlocks.push(this.blocks[rowIdx][colIdx])
        if (type === "row"){
            while(this.onBottomRow(rowIdx, colIdx) && this.nextBlockExists(rowIdx, colIdx,type) && this.nextBlockMatched(rowIdx, colIdx, type)) {
                colIdx += 1;
                matchingBlocks.push(this.blocks[rowIdx][colIdx]);
            }
        } else {
            while(this.nextBlockExists(rowIdx, colIdx, type) && this.nextBlockMatched(rowIdx, colIdx, type)) {
                rowIdx += 1;
                matchingBlocks.push(this.blocks[rowIdx][colIdx]);
            }
        }
        return matchingBlocks;
    }

    nextBlockMatched(rowIdx, colIdx, type) {
        let block = this.blocks[rowIdx][colIdx]
        let nextBlock = this.nextBlock(rowIdx, colIdx, type);
    
        if (block.color === nextBlock.color) {
            return true;
        } else {
            return false;
        }
    }

    nextBlock(rowIdx, colIdx, type) {
        if (type === 'row') {
            return this.blocks[rowIdx][colIdx + 1]
        } else {
            return this.blocks[rowIdx + 1][colIdx]
        }
    }

    nextBlockExists(rowIdx, colIdx, type) {
        if(type === "row" && colIdx + 1 > this.NUM_COLUMNS - 1) {
            return false;
        } else if (type === "col" && rowIdx + 1 > this.blocks.length - 1) {
            return false
        } else {
            return true;
        }
    }

    colorsMatched(matchingBlocks) {
        if (matchingBlocks[0].color === matchingBlocks[1].color 
            && matchingBlocks[0].color === matchingBlocks[2].color 
            && matchingBlocks[0].color !== "white")
        {
            return true;
        } else {
            return false;
        }
    }

    onBottomRow(rowIdx, colIdx) { //Rignt now only works if block falls from right
            if (rowIdx > 0 && this.blocks[rowIdx - 1][colIdx].color === "white" ) {
                return false;
            } else {
                return true
            }

    }

    turnBlocksWhite(matchingBlocks) {
        matchingBlocks.forEach(block => {
            block.color = "white"
        })
    }

    //End clear matching blocks stuff -------------------

    // haveBlocksFall() {
    //     for (let rowIdx = 1; rowIdx < this.blocks.length; rowIdx++) {
    //         for (let colIdx = 0; colIdx < this.blocks[0].length; colIdx++) {
    //             let topBlock = this.blocks[rowIdx][colIdx];
    //             let bottomBlock = this.blocks[rowIdx - 1][colIdx];

    //             if(bottomBlock.color === "white" && topBlock.color !== "white") {
    //                 this.swapBlockPositions(topBlock, bottomBlock)
    //                 this.swapPosInBlocksArrVert(rowIdx, colIdx);
    //             }
    //         }
    //     }
    // }
}

export default Game;