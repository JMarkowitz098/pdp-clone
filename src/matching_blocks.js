class MatchingBlocks {
    constructor(grid) {
        this.grid = grid
        this.blocks = grid.blocks
        this.numRows = this.blocks.length;
        this.numColumns = this.blocks[0].length;
        this.matches = [];
    }

    createMatches() {
        this.blocks.forEach(row => {
            this.matches.push(...this.createMatchesFromSingleRow(row))
        })

        let cols = this.grid.transposeBlocks(this.blocks);
        cols.forEach(row => {
            this.matches.push(...this.createMatchesFromSingleRow(row))
        })
    }

    createMatchesFromSingleRow(blocks) {
        let matchingBlocks = [];
        let matchesArr = []
        matchingBlocks.push(blocks[0]);
        let block;

        for (let colIdx = 1; colIdx < blocks.length; colIdx ++) {
            block = blocks[colIdx]

            if (matchingBlocks[0].matches(block)) {
                matchingBlocks.push(block);

                //If match is for final 3 blocks
                if (colIdx === blocks.length - 1 && this.actualMatch(matchingBlocks)){
                    matchesArr.push(matchingBlocks)
                }
            } else {
                if (this.actualMatch(matchingBlocks)) {
                   matchesArr.push(matchingBlocks)
                } 
                matchingBlocks = [blocks[colIdx]];
            }
        }

        return matchesArr;
    }

    actualMatch(matchingBlocks) {
        return !matchingBlocks[0].isWhite() && matchingBlocks.length > 2
    }

    turnMatchesWhite() {
        this.matches.forEach(blocks => {
            if (this.blocksOnGround(blocks)){
                blocks.forEach(block => block.color = "white")
            }
        })
    }

    blocksOnGround(blocks) {
        let bool = true;
        
        blocks.forEach(block => {
            let blockUnder;
            if(block.gridPos[0] > 0){
                blockUnder = this.grid.blocks[block.gridPos[0] - 1][block.gridPos[1]]
            }
            if (blockUnder && blockUnder.isWhite()) {
                bool = false;
            }
        })
        return bool;
    }
}

export default MatchingBlocks
