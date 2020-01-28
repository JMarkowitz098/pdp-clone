export const clearMatchingBlocks = () => {
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

const clearMatchingRow = (rowIdx, colIdx) => {
    let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx, 'row');

    if (matchingBlocks.length > 2 && this.colorsMatched(matchingBlocks)) {
        this.turnBlocksWhite(matchingBlocks)
    }
}

const clearMatchingCol = (rowIdx, colIdx) => {
    let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx, 'col');

    if (matchingBlocks.length > 2 && this.colorsMatched(matchingBlocks)) {
        this.turnBlocksWhite(matchingBlocks)
    }
}

const createMatchingBlocksArr = (rowIdx, colIdx, type) => {
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

const nextBlockMatched = (rowIdx, colIdx, type) => {
    let block = this.blocks[rowIdx][colIdx]
    let nextBlock = this.nextBlock(rowIdx, colIdx, type);

    if (block.color === nextBlock.color) {
        return true;
    } else {
        return false;
    }
}

const nextBlock = (rowIdx, colIdx, type) => {
    if (type === 'row') {
        return this.blocks[rowIdx][colIdx + 1]
    } else {
        return this.blocks[rowIdx + 1][colIdx]
    }
}

const nextBlockExists = (rowIdx, colIdx, type) => {
    if (type === "row" && colIdx + 1 > this.NUM_COLUMNS - 1) {
        return false;
    } else if (type === "col" && rowIdx + 1 > this.blocks.length - 1) {
        return false
    } else {
        return true;
    }
}

const colorsMatched = (matchingBlocks) => {
    if (matchingBlocks[0].color === matchingBlocks[1].color
        && matchingBlocks[0].color === matchingBlocks[2].color
        && matchingBlocks[0].color !== "white") {
        return true;
    } else {
        return false;
    }
}

const turnBlocksWhite = (matchingBlocks) => {
    matchingBlocks.forEach(block => {
        block.color = "white"
    })
}