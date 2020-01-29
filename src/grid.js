import Block from './block';

class Grid {
    constructor(dimX, dimY) {
        this.DIM_X = 400;
        this.DIM_Y = 800;
        this.NUM_START_ROWS = 10;
        this.NUM_COLUMNS = 6;
        this.blocks = this.createAllRows();
    }

    createAllRows() {
        let blocks = [];
        let yPos = 700;
        for (let i = 0; i < this.NUM_START_ROWS; i++) {
            blocks.push(this.createSingleRow(yPos));
            yPos -= 50;
        }
        return blocks
    }

    createSingleRow(rowStartPos) {
        let pos = [0, rowStartPos]
        let blocks = []
        for (let i = 0; i < this.NUM_COLUMNS; i++) {
            let block = new Block({ pos: [pos[0], pos[1]] })
            blocks.push(block);
            pos[0] += 50;
        }
        return blocks;
    } 

    swapBlocks(cursor) {
        const cursorPos = cursor.pos;

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

    swapPosInBlocksArrVert(rowIdx, colIdx) {
        let first = this.blocks[rowIdx][colIdx];
        this.blocks[rowIdx][colIdx] = this.blocks[rowIdx - 1][colIdx]
        this.blocks[rowIdx - 1][colIdx] = first
    }

    haveBlocksFall() {
        for (let rowIdx = 1; rowIdx < this.blocks.length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.blocks[0].length; colIdx++) {
                let topBlock = this.blocks[rowIdx][colIdx];
                let bottomBlock = this.blocks[rowIdx - 1][colIdx];

                if (bottomBlock.color === "white" && topBlock.color !== "white") {
                    this.swapBlockPositions(topBlock, bottomBlock)
                    this.swapPosInBlocksArrVert(rowIdx, colIdx);
                }
            }
        }
    }
}

export default Grid;