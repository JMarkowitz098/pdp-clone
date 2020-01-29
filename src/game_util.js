export const clearMatchingBlocks = (ctx) => {
    for (let rowIdx = 0; rowIdx < ctx.blocks.length; rowIdx++) {
        for (let colIdx = 0; colIdx < ctx.NUM_COLUMNS; colIdx++) {
            if (colIdx < ctx.blocks[rowIdx].length - 2) {
                clearMatchingRow(rowIdx, colIdx)
            }
            if (rowIdx < ctx.blocks.length - 2) {
                clearMatchingCol(rowIdx, colIdx)
            }
        }
    }
}

const clearMatchingRow = (rowIdx, colIdx) => {
    let matchingBlocks = createMatchingBlocksArr(rowIdx, colIdx, 'row');

    if (matchingBlocks.length > 2 && colorsMatched(matchingBlocks)) {
        turnBlocksWhite(matchingBlocks)
    }
}

const clearMatchingCol = (rowIdx, colIdx) => {
    let matchingBlocks = createMatchingBlocksArr(rowIdx, colIdx, 'col');

    if (matchingBlocks.length > 2 && colorsMatched(matchingBlocks)) {
        turnBlocksWhite(matchingBlocks)
    }
}

const createMatchingBlocksArr = (rowIdx, colIdx, type) => {
    debugger
    let matchingBlocks = [];
    matchingBlocks.push(ctx.blocks[rowIdx][colIdx])
    if (type === "row") {
        while(nextBlockExists(rowIdx, colIdx, type) && nextBlockMatched(rowIdx, colIdx, type)) {
            colIdx += 1;
            matchingBlocks.push(ctx.blocks[rowIdx][colIdx]);
        }
    } else {
        while(nextBlockExists(rowIdx, colIdx, type) && nextBlockMatched(rowIdx, colIdx, type)) {
            rowIdx += 1;
            matchingBlocks.push(ctx.blocks[rowIdx][colIdx]);
        }
    }
    return matchingBlocks;
}

const nextBlockMatched = (rowIdx, colIdx, type) => {
    let block = ctx.blocks[rowIdx][colIdx]
    let nextBlock = nextBlock(rowIdx, colIdx, type);

    if (block.color === nextBlock.color) {
        return true;
    } else {
        return false;
    }
}

const nextBlock = (rowIdx, colIdx, type) => {
    if (type === 'row') {
        return ctx.blocks[rowIdx][colIdx + 1]
    } else {
        return ctx.blocks[rowIdx + 1][colIdx]
    }
}

const nextBlockExists = (rowIdx, colIdx, type) => {
    if (type === "row" && colIdx + 1 > ctx.NUM_COLUMNS - 1) {
        return false;
    } else if (type === "col" && rowIdx + 1 > ctx.blocks.length - 1) {
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