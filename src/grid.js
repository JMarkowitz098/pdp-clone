import Block from './block';

class Grid {
    constructor(dimX, dimY) {
        this.DIM_X = 400;
        this.DIM_Y = 800;
        this.NUM_START_ROWS = 5;
        this.NUM_COLUMNS = 6;
        this.blocks = this.createAllRows();

        this.turnBlocksWhite = this.turnBlocksWhite.bind(this)
        this.removeEmptyRows = this.removeEmptyRows.bind(this)
    }

    createAllRows() {
        let blocks = [];
        let yPos = 700;
        for (let i = 0; i < this.NUM_START_ROWS; i++) {
            let newRow = this.createSingleRow(yPos);
            blocks.push(newRow);
            yPos -= 50;
        }

        if (this.anyColMatch(blocks)) {
            return this.createAllRows()
        } else {
            return blocks;
        }
    }

    createSingleRow(rowStartPos) {
        let pos = [0, rowStartPos]
        let blocks = []

        for (let i = 0; i < this.NUM_COLUMNS; i++) {
            let block = new Block({ pos: [pos[0], pos[1]] })
            blocks.push(block);
            pos[0] += 50;
        }

        if (this.anyMatch(blocks)){
            return this.createSingleRow(rowStartPos);
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
            if(this.anyMatch(row, row.length)) {
                bool = true;
            }
        })
        return bool;
    }

    transposeBlocks(blocks) {
        const  transposed = [];
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
            this.blocks.unshift(this.createSingleRow(700))
        }
    }

    shouldCreateNewRow() {
        let bool = false;
        this.blocks[0].forEach(block => {
            if (block.pos[1] <= 650) bool = true;
        })
        return bool;
    }

    removeEmptyRows(){
        this.blocks.forEach(row => {
            if(this.rowIsEmpty(row)) {
                this.blocks.splice(this.blocks.indexOf(row), 1);
            }
        })
    }
    
    rowIsEmpty(row){
        let bool = true
        row.forEach(block => {
            if (block.color !== "white"){
                bool =  false;
            }
        })
        return bool;
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

    //Clear Matching Blocks Stuff -------------------
    clearMatchingBlocks() {
        for (let rowIdx = 0; rowIdx < this.blocks.length; rowIdx++) {
            for (let colIdx = 0; colIdx < this.NUM_COLUMNS; colIdx++) {
                if (colIdx < this.blocks[rowIdx].length - 2) {
                    this.clearMatchingRow(rowIdx, colIdx)
                }
                if (rowIdx < this.blocks.length - 2) {
                    this.clearMatchingCol(rowIdx, colIdx)
                }
            }
        }
    }

    clearMatchingRow(rowIdx, colIdx) {
        let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx, 'row');
        if (matchingBlocks.length > 2 && this.colorsMatched(matchingBlocks)) {
            this.turnBlocksWhite(matchingBlocks)
        }
    }

    // matchingRow() {
    //     if (matchingBlocks.length > 2 
    //     && this.colorsMatched(matchingBlocks)
    //     && this.onBottomRow(matchingBlocks, rowIdx)) {
    //         return true
    //     } else {
    //         return false
    //     }
    // }

    clearMatchingCol(rowIdx, colIdx) {
        let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx, 'col');

        if (matchingBlocks.length > 2 && this.colorsMatched(matchingBlocks)) {
            this.turnBlocksWhite(matchingBlocks)
        }
    }

    createMatchingBlocksArr(rowIdx, colIdx, type) {
        let matchingBlocks = [];
        matchingBlocks.push(this.blocks[rowIdx][colIdx])
        if (type === "row") {
            while (this.nextBlockExists(rowIdx, colIdx, type) && this.nextBlockMatched(rowIdx, colIdx, type)) {
                colIdx += 1;
                matchingBlocks.push(this.blocks[rowIdx][colIdx]);
            }
        } else {
            while (this.nextBlockExists(rowIdx, colIdx, type) && this.nextBlockMatched(rowIdx, colIdx, type)) {
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
        if (type === "row" && colIdx + 1 > this.NUM_COLUMNS - 1) {
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
            && matchingBlocks[0].color !== "white") {
            return true;
        } else {
            return false;
        }
    }

    onBottomRow(matchingBlocks, rowIdx) { //Rignt now only works if block falls from right
        if (rowIdx === 0) return true;
        matchingBlocks.forEach((block, colIdx) => {
            if (this.blocks[rowIdx - 1][colIdx].color === "white") {
                return false;
            }
        })
        return true;
    }

    turnBlocksWhite(matchingBlocks) {
        matchingBlocks.forEach(block => {
            block.color = "white"
        })
    }
}

export default Grid;