class Score {
    constructor (){
        this.startTime = Date.now();
        this.scoreEle = this.createScoreEle();
    }

    getSecondsPasssed() {
        return Math.floor((Date.now() - this.startTime) / 1000)
    }

    createScoreEle() {
        let scoreContainer = document.createElement("div");
        scoreContainer.id = "score-container"
        let scoreWord = document.createElement("div")
        scoreWord.innerHTML = "Score"
        let scoreEle = document.createElement("div")
        scoreEle.id = "score"

        scoreContainer.append(scoreWord)
        scoreContainer.append(scoreEle)
        let left = document.getElementById("left-container")
        left.insertBefore(scoreContainer, left.firstChild)
        return scoreEle;
    }


    displayScore() {
        this.scoreEle.innerHTML = this.getSecondsPasssed();
    }

}

export default Score;