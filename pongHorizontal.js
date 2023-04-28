var xBall = Math.floor(Math.random() * 300) + 50;
var yBall = 50;
var xSpeed = 4;
var ySpeed = 2;
var scoreA = 0
let scoreB = 0
var rectWide = 100
let Apos = 0
let Bpos = rectWide


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(0);
  fill(255);
  textSize(20);

  // Spieler A
  fill(255, 40, 255)
  textAlign(LEFT)
  text("Score A: " + scoreA, 10, 25);
  rect(Apos, windowHeight-15, rectWide, 15);
  if(keyIsDown(65)){ // a nach links
    Apos -= 5
  }
  if(keyIsDown(83)){ // s nach rechts
    Apos += 5
  }

  // Spieler B
  fill(40, 255, 255)
  textAlign(RIGHT);
  text(" Score B: " + scoreB, width-10, 25);
  rect(Bpos, windowHeight-15, rectWide, 15);
  if(keyIsDown(75)){ // k nach links
    Bpos -= 5
  }
  if(keyIsDown(76)){ // l nach rechts
    Bpos += 5
  }

  // Ball
  xBall += xSpeed;
  yBall += ySpeed
  fill(255)
  ellipse(xBall, yBall, 20, 20);
  xBall = xBall + xSpeed
  yBall = yBall + ySpeed

  // Abprall von den Seiten
  if(xBall>windowWidth-10 || xBall<0){
    xSpeed = -xSpeed;
  } 

  // Abprall von oben
  if(yBall<0){
    ySpeed = -ySpeed;
  } 

  // Abprall vom Spieler A
  if(yBall>windowHeight-25 && xBall>Apos && xBall<Apos+rectWide){
    ySpeed = -ySpeed
    scoreA = scoreA +1 // zählt ein Punkt im Score dazu
    // rectWide = rectWide -20 // reduziert die Balkenbreite bei jedem Abprall
  }

    // Abprall vom Spieler B
    if(yBall>windowHeight-25 && xBall>Bpos && xBall<Bpos+rectWide){
        ySpeed = -ySpeed
        scoreB = scoreB +1 // zählt ein Punkt im Score dazu
        // rectWide = rectWide -20 // reduziert die Balkenbreite bei jedem Abprall
      }
   
  // Wenn der Ball unten aus dem Canvas fliegt    
  if(yBall>windowHeight){
    background(255, 0, 0)
  }
}
