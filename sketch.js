
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
}

const bRangeX = 100;
const bRangeY = 0;
const bWidth = 50;
function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(bRangeX, bRangeY, bWidth, Height, r.SKYBLUE);
    r.DrawRectangle(detectX1, detectY, dWidth, Height, r.WHITE);
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