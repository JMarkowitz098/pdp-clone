class Gameover {
    constructor() {
        this.ele =  document.getElementById("gameover-container");
    }

    initializeGameOver() {
        let button = document.getElementById("gameover-button")
        button.addEventListener("click", this.reloadPage)
        
        let finalScore = document.getElementById("go-score")
        let score = document.getElementById("score").innerHTML
        finalScore.innerHTML = `Final Score: ${score}`;

        this.ele.style.visibility = "visible"
    }

    reloadPage(e) {
        location.reload()
    }
}

export default Gameover;