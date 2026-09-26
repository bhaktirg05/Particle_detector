
const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

const Width = 500;
const Height = 400;
const FPS = 60;

let detectX1 = 0;
let detectX2;
const detectY = 0;
const dWidth = 30;
let value = 0;

const bRangeX1 = 100;
const bRangeY = 0;
const bWidth1 = 50;
const cRange1 = bRangeX1 - dWidth;
const cRange2 = bRangeX1 + bWidth1;
const bRangeX2 = 200;
const bWidth2 = 20;
const cRange3 = bRangeX2 - dWidth;
const cRange4 = bRangeX2 + bWidth2;

let color;

function setup() {
    r.InitWindow(Width, Height, "Particle_Detector");
    r.SetTargetFPS(FPS);
}


function update() {
    if (detectX1 === 0) {
        value = 2;
    } else if (detectX2 === Width) {
        value = -2;
    }
    detectX1 += value;
    detectX2 = detectX1 + dWidth;
    const condition1 = detectX1 >= cRange1 && detectX1 <= cRange2;
    const condition2 = detectX1 >= cRange3 && detectX1 <= cRange4;
    color = condition1 || condition2 ? r.RED : r.WHITE;
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(bRangeX1, bRangeY, bWidth1, Height, r.SKYBLUE);
    r.DrawRectangle(bRangeX2, bRangeY, bWidth2, Height, r.SKYBLUE);

    r.DrawRectangle(detectX1, detectY, dWidth, Height, color);
    r.EndDrawing();
}

function teardown() {
    r.CloseWindow();
}

module.exports = {
    running,
    setup,
    update,
    draw,
    teardown,
};