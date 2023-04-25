let gameState = 0
let gameStartTime = 0
let gameDuration = 5
let fontSize = 40
let hasGameStarted = false
let timeElapsed

function setup(){
createCanvas (600, 600)
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
    drawTime()
}

function startGame(){
    background(0, 200, 80)
    textAlign(CENTER)
    textSize(fontSize)
    text("START", width/2, height/2)

}
function playGame(){
    background(0, 200, 250)
    textAlign(CENTER)
    textSize(fontSize)
    text("SPIELEN", width/2, height/2)

    // Spiellogik ...
}
function finishGame(){
    background(255, 120, 60)
    textAlign(CENTER)
    textSize(fontSize)
    text("GAME OVER", width/2, height/2)
}

function drawTime(){
    timeElapsed = millis()/1000
    textSize(20)
    if(hasGameStarted){
        let gameTimeElapsed = round(gameDuration - (timeElapsed - gameStartTime))
        text("verbleibende Zeit: " + gameTimeElapsed, width/2, height - 20)
    }

    if(timeElapsed -gameStartTime >= gameDuration){
        gameStartTime = NaN
        hasGameStarted = false
        gameState = 2
    }
}

function mousePressed(){
    if (gameState == 0){
        gameState = 1
        gameStartTime = millis()/1000
        hasGameStarted = true
    } else if (gameState == 2){
        gameState = 0
    }
}