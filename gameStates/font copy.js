// p5.js version of Tim Rodenbroeker Kinetic typography tutorial with some extra sliders
// You can find the whole tutorial here 
// https://timrodenbroeker.de/processing-tutorial-kinetic-typography-1/
//
// I left the code snippet to import a custom font.
// Link to the Roboto Mono : https://fonts.google.com/specimen/Roboto+Mono
//
// Have fun ! 



let pg;
let tX, tY, sp, dspx, dspy, fct;
let tilesX = 3;
let tilesY = 2;
let speed = 0.1;
let displacementX = 3;
let displacementY = 0.5;
let offset = 30;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // PGraphics
    pg = createGraphics(windowWidth/1.4, windowHeight/1.5);
    rectMode(CENTER);
    pg.background(0);
    pg.fill(255);
    pg.textSize(200);
    pg.translate(windowWidth / 2, windowHeight / 2);
    pg.textAlign(CENTER, CENTER);
    pg.text("RIGHT", 0, 0);
}

function draw() {
    background(0);


    let tileW = int(width / tilesX);
    let tileH = int(height / tilesY);

    for (let y = 0; y < tilesY; y++) {
        for (let x = 0; x < tilesX; x++) {

            // WARP
            let waveX = int(sin(frameCount * speed + (x * y) * displacementX) * offset);
            let waveY = int(sin(frameCount * speed + (x * y) * displacementY) * offset);

            if (displacementX === 0) {
                waveX = 0;
            }

            if (displacementY === 0) {
                waveY = 0;
            }

            // image(pg,0,0)

            // SOURCE
            let sx = x * tileW + waveX;
            let sy = y * tileH + waveY;
            let sw = tileW;
            let sh = tileH;

            // DESTINATION
            let dx = x * tileW;
            let dy = y * tileH;
            let dw = tileW;
            let dh = tileH;

            copy(pg, sx, sy, sw, sh, dx, dy, dw, dh);

        }
    }
}

