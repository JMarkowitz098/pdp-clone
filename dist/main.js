/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/block.js":
/*!**********************!*\
  !*** ./src/block.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Block {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = .5;\n        this.color = this.randColor();\n        this.size = 50;\n    }\n\n    randColor() {\n        const COLORS = [\"red\", \"yellow\", \"green\", \"blue\"]\n        let color = COLORS[Math.floor(Math.random() * COLORS.length)];\n        return color;\n    }\n\n    draw(ctx) {\n\n        ctx.fillStyle = this.color;\n        let x = this.pos[0];\n        let y = this.pos[1];\n\n        ctx.fillRect(x, y, this.size, this.size);\n\n    }\n\n    move() {\n        let x = this.pos[0];\n        let y = this.pos[1];\n\n        this.pos = [x, y - this.vel];\n    }\n\n    matches(otherBlock) {\n        return this.color === otherBlock.color;\n    }\n\n    isWhite() {\n        return this.color === \"white\"\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Block);\n\n//# sourceURL=webpack:///./src/block.js?");

/***/ }),

/***/ "./src/cursor.js":
/*!***********************!*\
  !*** ./src/cursor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass Cursor {\n    constructor(options) {\n        this.pos = options.pos;\n        this.vel = .5;\n        this.color = \"black\";\n        this.size = 50;\n    }\n\n    draw(ctx) {\n        ctx.fillStyle = this.color;\n        ctx.lineWidth = \"6\";\n        let x = this.pos[0];\n        let y = this.pos[1];\n\n        ctx.strokeRect(x, y, this.size * 2, this.size);\n    }\n\n    move() {\n        let x = this.pos[0];\n        let y = this.pos[1];\n\n        this.pos = [x, y - this.vel];\n    }\n\n    changePos(dir, dimX, dimY) {\n        let newX = this.pos[0] + dir[0];\n        let newY = this.pos[1] + dir[1];\n        let data = {\n            x: newX,\n            y: newY,\n            dimX: dimX,\n            dimY: dimY\n        }\n\n        if (this.validMove(data)) this.pos = [newX, newY];\n    }\n\n    validMove(data) {\n        if (data.x > data.dimX - 200 || data.x < 0) {\n            return false;\n        } else if (data.y > data.dimY - 100 || data.y < 50) {\n            return false;\n        } else {\n            return true;\n        }\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Cursor);\n\n//# sourceURL=webpack:///./src/cursor.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cursor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cursor */ \"./src/cursor.js\");\n/* harmony import */ var _grid__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./grid */ \"./src/grid.js\");\n/* harmony import */ var _matching_blocks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./matching_blocks */ \"./src/matching_blocks.js\");\n\n\n\n\nclass Game {\n    constructor() {\n        this.DIM_X = 400;\n        this.DIM_Y = 800;\n        this.NUM_START_ROWS = 10;\n        this.NUM_COLUMNS = 6;\n        this.grid = new _grid__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.DIM_X, this.DIM_Y)\n        this.cursor = new _cursor__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({pos: [100,600]});\n\n        this.createMatchingBlocks = this.createMatchingBlocks.bind(this)\n    }\n\n    drawGrid(ctx) {\n        ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);\n        ctx.fillStyle = \"white\";\n        ctx.fillRect(0, 50, this.DIM_X, this.DIM_Y);\n\n        this.grid.blocks.forEach(row => {\n            this.drawRow(row, ctx)\n        });\n        this.cursor.draw(ctx);\n    }\n\n    drawRow(blocks, ctx) {\n        blocks.forEach(block => {\n            block.draw(ctx);\n        });\n    }\n\n    moveGrid() {\n        this.grid.blocks.forEach(row => {\n            this.moveRow(row);\n        });\n    }\n\n    moveRow(blocks) {\n        blocks.forEach(block => {\n            block.move();\n        });\n    }\n\n    moveCursor() {\n        this.cursor.move();\n    }\n\n    createMatchingBlocks() {\n        const matchingBlocks = new _matching_blocks__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.grid)\n        matchingBlocks.createMatches();\n        console.log(matchingBlocks.matches)\n        matchingBlocks.turnMatchesWhite()\n    }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass GameView {\n    constructor(game, ctx) {\n        this.ctx = ctx;\n        this.game = game;\n        this.grid = this.game.grid;\n        this.step = this.step.bind(this)\n        this.MOVES = {\n            w: [0, -50],\n            a: [-50, 0],\n            s: [0, 50],\n            d: [50, 0],\n        }\n\n        this.onKeyDown = this.onKeyDown.bind(this)\n    }\n\n    start() {\n        this.bindKeyHandlers();\n        \n        requestAnimationFrame(this.step)\n        \n    }\n\n    step() {\n        // this.game.moveGrid();\n        // this.game.moveCursor();\n        \n        this.game.grid.removeEmptyRows();\n        this.game.drawGrid(this.ctx);\n        this.game.grid.haveBlocksFall();\n\n        //Testing\n        this.game.createMatchingBlocks();\n\n        this.game.grid.addNewRow();\n\n        if (!this.gameOver()) {\n            requestAnimationFrame(this.step)\n        }\n    }\n\n    gameOver() {\n        if (this.anyBlockAtTop()) {\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    anyBlockAtTop() {\n        let bool = false;\n        let numRows = this.grid.blocks.length;\n        this.grid.blocks[numRows - 1].forEach(block => {\n            if (block.pos[1] <= 50) bool = true;\n        })\n        return bool;\n    }\n\n    onKeyDown(e) {\n        const cursor = this.game.cursor;\n        const move = this.MOVES[e.key];\n\n        if (Object.keys(this.MOVES).includes(e.key)){\n            cursor.changePos(move, this.game.DIM_X, this.game.DIM_Y)    \n        } else if (e.key === \" \") {\n            this.game.grid.swapBlocks(cursor);\n        } \n    }\n\n    bindKeyHandlers() {\n        document.addEventListener(\"keydown\", this.onKeyDown)\n    };\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameView);\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/grid.js":
