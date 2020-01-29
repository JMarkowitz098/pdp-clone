import Cursor from './cursor';
import Grid from './grid'
import MatchingBlocks from './matching_blocks';

class Game {
    constructor() {
        this.DIM_X = 400;
        this.DIM_Y = 800;
        this.NUM_START_ROWS = 10;
        this.NUM_COLUMNS = 6;
        this.grid = new Grid(this.DIM_X, this.DIM_Y)
        this.cursor = new Cursor({pos: [100,600]});

        this.createMatchingBlocks = this.createMatchingBlocks.bind(this)
    }

    drawGrid(ctx) {
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

    moveGrid() {
        this.grid.blocks.forEach(row => {
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

    createMatchingBlocks() {
        const matchingBlocks = new MatchingBlocks(this.grid)
        matchingBlocks.createMatches();
        console.log(matchingBlocks.matches)
        matchingBlocks.turnMatchesWhite()
    }

}

export default Game;