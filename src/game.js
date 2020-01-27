import Block from './block'

class Game {
    constructor() {

        this.DIM_X = 400;
        this.DIM_Y = 700;
        this.NUM_START_ROWS = 4;
        this.NUM_COLUMNS = 6;
        this.blocks = this.createSingleRow();
    }

    createAllRows() {
        blocks = []
        for(let i = 0; i < this.NUM_START_ROWS; i++) {
            blocks.push(this.createSingleRow())
        }
    }

    createSingleRow(rowStart) {
        let pos = [10, 690]
        let blocks = []
        for(let i = 0; i < this.NUM_COLUMNS; i ++){
            let block = new Block({pos: [pos[0], pos[1]]})
            blocks.push(block);
            pos[0] += 65;
        }
        return blocks;
    } 

    draw(ctx) {
        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
        ctx.fillStyle = "white";
        ctx.fillRect(0, 50, this.DIM_X, this.DIM_Y);

        this.blocks.forEach(block => {
            block.draw(ctx);
        });
    }

    moveObjects() {
        this.blocks.forEach(block => {
            block.move();
        });
    }
}

export default Game;