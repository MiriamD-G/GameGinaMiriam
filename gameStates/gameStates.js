let gameState = 0
let gameStartTime = 0
let gameDuration = 10
let fontSize = 40
let hasGameStarted = false
let timeElapsed
let ball
let arrow

// var score = 0
var wBar = 20; // With of bar
var lBar = 200; // Length of bar
var dBall = 100; // Diameter of ball
var speedX = 5;
var speedY = 10;
var xBall 
var yBall 
let posA = 50 // Position of barA
let posB = 50 // Position of barB
let scoreA = 0;
let scoreB = 0;
let barSpeed = 25 // Reaktionsgeschwindigkeit der Balken
let delayAfterScore = 5000;
let timeScored = null;
let scoreUpdated = false;
let goal = 3 // Anzahl Punkte für den Sieg

function setup(){
createCanvas (windowWidth, windowHeight)
// ball = new Ball()
arrow = new Arrow(100, 70, 20)
xBall = width/2
yBall = height/2
colorMode(HSB, 360, 100, 100)
}

function draw(){
    if(gameState == 0){
        // Start
        startGame()

    } else if (gameState == 1){
        // Spielen
        playGame()

    } else if (gameState == 2){
        // Game over
        finishGame()
    }
}

function startGame(){
    background(220, 40, 40)
    textAlign(CENTER)
    textSize(20)
    textStyle(BOLD)
    // text("START", width/2, height/2)

    // Q-Pfeil:
    push()
    translate(width/2-80, height/2-50)
    push()
    stroke(150, 50, 100)
    rotate(PI)
    arrow.show()
    pop()
    fill(220, 40, 40)
    text("Q", 0, 0)
    pop()

    // A-Pfeil:
    push()
    translate(width/2-80, height/2+50)
    push()
    stroke(150, 50, 100)
    arrow.show()
    pop()
    fill(220, 40, 40)
    text("A", 0, 15)
    pop()

    // O-Pfeil:
    push()
    translate(width/2+80, height/2-50)
    push()
    stroke(350, 50, 100)
    rotate(PI)
    arrow.show()
    pop()
    fill(220, 40, 40)
    text("O", 0, 0)
    pop()

    // L-Pfeil:
    push()
    translate(width/2+80, height/2+50)
    push()
    stroke(350, 50, 100)
    arrow.show()
    pop()
    fill(220, 40, 40)
    text("L", 0, 15)
    pop()
    
}


// ! negation von scoreUpdated also wenn der score nicht updated wurde wird er updated
// score wird gesetzt bevor der Ball wieder neu gestzt wird
// die aktuelle Zeit (millis()) wird minus die unten gesetzte timeScored gerechnet. Sobald diese grösser wird als die gesetzte delayAfterScore wird der Ball in die Mitte gesetzt
function resetGame(playerScored){
    if (!scoreUpdated) {
        updateScore(playerScored);
    }
    if (millis() - timeScored > delayAfterScore){
        xBall = width / 2;
        yBall = height / 2;
        timeScored = null;
        scoreUpdated = false;

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

function playGame(){
    let sB = map(xBall, 0, width, 0, 100)
    let sA = map(xBall, 0, width, 100, 0)
    background(250, 100, 20)

    // ball.show()
    // ball.bounce()
    // Spiellogik ...

      // Linien im Spielfeld
    push()
    // stroke(10, 0, 100)
    // line(width/2, 0, width/2, height)
    // line(0, height/2, width, height/2)
    pop()

    //Spieler A links
    // let sA = map(xBall, 0, width, 100, 0)
    noStroke();
    fill(150, sA, 100)
    textSize(50);
    textAlign(LEFT)
    text(scoreA, 30, 55);
    rect(0, posA, wBar, lBar)
    if (keyIsDown(65) && posA < windowHeight - lBar){ // a nach unten
        posA += barSpeed
    }
    if (keyIsDown(81) && posA > 0){ // q nach oben
        posA -= barSpeed
    }
  
    //Spieler B rechts
    // let sB = map(xBall, 0, width, 0, 100)
    noStroke();
    fill(350, sB, 100)
    textSize(50);
    textAlign(RIGHT);
    text(scoreB, width - 30, 55);
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
    if(yBall > height -dBall/2 || yBall < dBall/2) {
        speedY = -speedY
    }

    // Abprall vom Spieler A
    // Liegt: x-Achse = Balken breite und der Hälfte des Balls // y-Achse zwischen den beiden Balken Enden
    if (xBall < wBar + dBall/2 && yBall > posA && yBall < posA + lBar) {
        speedX = -speedX
        // dBall = dBall -10 // reduziert die Ballgrösse bei jedem Abprall
    }

    // Abprall vom Spieler B
    // Liegt: x-Achse = WindowWidth - Balken breite und der Hälfte des Balls // y-Achse zwischen den beiden Balken Enden
    if (xBall > windowWidth - wBar - dBall/2 && yBall > posB && yBall < posB + lBar) {
        speedX = -speedX
        // dBall = dBall -10 // reduziert die Ballgrösse bei jedem Abprall
    }
    
    // if - Verschachtelung
    // Anfangswert von timeScored = null
    // if timeScored == null check bewirkt, dass timeScored nicht jedes mal beim Durchlaufen des draw-loops auf die aktuelle Zeit gesetzt wird
    if (xBall > windowWidth) {
        if (timeScored == null) {
            timeScored = millis();
        }
        resetGame('A');
    }

    if (xBall < 0) {
        if (timeScored == null) {
            timeScored = millis();
        }
        resetGame('B');
    }
    if (scoreA == goal || scoreB == goal){
        gameState = 2
    }
}

function finishGame(){
    background(150, 60, 100)
    textAlign(CENTER)
    textSize(fontSize)
    text("The Winner is:", width/2, height/2)
    if (scoreA == goal){
        text("A", width/2, height/2 + 40)
    }
    if (scoreB == goal){
        text("B", width/2, height/2 + 40)
    }
}


function mousePressed(){
    if (gameState == 0){
        gameState = 1
        scoreA = 0
        scoreB = 0
    } else if (gameState == 2){
        gameState = 0
    }
}

function sleep(millisecondsDuration) {
    return new Promise((resolve) => {
        setTimeout(resolve, millisecondsDuration);
        console.log('bar');
    })
}