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

let tX, tY, sp, dspx, dspy, fct;

// function preload(){
//   font = loadFont("data/RobotoMono-Regular.ttf");
// }

function setup() {

    createCanvas(800, 400);
    createSliders();
    pg = createGraphics(800, 400);

}

function draw() {
    background(0);


    // PGraphics

    pg.background(0);
    pg.fill(255);
    // pg.textFont(font);
    pg.textSize(400);
    pg.push();
    pg.translate(width / 2, height / 2);
    pg.textAlign(CENTER, CENTER);
    pg.text("hello", 0, 0);
    pg.pop();


    let tilesX = tX.value();
    let tilesY = tY.value();

    let tileW = int(width / tilesX);
    let tileH = int(height / tilesY);

    for (let y = 0; y < tilesY; y++) {
        for (let x = 0; x < tilesX; x++) {

            // WARP
            let waveX = int(sin(frameCount * sp.value() + (x * y) * dspx.value()) * fct.value());
            let waveY = int(sin(frameCount * sp.value() + (x * y) * dspy.value()) * fct.value());

            if (dspx.value() === 0) {
                waveX = 0;
            }

            if (dspy.value() === 0) {
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

function createSliders() {
    // Tiles X
    tX = createSlider(1, 80, 16, 1);
    tX.hide()

    // Tiles Y
    tY = createSlider(1, 80, 16, 1);
    tY.hide()

    // Speed
    sp = createSlider(0, 1, 0.005, 0.01);
    sp.hide()

    // Displacement X
    dspx = createSlider(0, 0.1, 0.05, 0.001);
    dspx.hide()

    // Displacement Y
    dspy = createSlider(0, 0.2, 0, 0.01);
    dspy.hide()

    // Offset
    fct = createSlider(0, 300, 100, 1);
    fct.hide()


}
