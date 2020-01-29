class MatchingBlocks {
    constructor(blocks) {
        this.numRows = blocks.length;
        this.numColumns = blocks[0].length;
        this.blocks = blocks
    }

    createMatches() {
        let matches = []
        this.blocks.forEach(row => {
            
        })
    }

    createMatchesFromSingleRow(blocks) {
        let matchingBlocks = [];
        let matchesArr = []
        matchingBlocks.push(blocks[0]);
        let colIdx = 1;

        while (colIdx < blocks.length) {
            if (matchingBlocks[0].color === blocks[colIdx].color) {
                matchingBlocks.push(blocks[colIdx]);
            } else {
                matchesArr.push(matchingBlocks)
                matchingBlocks = [blocks[colIdx]]
            }
            colIdx += 1;
        }

        return matchesArr;
    }

    
}

export default MatchingBlocks