/*!*********************!*\
  !*** ./src/grid.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _block__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block */ \"./src/block.js\");\n\n\nclass Grid {\n    constructor(dimX, dimY) {\n        this.DIM_X = 400;\n        this.DIM_Y = 800;\n        this.NUM_START_ROWS = 5;\n        this.NUM_COLUMNS = 6;\n        this.blocks = this.createAllRows();\n\n        this.turnBlocksWhite = this.turnBlocksWhite.bind(this)\n        this.removeEmptyRows = this.removeEmptyRows.bind(this)\n    }\n\n    createAllRows() {\n        let blocks = [];\n        let yPos = 700;\n        for (let i = 0; i < this.NUM_START_ROWS; i++) {\n            let newRow = this.createSingleRow(yPos);\n            blocks.push(newRow);\n            yPos -= 50;\n        }\n\n        if (this.anyColMatch(blocks)) {\n            return this.createAllRows()\n        } else {\n            return blocks;\n        }\n    }\n\n    createSingleRow(rowStartPos) {\n        let pos = [0, rowStartPos]\n        let blocks = []\n\n        for (let i = 0; i < this.NUM_COLUMNS; i++) {\n            let block = new _block__WEBPACK_IMPORTED_MODULE_0__[\"default\"]({ pos: [pos[0], pos[1]] })\n            blocks.push(block);\n            pos[0] += 50;\n        }\n\n        if (this.anyMatch(blocks)){\n            return this.createSingleRow(rowStartPos);\n        } else {\n            return blocks\n        }\n    } \n\n    anyMatch(blocks, arrLength = this.NUM_COLUMNS) {\n        let matchingBlocks = [];\n        matchingBlocks.push(blocks[0]);\n        let colIdx = 1;\n\n        while (colIdx < arrLength) {\n            if (matchingBlocks.length > 2) {\n                break;\n            } else if (matchingBlocks[0].color === blocks[colIdx].color) {\n                matchingBlocks.push(blocks[colIdx]);\n            } else {\n                matchingBlocks = [blocks[colIdx]]\n            }\n            colIdx += 1;\n        }\n\n        return (matchingBlocks.length > 2)\n    }\n\n    anyColMatch(blocks) {\n        blocks = this.transposeBlocks(blocks);\n        let bool = false;\n\n        blocks.forEach(row => {\n            if(this.anyMatch(row, row.length)) {\n                bool = true;\n            }\n        })\n        return bool;\n    }\n\n    transposeBlocks(blocks) {\n        const  transposed = [];\n        for (let i = 0; i < blocks[0].length; i++) {\n            transposed.push([]);\n        };\n\n        for (let i = 0; i < blocks.length; i++) {\n            for (let j = 0; j < blocks[0].length; j++) {\n                transposed[j].push(blocks[i][j]);\n            };\n        };\n\n        return transposed;\n    }\n\n    addNewRow() {\n        if (this.shouldCreateNewRow()) {\n            this.blocks.unshift(this.createSingleRow(700))\n        }\n    }\n\n    shouldCreateNewRow() {\n        let bool = false;\n        this.blocks[0].forEach(block => {\n            if (block.pos[1] <= 650) bool = true;\n        })\n        return bool;\n    }\n\n    removeEmptyRows(){\n        this.blocks.forEach(row => {\n            if(this.rowIsEmpty(row)) {\n                this.blocks.splice(this.blocks.indexOf(row), 1);\n            }\n        })\n    }\n    \n    rowIsEmpty(row){\n        let bool = true\n        row.forEach(block => {\n            if (block.color !== \"white\"){\n                bool =  false;\n            }\n        })\n        return bool;\n    }\n\n    swapBlocks(cursor) {\n        const cursorPos = cursor.pos;\n\n        this.blocks.forEach((row, rowIdx) => {\n            row.forEach((block, colIdx) => {\n                if (block.pos[0] === cursorPos[0] && block.pos[1] === cursorPos[1]) {\n                    let nextBlock = this.blocks[rowIdx][colIdx + 1]\n                    this.swapBlockPositions(block, nextBlock)\n                    this.swapPosInBlocksArrHor(rowIdx, colIdx)\n                }\n            })\n        })\n    }\n\n    swapBlockPositions(firstBlock, nextBlock) {\n        let firstBlockPos = firstBlock.pos;\n        firstBlock.pos = nextBlock.pos;\n        nextBlock.pos = firstBlockPos;\n    }\n\n    swapPosInBlocksArrHor(rowIdx, colIdx) {\n        let first = this.blocks[rowIdx][colIdx];\n        this.blocks[rowIdx][colIdx] = this.blocks[rowIdx][colIdx + 1]\n        this.blocks[rowIdx][colIdx + 1] = first\n    }\n\n    swapPosInBlocksArrVert(rowIdx, colIdx) {\n        let first = this.blocks[rowIdx][colIdx];\n        this.blocks[rowIdx][colIdx] = this.blocks[rowIdx - 1][colIdx]\n        this.blocks[rowIdx - 1][colIdx] = first\n    }\n\n    haveBlocksFall() {\n        for (let rowIdx = 1; rowIdx < this.blocks.length; rowIdx++) {\n            for (let colIdx = 0; colIdx < this.blocks[0].length; colIdx++) {\n                let topBlock = this.blocks[rowIdx][colIdx];\n                let bottomBlock = this.blocks[rowIdx - 1][colIdx];\n\n                if (bottomBlock.color === \"white\" && topBlock.color !== \"white\") {\n                    this.swapBlockPositions(topBlock, bottomBlock)\n                    this.swapPosInBlocksArrVert(rowIdx, colIdx);\n                }\n            }\n        }\n    }\n\n    //Clear Matching Blocks Stuff -------------------\n    clearMatchingBlocks() {\n        for (let rowIdx = 0; rowIdx < this.blocks.length; rowIdx++) {\n            for (let colIdx = 0; colIdx < this.NUM_COLUMNS; colIdx++) {\n                if (colIdx < this.blocks[rowIdx].length - 2) {\n                    this.clearMatchingRow(rowIdx, colIdx)\n                }\n                if (rowIdx < this.blocks.length - 2) {\n                    this.clearMatchingCol(rowIdx, colIdx)\n                }\n            }\n        }\n    }\n\n    clearMatchingRow(rowIdx, colIdx) {\n        let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx, 'row');\n        if (matchingBlocks.length > 2 && this.colorsMatched(matchingBlocks)) {\n            this.turnBlocksWhite(matchingBlocks)\n        }\n    }\n\n    // matchingRow() {\n    //     if (matchingBlocks.length > 2 \n    //     && this.colorsMatched(matchingBlocks)\n    //     && this.onBottomRow(matchingBlocks, rowIdx)) {\n    //         return true\n    //     } else {\n    //         return false\n    //     }\n    // }\n\n    clearMatchingCol(rowIdx, colIdx) {\n        let matchingBlocks = this.createMatchingBlocksArr(rowIdx, colIdx, 'col');\n\n        if (matchingBlocks.length > 2 && this.colorsMatched(matchingBlocks)) {\n            this.turnBlocksWhite(matchingBlocks)\n        }\n    }\n\n    createMatchingBlocksArr(rowIdx, colIdx, type) {\n        let matchingBlocks = [];\n        matchingBlocks.push(this.blocks[rowIdx][colIdx])\n        if (type === \"row\") {\n            while (this.nextBlockExists(rowIdx, colIdx, type) && this.nextBlockMatched(rowIdx, colIdx, type)) {\n                colIdx += 1;\n                matchingBlocks.push(this.blocks[rowIdx][colIdx]);\n            }\n        } else {\n            while (this.nextBlockExists(rowIdx, colIdx, type) && this.nextBlockMatched(rowIdx, colIdx, type)) {\n                rowIdx += 1;\n                matchingBlocks.push(this.blocks[rowIdx][colIdx]);\n            }\n        }\n        return matchingBlocks;\n    }\n\n    nextBlockMatched(rowIdx, colIdx, type) {\n        let block = this.blocks[rowIdx][colIdx]\n        let nextBlock = this.nextBlock(rowIdx, colIdx, type);\n\n        if (block.color === nextBlock.color) {\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    nextBlock(rowIdx, colIdx, type) {\n        if (type === 'row') {\n            return this.blocks[rowIdx][colIdx + 1]\n        } else {\n            return this.blocks[rowIdx + 1][colIdx]\n        }\n    }\n\n    nextBlockExists(rowIdx, colIdx, type) {\n        if (type === \"row\" && colIdx + 1 > this.NUM_COLUMNS - 1) {\n            return false;\n        } else if (type === \"col\" && rowIdx + 1 > this.blocks.length - 1) {\n            return false\n        } else {\n            return true;\n        }\n    }\n\n    colorsMatched(matchingBlocks) {\n        if (matchingBlocks[0].color === matchingBlocks[1].color\n            && matchingBlocks[0].color === matchingBlocks[2].color\n            && matchingBlocks[0].color !== \"white\") {\n            return true;\n        } else {\n            return false;\n        }\n    }\n\n    onBottomRow(matchingBlocks, rowIdx) { //Rignt now only works if block falls from right\n        if (rowIdx === 0) return true;\n        matchingBlocks.forEach((block, colIdx) => {\n            if (this.blocks[rowIdx - 1][colIdx].color === \"white\") {\n                return false;\n            }\n        })\n        return true;\n    }\n\n    turnBlocksWhite(matchingBlocks) {\n        matchingBlocks.forEach(block => {\n            block.color = \"white\"\n        })\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Grid);\n\n//# sourceURL=webpack:///./src/grid.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n    const canvasEl = document.getElementById(\"game-canvas\")\n    const ctx = canvasEl.getContext(\"2d\");\n    const game = new _game__WEBPACK_IMPORTED_MODULE_1__[\"default\"]();\n\n    const gameView = new _game_view__WEBPACK_IMPORTED_MODULE_0__[\"default\"](game, ctx)\n\n    gameView.start();\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/matching_blocks.js":
