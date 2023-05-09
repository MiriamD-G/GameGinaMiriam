// p5.js version of Tim Rodenbroeker Kinetic typography tutorial with some extra sliders
// You can find the whole tutorial here 
// https://timrodenbroeker.de/processing-tutorial-kinetic-typography-1/
//
// I left the code snippet to import a custom font.
// Link to the Roboto Mono : https://fonts.google.com/specimen/Roboto+Mono
//
// Have fun ! 



let font;
let pg;
let cnv;

let tX, tY, sp, dspx, dspy, fct;

function centerCanvas() {
    var x = (windowWidth - width) / 2;
    var y = (windowHeight - height) / 2;
    cnv.position(x, y);
}

function setup() {

    cnv = createCanvas(600, 300);
    centerCanvas();
    background(255, 0, 200);
    pg = createGraphics(600, 300);

}
function windowResized() {
    centerCanvas();
}
function draw() {
    background(0);


    // PGraphics

    pg.background(0);
    pg.fill(255);
    // pg.textFont(font);
    pg.textSize(200);
    pg.push();
    pg.translate(width / 2, height / 2);
    pg.textAlign(CENTER, CENTER);
    pg.text("RIGHT", 0, 0);
    pg.pop();


    let tilesX = 8;
    let tilesY = 3;
    let speed = 0.1;
    let displacementX = 0.05;
    let displacementY = 0.5;
    let offset = 30;

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

