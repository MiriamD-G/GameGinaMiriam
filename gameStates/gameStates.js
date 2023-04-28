let gameState = 0
let gameStartTime = 0
let gameDuration = 10
let fontSize = 20
let hasGameStarted = false
let timeElapsed
let ball

var score = 0
var wBar = 20; // With of bar
var lBar = 300; // Length of bar
var dBall = 50; // Diameter of ball
var speedX = 5;
var speedY = 10;
var xBall 
var yBall 
let posA = 50 // Position of barA
let posB = 50 // Position of barB
let scoreA = 0;
let scoreB = 0;
let barSpeed = 15 // Reaktionsgeschwindigkeit der Balken


function setup(){
createCanvas (windowWidth, windowHeight)
// ball = new Ball()
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
    background(20, 100, 100)
    textAlign(CENTER)
    textSize(fontSize)
    text("START", width/2, height/2)

}
function playGame(){
    background(230, 60, 30)

    // ball.show()
    // ball.bounce()
    // Spiellogik ...

      // Linien im Spielfeld
    push()
    stroke(10, 0, 100)
    line(width/2, 0, width/2, height)
    line(0, height/2, width, height/2)
    pop()

    //Spieler A links
    let sA = map(xBall, 0, width, 100, 0)
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
    let sB = map(xBall, 0, width, 0, 100)
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

    if (xBall > windowWidth) {
        scoreA += 1  
        xBall = width/2
        yBall = height/2
    }
    if (xBall < 0) {
        scoreB += 1
        xBall = width/2
        yBall = height/2
    }
    if (scoreA == 3 || scoreB == 3){
        gameState = 2
    }
}

function finishGame(){
    background(150, 60, 100)
    textAlign(CENTER)
    textSize(fontSize)
    text("GAME OVER", width/2, height/2)
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