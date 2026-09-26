
const r = require("raylib");

function running() {
    return !r.WindowShouldClose();
}

const Width = 500;
const Height = 250;
const FPS = 60;
const half = Width / 2;

let detect1_X1 = 0;
let detect1_X2;

let detect2_X1 = half;
let detect2_X2;

const detectY = 0;
const dWidth = 30;

let detect3X = 0;
let detect3_Y1 = 0;

const bWidth1 = 50;
const bRangeX1 = half - bWidth1;
const bRangeY = 0;

const cRange1 = bRangeX1 - dWidth;

const bRangeX2 = half + 100;
const bWidth2 = 5;

const cRange2 = bRangeX2 - dWidth;
const cRange3 = bRangeX2 + bWidth2;

const bRangeX3 = 0;
const bRangeY1 = Height / 2;
const bWidth3 = 20;

const cRange4 = bRangeY1 - dWidth;
const cRange5 = bRangeY1 + bWidth3;

let color1;
let color2;
let color3 = r.WHITE;

let value1 = 0;
let value2 = 0;
let value3 = 0;

function setup() {
    r.InitWindow(Width, Height, "Particle_Detector");
    r.SetTargetFPS(FPS);
}

function colorSelection(x, range1, range2, range3 = half) {
    return (x >= range1 && x <= range2) || x === range3 ?
        r.RED : r.WHITE;
}

function update() {

    if (detect1_X1 === 0) {
        value1 = 0.5;
    } else if (detect1_X2 === half) {
        value1 = -0.5;
    }

    detect1_X1 += value1;
    detect1_X2 = detect1_X1 + dWidth;

    if (detect2_X1 === half) {
        value2 = 1;
    } else if (detect2_X2 === Width) {
        value2 = -1;
    }

    detect2_X1 += value2;
    detect2_X2 = detect2_X1 + dWidth;

    if (detect3_Y1 === 0) {
        value1 = 0.5;
    } else if (detect3_Y1 + dWidth === half) {
        value1 = -0.5;
    }

    detect3_Y1 += value1;

    color1 = colorSelection(detect1_X1, cRange1, half);
    color2 = colorSelection(detect2_X1, cRange2, cRange3);
    color3 = colorSelection(detect3_Y1, cRange4, cRange5, bRangeY1);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(bRangeX1, bRangeY, bWidth1, Height, r.SKYBLUE);
    r.DrawRectangle(bRangeX2, bRangeY, bWidth2, Height, r.SKYBLUE);
    r.DrawRectangle(bRangeX3, bRangeY1, Width, bWidth3, r.SKYBLUE);


    r.DrawRectangle(detect1_X1, detectY, dWidth, Height, color1);
    r.DrawRectangle(detect2_X1, detectY, dWidth, Height, color2);
    r.DrawRectangle(detect3X, detect3_Y1, Width, dWidth, color3);

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
