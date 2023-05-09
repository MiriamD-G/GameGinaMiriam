let gameState = 0
let hasGameStarted = false
let timeElapsed
let ball

let border = 50
let fieldWide
let fieldHeight 
let rightEnd
let TLineA 
let TLineB 
let upperSSL
let lowerSSL



var wBar = 10 // With of bar
var lBar = 200 // Length of bar
var dBall = 20 // Diameter of ball
var speedX = 5
var speedY = 10
var xBall
var yBall
let posAY
let posBY
let posAX 
let posBX
let scoreA = 0
let scoreB = 0
let barSpeed = 25 // Reaktionsgeschwindigkeit der Balken
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

// Feldlinien
fieldWide = windowWidth - border*2
fieldHeight = fieldWide*0.46
rightEnd = border + fieldWide
TLineA = border + fieldWide*0.23
TLineB = rightEnd - fieldWide*0.23
upperSSL = border*2 + fieldHeight*0.125
lowerSSL = border*2 + fieldHeight*0.875

// 
posAY = border*2 + fieldHeight/2 + lBar/2 // y-Position of barA
posBY = border*2 + fieldHeight/2 + lBar/2 // Position of barB
posAX = border // x-Position von barA
posBX = rightEnd - wBar // x-Position von barB



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
    rect(border, border*2, fieldWide, fieldHeight) // ganzes Feld
    line(TLineA, border*2 + fieldHeight/2, TLineB, border*2 + fieldHeight/2) // Centre Serviece Line
    line(border, upperSSL, border + fieldWide, upperSSL) // obere Single Sideline
    line(border, lowerSSL, border + fieldWide, lowerSSL) // untere Single Sideline
    line(TLineA, upperSSL, TLineA, lowerSSL) // linke Service Line (TLineA)
    line(TLineB, upperSSL, TLineB, lowerSSL) // rechte Service Line (TLineB)
    strokeWeight(4)
    line(width/2, border*2, width/2, border*2+fieldHeight) // Netz
    pop()

    noStroke()
    textSize(50)
    
    //Spieler A links
    fill(colA)
    textAlign(LEFT)
    text(scoreA, border, border)
    rect(posAX, posAY, wBar, lBar)
    if (keyIsDown(89) && posAY < border*2 + fieldHeight - lBar) { // Y nach unten
        posAY += barSpeed
    }
    if (keyIsDown(87) && posAY > 2*border) { // W nach oben
        posAY -= barSpeed
    }
    if (keyIsDown(83) && posAX <= TLineA - wBar) { // S nach rechts
        posAX += barSpeed
    }
    if (keyIsDown(65) && posAX >= border) { // A nach links
        posAX -= barSpeed
    }



    //Spieler B rechts
    fill(colB)
    textAlign(RIGHT);
    text(scoreB, width - border, border)
    rect(posBX, posBY, wBar, lBar)
    if (keyIsDown(77) && posBY < border*2 + fieldHeight - lBar) { // M nach unten
        posBY += barSpeed
    }
    if (keyIsDown(73) && posBY > 2*border) { // I nach oben
        posBY -= barSpeed
    }
    if (keyIsDown(74) && posBX >= TLineB) { // J nach links
        posBX -= barSpeed
    }
    if (keyIsDown(75) && posBX <= rightEnd - wBar) { // K nach rechts
        posBX += barSpeed
    }



    // Ball
    fill(255)
    ellipse(xBall, yBall, dBall)
    xBall += speedX
    yBall += speedY

    // Abprall von oben und unten
    if (yBall > border*2 + fieldHeight - dBall/2 || yBall < border*2 + dBall/2) {
        speedY = -speedY
    }

    const ballAmLinkenRand = xBall < posAX + wBar + dBall/2 && xBall + dBall/2 > posAX
    const ballAufHoeheLinkesPaddle = yBall > posAY && yBall < posAY + lBar

    const ballAmRechtenRand = xBall > posBX - dBall/2 
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
