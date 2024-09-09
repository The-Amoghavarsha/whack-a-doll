let holes = document.querySelectorAll(".hole");
let scoreBoard = document.querySelector(".score");
let dolls = document.querySelectorAll(".doll");
let lastHole;
let timeUp = true;  
let score = 0;
let gameStarted = false;  
let gameTimer;

function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
    const idx = Math.floor(Math.random() * holes.length);
    const hole = holes[idx];
    if (hole === lastHole) {
        return randomHole(holes);
    }
    lastHole = hole;
    return hole;
}

function peep() {
    const time = randomTime(200, 1000);
    const hole = randomHole(holes);
    hole.classList.add("up");
    setTimeout(() => {
        hole.classList.remove("up");
        if (!timeUp) peep();
    }, time);
}

function startGame() {
    if (timeUp && !gameStarted) {  
        restartGame();  
    } else if (timeUp && gameStarted) {  
        timeUp = false;
        peep();
    }
}

function stopGame() {
    timeUp = true;
    clearTimeout(gameTimer);
}

function restartGame() {
    stopGame();  
    score = 0;  
    scoreBoard.textContent = score;  
    gameStarted = true;  
    timeUp = false;  
    peep();  
}

function bonk(e) {
    if (!e.isTrusted) return;  
    score++;
    this.classList.remove("up");
    scoreBoard.textContent = score;
}


document.querySelector(".stop-button").addEventListener("click", stopGame);

dolls.forEach(doll => doll.addEventListener("click", bonk));

