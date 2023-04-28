var score = 0
var b = 15; // Breite vom Balken
var d = 30;
var speedX = 2;
var speedY = 6;
var x;
var y;
let posA = 50
let posB = 50


function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    x = random(d/2, width -d/2)
    y = random(d/2, height - d/2)

}

function draw() {
    // Background
    background(0);
    fill(255);

    //Score
    textSize(24);
    text("Score: " + score, 10, 25);

    fill(255)
    // Balken links. Mit A und Q steuerbar
    rect(0, posA, b, 100)
    if(keyIsDown(65)){ // a nach unten
        posA += 5
      }
      if(keyIsDown(81)){ // q nach oben
        posA -= 5
      }
    
    // Balken rechts. Mit L und O steuerbar
    rect(width-b, posB, b, 100)
    if(keyIsDown(76)){ // l nach unten
        posB += 5
      }
      if(keyIsDown(79)){ // o nach oben
        posB -= 5
      }
    

    fill(255)
    ellipse(x, y, d)
    x += speedX
    y += speedY

    if(y > height -d/2 || y < d/2) {
        speedY = -speedY
    }
}