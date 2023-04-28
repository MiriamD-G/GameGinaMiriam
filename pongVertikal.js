var score = 0
var wBar = 20; // With of bar
var lBar = 300; // Length of bar
var dBall = 150; // Diameter of ball
var speedX = 13;
var speedY = 15;
var xBall 
var yBall 
let posA = 50 // Position of barA
let posB = 50 // Position of barB
let scoreA = 0;
let scoreB = 0;
let fontSize = 50;
let barSpeed = 15

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    xBall = random(dBall/2, width -dBall/2)
    yBall = random(dBall/2, height - dBall/2)
    // xBall = width/2
    // yBall = height/2
    colorMode(HSB, 360, 100, 100)
}

function draw() {
  background(0);
  // fill(255);

  // Linien im Spielfeld
  push()
  stroke(10, 0, 100)
  line(width/2, 0, width/2, height)
  line(0, height/2, width, height/2)
  pop()


  //Spieler A links
  // Score
  fill(255)
  textSize(24);
  textAlign(LEFT)
  text("Score A: " + scoreA, 10, 25);
  // Farbe: je näher der Ball, umso intensiver die Farbe
  let sA = map(xBall, 0, width, 100, 0)
  fill(150, sA, 100)
    // Balken links. Mit A und Q steuerbar innerhalb der windowHeight
    rect(0, posA, wBar, lBar)
    if (keyIsDown(65) && posA < windowHeight - lBar){ // a nach unten
        posA += barSpeed
      }
    if (keyIsDown(81) && posA > 0){ // q nach oben
        posA -= barSpeed
      }
  
  //Spieler B rechts
  // Score
  textSize(24);
  fill(255)
  textAlign(RIGHT);
  text(" Score B: " + scoreB, width - 10, 25);
  // Farbe: je näher der Ball, umso intensiver die Farbe
  let sB = map(xBall, 0, width, 0, 100)
  fill(350, sB, 100)
    // Balken rechts. Mit L und O steuerbar innerhalb der windowHeight
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
    // scoreA = scoreA + 1 // zählt ein Punkt im Score dazu
    // dBall = dBall -10 // reduziert die Ballgrösse bei jedem Abprall
}

// Abprall vom Spieler B
// Liegt: x-Achse = WindowWidth - Balken breite und der Hälfte des Balls // y-Achse zwischen den beiden Balken Enden
  if (xBall > windowWidth - wBar - dBall/2 && yBall > posB && yBall < posB + lBar) {
    speedX = -speedX
    // scoreB = scoreB + 1 // zählt ein Punkt im Score dazu
    // dBall = dBall -10 // reduziert die Ballgrösse bei jedem Abprall
}

  // Wenn der Ball aus dem Canvas fliegt    
  // if (xBall > windowWidth || xBall < 0) {
  //   background(255, 0, 0)
  //   textAlign(CENTER)
  //   textSize(fontSize)
  //   text("GAME OVER", width / 2, height / 2)
  // }

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



}