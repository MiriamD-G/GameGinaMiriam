let gameState = 0
let hasGameStarted = false
let timeElapsed
let ball

var wBar = 10 // With of bar
var lBar = 200 // Length of bar
var dBall = 20 // Diameter of ball
var speedX = 5
var speedY = 10
var xBall
var yBall
let posA = 50 // Position of barA
let posB = 50 // Position of barB
let scoreA = 0
let scoreB = 0
let barSpeed = 15 // Reaktionsgeschwindigkeit der Balken
let delayAfterScore = 1000
let timeScored = null
let scoreUpdated = false
let arrow
let goal = 3

// Farben
let colA
let colB
let colBG 


function setup(){
createCanvas (windowWidth, windowHeight)
// ball = new Ball()
arrow = new Arrow()
xBall = width/2
yBall = height/2
colorMode(HSB, 360, 100, 100)
// Farben
colA = color(150, 100, 100)
colB = color(250, 50, 100)
colBG = color(180, 60, 20)

}

function draw() {
    if (gameState == 0) {
        // Start
        startGame()
    } else if (gameState == 1) {
        // Spielen
        playGame()

    } else if (gameState == 2) {
        // Game over
        finishGame()
    }
}

function startGame(){
    background(colBG)
    push()
    stroke(colA)
    translate(width/2, height/2)
    arrow.show(-300, 10, 0)
    arrow.show(10, -280, -HALF_PI)
    arrow.show(300, 30, -HALF_PI)
    pop()
    push()
    stroke(colB)
    translate(width/2, height/2)
    arrow.show(300, 10, 0)
    arrow.show(-10, -280, HALF_PI)
    arrow.show(-300, 30, HALF_PI)
    pop()
    push()
    translate(width/2, height/2)
    fill(colBG)
    textAlign(CENTER)
    textSize(20)
    textStyle(BOLD)
    text("A", -300, -110)
    text("S", -195, -3)
    text("Y", -300, 105)
    text("O", 300, -110)
    text("K", 195, -3)
    text("L", 300, 105)
    pop()    
}


// ! negation von scoreUpdated also wenn der score nicht updated wurde wird er updated
// score wird gesetzt bevor der Ball wieder neu gestzt wird
// die aktuelle Zeit (millis()) wird minus die unten gesetzte timeScored gerechnet. Sobald diese grösser wird als die gesetzte delayAfterScore wird der Ball in die Mitte gesetzt
function resetGame(playerScored) {
    if (!scoreUpdated) {
        updateScore(playerScored)
    }
    if (millis() - timeScored > delayAfterScore) {
        xBall = width/2
        yBall = height/2
        timeScored = null
        scoreUpdated = false

    }
}
function updateScore(playerScored) {
    if (playerScored == 'A') {
        scoreA += 1;
    }
    if (playerScored == 'B') {
        scoreB += 1;
    }
    scoreUpdated = true;
}

function playGame() {
    background(colBG)

    // Linien im Spielfeld
    push()
    strokeWeight(1)
    stroke(10, 0, 100)
    line(width/2, 0, width/2, height)
    line(0, height/2, width, height/2)
    pop()

    noStroke()
    textSize(50)
    
    //Spieler A links
    fill(colA)
    textAlign(LEFT)
    text(scoreA, 30, 55)
    rect(0, posA, wBar, lBar)
    if (keyIsDown(65) && posA < windowHeight - lBar) { // a nach unten
        posA += barSpeed
    }
    if (keyIsDown(81) && posA > 0) { // q nach oben
        posA -= barSpeed
    }

    //Spieler B rechts
    fill(colB)
    textAlign(RIGHT);
    text(scoreB, width - 30, 55)
    rect(width - wBar, posB, wBar, lBar)
    if (keyIsDown(76) && posB < windowHeight - lBar) { // l nach unten
        posB += barSpeed
    }
    if (keyIsDown(79) && posB > 0) { // o nach oben
        posB -= barSpeed
    }

    // Ball
    fill(255)
    ellipse(xBall, yBall, dBall)
    xBall += speedX
    yBall += speedY

    // Abprall von oben und unten
    if (yBall > height - dBall/2 || yBall < dBall/2) {
        speedY = -speedY
    }

    const ballAmLinkenRand = xBall < wBar + dBall/2 && xBall + dBall/2 > 0
    const ballAufHoeheLinkesPaddle = yBall > posA && yBall < posA + lBar

    const ballAmRechtenRand = xBall > windowWidth - wBar - dBall/2 && xBall - dBall/2 < windowWidth
    const ballAufHoeheRechtesPaddle = yBall > posB && yBall < posB + lBar

    const abprallLinks = ballAmLinkenRand && ballAufHoeheLinkesPaddle
    const abprallRechts = ballAmRechtenRand && ballAufHoeheRechtesPaddle

    if (abprallLinks || abprallRechts) {
        speedX = -speedX
    }

    if (xBall - dBall/2 > windowWidth) {
        if (timeScored == null) {
            timeScored = millis()
        }
        resetGame('A');
    } else if (xBall + dBall/2 < 0) {
        //+ dBall/2 hinzugefügt
        if (timeScored == null) {
            timeScored = millis()
        }
        resetGame('B');
    } else if (scoreA == goal || scoreB == goal){
        gameState = 2
    }
}


function finishGame(){
    if (scoreA == goal){
        background(colA)
    } else if (scoreB == goal){
        background(colB)
    }
    textAlign(CENTER)
    textSize(30)
    text("The Winner is: ", width/2, height/2)
    if (scoreA == goal) {
        text("A", width/2, height/2 + 40)
    }
    if (scoreB == goal) {
        text("B", width/2, height/2 + 40)
    }
}

function mousePressed() {
    if (gameState == 0) {
        gameState = 1
        scoreA = 0
        scoreB = 0
    } else if (gameState == 2) {
        gameState = 0
    }
}
