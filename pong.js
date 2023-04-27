var score = 0
var b = 15;
var d = 30;
var speedX = 2;
var speedY = 6;
var x;
var y;

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
    rect(0, mouseY, b, 100)
    rect(width-b, mouseX, b, 100)

    fill(255)
    ellipse(x, y, d, d)
    x += speedX
    y += speedY

    if(y > height -d/2 || y < d/2) {
        speedY =- speedY
    }
}