/*!********************************!*\
  !*** ./src/matching_blocks.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\nclass MatchingBlocks {\n    constructor(grid) {\n        this.grid = grid\n        this.blocks = grid.blocks\n        this.numRows = this.blocks.length;\n        this.numColumns = this.blocks[0].length;\n        this.matches = [];\n    }\n\n    createMatches() {\n        this.blocks.forEach(row => {\n            this.matches.push(...this.createMatchesFromSingleRow(row))\n        })\n\n        let cols = this.grid.transposeBlocks(this.blocks);\n\n        cols.forEach(row => {\n            this.matches.push(...this.createMatchesFromSingleRow(row))\n        })\n    }\n\n    createMatchesFromSingleRow(blocks) {\n        let matchingBlocks = [];\n        let matchesArr = []\n        matchingBlocks.push(blocks[0]);\n        let block;\n\n        for (let colIdx = 1; colIdx < blocks.length; colIdx ++) {\n            block = blocks[colIdx]\n\n            if (matchingBlocks[0].matches(block)) {\n                matchingBlocks.push(block);\n\n                //If match is for final 3 blocks\n                if (colIdx === blocks.length - 1 && this.actualMatch(matchingBlocks)){\n                    matchesArr.push(matchingBlocks)\n                }\n            } else {\n                if (this.actualMatch(matchingBlocks)) {\n                   matchesArr.push(matchingBlocks)\n                } \n                matchingBlocks = [blocks[colIdx]];\n            }\n        }\n\n        return matchesArr;\n    }\n\n    actualMatch(matchingBlocks) {\n        return !matchingBlocks[0].isWhite() && matchingBlocks.length > 2\n    }\n\n    turnMatchesWhite() {\n        this.matches.forEach(blocks => {\n            blocks.forEach(block => block.color = \"white\")\n        })\n    }\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MatchingBlocks);\n\n//colIdx = 3\n// mB = [3]\n\n//# sourceURL=webpack:///./src/matching_blocks.js?");

/***/ })

/******/ });