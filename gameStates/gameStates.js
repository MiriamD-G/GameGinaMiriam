let gameState = 0
let hasGameStarted = false
let timeElapsed
let ball

let border = 50
let fieldWide
let fieldHeight 
let rightEnd = 800
let TLineA = 300


var wBar = 10 // With of bar
var lBar = 200 // Length of bar
var dBall = 20 // Diameter of ball
var speedX = 5
var speedY = 10
var xBall
var yBall
let posAY = 50 // y-Position of barA
let posBY = 50 // Position of barB
let posAX = 0 // x-Position von barA
let posBX = rightEnd - wBar // x-Position von barB
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
fieldWide = windowWidth - border*2
fieldHeight = fieldWide*0.46


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
    arrow.show(-10, 320, -HALF_PI)
    pop()
    push()
    stroke(colB)
    translate(width/2, height/2)
    arrow.show(300, 10, 0)
    arrow.show(-10, -280, HALF_PI)
    arrow.show(-300, 30, HALF_PI)
    arrow.show(10, 320, HALF_PI)
    pop()
    push()
    translate(width/2, height/2)
    fill(colBG)
    textAlign(CENTER)
    textSize(20)
    textStyle(BOLD)
    text("W", -300, -110)
    text("S", -195, -3)
    text("Y", -300, 105)
    text("A", -405, -3)
    text("I", 300, -110)
    text("J", 195, -3)
    text("M", 300, 105)
    text("K", 405, -3)
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
    noFill()
    stroke(10, 0, 100)
    // rect(100, 100, 300, 300)
    rect(border, border*2, fieldWide, fieldHeight)
    line(width/2, border*2, width/2, border*2+fieldHeight)
    line(0, height/2, width, height/2)
    pop()

    noStroke()
    textSize(50)
    
    //Spieler A links
    fill(colA)
    textAlign(LEFT)
    text(scoreA, 30, 55)
    rect(posAX, posAY, wBar, lBar)
    if (keyIsDown(89) && posAY < windowHeight - lBar) { // Y nach unten
        posAY += barSpeed
    }
    if (keyIsDown(87) && posAY > 0) { // W nach oben
        posAY -= barSpeed
    }
    if (keyIsDown(83) && posAX >= 0 && posAY < TLineA) { // S nach rechts
        posAX += barSpeed
    }
    if (keyIsDown(65) && posAX >= 0 && posAX < TLineA) { // A nach links
        posAX -= barSpeed
    }



    //Spieler B rechts
    fill(colB)
    textAlign(RIGHT);
    text(scoreB, width - 30, 55)
    rect(posBX, posBY, wBar, lBar)
    if (keyIsDown(77) && posBY < windowHeight - lBar) { // M nach unten
        posBY += barSpeed
    }
    if (keyIsDown(73) && posBY > 0) { // I nach oben
        posBY -= barSpeed
    }
    if (keyIsDown(74) && posBX >= 0) { // J nach links
        posBX -= barSpeed
    }
    if (keyIsDown(75) && posBX <= windowWidth) { // K nach rechts
        posBX += barSpeed
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

    const ballAmLinkenRand = xBall < posAX + wBar + dBall/2 && xBall + dBall/2 > posAX
    const ballAufHoeheLinkesPaddle = yBall > posAY && yBall < posAY + lBar

    const ballAmRechtenRand = xBall > rightEnd - wBar - dBall/2 - posBX && xBall - dBall/2 < rightEnd - posBX
    const ballAufHoeheRechtesPaddle = yBall > posBY && yBall < posBY + lBar

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
