
const r = require("raylib");
const Width = 500;
const Height = 250;
const FPS = 60;
const half = Width / 2;

let detect1_X = 0;
let detect2_X = half;
const detectY = 0;

let detect3_X = 0;
let detect3_Y = 0;

const detectWidth = 30;

const fieldWidth1 = 50;
const field1_X = half - fieldWidth1;
const field1_Y = 0;

const field1_Range = field1_X - detectWidth;

const field2_X = half + 100;
const fieldWidth2 = 5;

const field2_Range1 = field2_X - detectWidth;
const field2_Range2 = field2_X + fieldWidth2;

const field3_X = 0;
const field3_Y = Height / 2;
const fieldWidth3 = 20;

const field3_Range1 = field3_Y - detectWidth;
const field3_Range2 = field3_Y + fieldWidth3;

let color1;
let color2;
let color3 = r.WHITE;

let detect1Velocity = 1;
let detect2Velocity = 2;
let detect3Velocity = 1;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(Width, Height, "Particle_Detector");
    r.SetTargetFPS(FPS);
}

function colorSelection(x, range1, range2, range3 = half) {
    return (x >= range1 && x <= range2) || x === range3 ?
        r.RED : r.WHITE;
}

function checkBounds(start1, end1, end2, width) {
    const start2 = start1 + width;
    return start1 < end1 || start2 > end2 ? true : false;
}

function changeVelocity(a, velocity) {
    return a ? -velocity : velocity;
}
function update() {
    detect1Velocity = changeVelocity(checkBounds(detect1_X, 0, half, detectWidth), detect1Velocity);
    detect1_X += detect1Velocity;

    detect2Velocity = changeVelocity(checkBounds(detect2_X, half, Width, detectWidth), detect2Velocity);
    detect2_X += detect2Velocity;

    detect3Velocity = changeVelocity(checkBounds(detect3_Y, 0, Height, detectWidth), detect3Velocity);
    detect3_Y += detect3Velocity;

    color1 = colorSelection(detect1_X, field1_Range, half);
    color2 = colorSelection(detect2_X, field2_Range1, field2_Range2);
    color3 = colorSelection(detect3_Y, field3_Range1, field3_Range2, field3_Y);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);
    r.DrawRectangle(field1_X, field1_Y, fieldWidth1, Height, r.SKYBLUE);
    r.DrawRectangle(field2_X, field1_Y, fieldWidth2, Height, r.SKYBLUE);
    r.DrawRectangle(field3_X, field3_Y, Width, fieldWidth3, r.SKYBLUE);

    r.DrawRectangle(detect1_X, detectY, detectWidth, Height, color1);
    r.DrawRectangle(detect2_X, detectY, detectWidth, Height, color2);
    r.DrawRectangle(detect3_X, detect3_Y, Width, detectWidth, color3);

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
