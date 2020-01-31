import Cursor from './cursor';
import Grid from './grid'
import MatchingBlocks from './matching_blocks';

class Game {
    constructor() {
        this.DIM_X = 400;
        this.DIM_Y = 800;
        this.VEL = .1
        this.grid = new Grid(this.DIM_X, this.DIM_Y, this.VEL)
        this.cursor = new Cursor({pos: [100,600], vel: this.VEL});

        this.increaseVelocity = this.increaseVelocity.bind(this)
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

    increaseVelocity() {
        let delta = .1
        this.VEL += delta
        this.grid.increaseGridSpeed(delta);
        this.cursor.increaseCursorSpeed(delta)
    }

}

export default Game;