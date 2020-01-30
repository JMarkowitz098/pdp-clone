import Cursor from './cursor';
import Grid from './grid'
import MatchingBlocks from './matching_blocks';

class Game {
    constructor() {
        this.DIM_X = 400;
        this.DIM_Y = 800;
        this.grid = new Grid(this.DIM_X, this.DIM_Y)
        this.cursor = new Cursor({pos: [100,600]});
    }

    drawGrid(ctx) {
        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
 


        ctx.fillStyle = "#F0F8FF";
        ctx.strokeRect(-10, 50, this.DIM_X, this.DIM_Y - 100);

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

    removeMatchingBlocks() {
        const matchingBlocks = new MatchingBlocks(this.grid)
        matchingBlocks.createMatches();
        matchingBlocks.turnMatchesWhite()
    }

}

export default Game;