var score = 0
var wBar = 20; // With of bar
var lBar = 300; // Length of bar
var dBall = 150; // Diameter of ball
var speedX = 10;
var speedY = 5;
var xBall = Math.floor(Math.random() * 300) + 50; // x-Start/x-Position of ball
var yBall = 50; // y-Start/y-Position of ball
let posA = 50 // Position of barA
let posB = 50 // Position of barB
let scoreA = 0;
let scoreB = 0;
let fontSize = 50;


function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    xBall = random(dBall/2, width -dBall/2)
    yBall = random(dBall/2, height - dBall/2)
}

function draw() {
  // Background
  background(0);
  fill(255);

  //Spieler A links
  // Score
  fill(255)
  textSize(24);
  textAlign(LEFT)
  text("Score A: " + scoreA, 10, 25);
  // Farbe mit map gegeben
  let redA = map(posA, 0, height, 0, 255);
  let greenA = map(posA, 0, height, 255, 0);
  let blueA = map(posA, 0, height, 0, 255);
  fill(redA, greenA, blueA)
    // Balken links. Mit A und Q steuerbar innerhalb der windowHeight
    rect(0, posA, wBar, lBar)
    if (keyIsDown(65) && posA < windowHeight - lBar){ // a nach unten
        posA += 10
      }
    if (keyIsDown(81) && posA > 0){ // q nach oben
        posA -= 10
      }
  
  //Spieler B rechts
  // Score
  textSize(24);
  fill(255)
  textAlign(RIGHT);
  text(" Score B: " + scoreB, width - 10, 25);
  // Farbe mit map gegeben
  let redB = map(posB, 0, height, 0, 255);
  let greenB = map(posB, 0, height, 255, 0);
  let blueB = map(posB, 0, height, 0, 255);
  fill(redB, greenB, blueB)
    // Balken rechts. Mit L und O steuerbar innerhalb der windowHeight
  rect(width - wBar, posB, wBar, lBar)
  if (keyIsDown(76) && posB < windowHeight - lBar) { // l nach unten
    posB += 10
  }
  if (keyIsDown(79) && posB > 0) { // o nach oben
    posB -= 10
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
    scoreA = scoreA + 1 // zählt ein Punkt im Score dazu
    // dBall = dBall -10 // reduziert die Ballgrösse bei jedem Abprall
}

// Abprall vom Spieler B
// Liegt: x-Achse = WindowWidth - Balken breite und der Hälfte des Balls // y-Achse zwischen den beiden Balken Enden
  if (xBall > windowWidth - wBar - dBall/2 && yBall > posB && yBall < posB + lBar) {
    speedX = -speedX
    scoreB = scoreB + 1 // zählt ein Punkt im Score dazu
    // dBall = dBall -10 // reduziert die Ballgrösse bei jedem Abprall
}

  // Wenn der Ball aus dem Canvas fliegt    
  if (xBall > windowWidth || xBall < 0) {
    background(255, 0, 0)
    textAlign(CENTER)
    textSize(fontSize)
    text("GAME OVER", width / 2, height / 2)
  }
}