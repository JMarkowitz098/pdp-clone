import Block from './block';

class Grid {
    constructor(dimX, dimY) {
        this.DIM_X = 400;
        this.DIM_Y = 800;
        this.NUM_START_ROWS = 3;
        this.NUM_COLUMNS = 6;
        this.blocks = this.createAllRows();

    }

    createAllRows() {
        let blocks = [];
        let yPos = 700;
        for (let i = 0; i < this.NUM_START_ROWS; i++) {
            let newRow = this.createSingleRow(i, yPos);
            blocks.push(newRow);
            yPos -= 50;
        }

        if (this.anyColMatch(blocks)) {
            return this.createAllRows()
        } else {
            return blocks;
        }
    }

    createSingleRow(rowIdx, rowStartPos) {
        let canvPos = [0, rowStartPos]
        let blocks = []

        for (let i = 0; i < this.NUM_COLUMNS; i++) {
            let block = new Block({ 
                canvPos: [canvPos[0], canvPos[1]],
                gridPos: [rowIdx, i] 
            })
            blocks.push(block);
            canvPos[0] += 50;
        }

        if (this.anyMatch(blocks)) {
            return this.createSingleRow(rowIdx, rowStartPos);
        } else {
            return blocks
        }
    }

    anyMatch(blocks, arrLength = this.NUM_COLUMNS) {
        let matchingBlocks = [];
        matchingBlocks.push(blocks[0]);
        let colIdx = 1;

        while (colIdx < arrLength) {
            if (matchingBlocks.length > 2) {
                break;
            } else if (matchingBlocks[0].color === blocks[colIdx].color) {
                matchingBlocks.push(blocks[colIdx]);
            } else {
                matchingBlocks = [blocks[colIdx]]
            }
            colIdx += 1;
        }

        return (matchingBlocks.length > 2)
    }

    anyColMatch(blocks) {
        blocks = this.transposeBlocks(blocks);
        let bool = false;

        blocks.forEach(row => {
            if (this.anyMatch(row, row.length)) {
                bool = true;
            }
        })
        return bool;
    }

    transposeBlocks(blocks) {
        const transposed = [];
        for (let i = 0; i < blocks[0].length; i++) {
            transposed.push([]);
        };

        for (let i = 0; i < blocks.length; i++) {
            for (let j = 0; j < blocks[0].length; j++) {
                transposed[j].push(blocks[i][j]);
            };
        };

        return transposed;
    }

    addNewRow() {
        if (this.shouldCreateNewRow()) {
            this.updateGridPosOnNewRow();
            this.blocks.unshift(this.createSingleRow(0, 700))
        }
    }

    updateGridPosOnNewRow() {
        this.blocks.forEach(row => {
            row.forEach(block => block.gridPos[0] += 1)
        })
    }

    shouldCreateNewRow() {
        let bool = false;
        this.blocks[0].forEach(block => {
            if (block.canvPos[1] <= 650) bool = true;
        })
        return bool;
    }

    removeEmptyRows() {
        this.blocks.forEach(row => {
            if (this.rowIsEmpty(row)) {
                this.blocks.splice(this.blocks.indexOf(row), 1);
            }
        })
    }

    rowIsEmpty(row) {
        let bool = true
        row.forEach(block => {
            if (block.color !== "white") {
                bool = false;
            }
        })
        return bool;
    }

    swapBlocks(cursor) {
        const cursorPos = cursor.pos;
        let currentBlock;
        let nextBlock;
        let blocksSwapped = false;

        for (let row = 0; row < this.blocks.length; row ++) {
            for(let col = 0; col < this.blocks[row].length - 1; col ++) {
                if (this.blocks[row][col].canvPos[0] === cursorPos[0] && this.blocks[row][col].canvPos[1] === cursorPos[1]) {
                    currentBlock = this.blocks[row][col];
                    nextBlock = this.blocks[row][col + 1];
                    currentBlock.swapBlock(nextBlock, this);
                    blocksSwapped = true
                    break;
                }
            }
            if (blocksSwapped) break;
        }

    }

    haveBlocksFall() {
        for (let rowIdx = 1; rowIdx < this.blocks.length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.blocks[0].length; colIdx++) {
                let topBlock = this.blocks[rowIdx][colIdx];
                let bottomBlock = this.blocks[rowIdx - 1][colIdx];

                if (bottomBlock.isWhite() && !topBlock.isWhite()) {
                    topBlock.swapBlock(bottomBlock, this);
                }
            }
        }
    }
}

export default Grid;