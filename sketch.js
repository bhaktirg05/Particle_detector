const r = require("raylib");
const d = require("./detector_function");
const d1 = require("./detector1");
const d2 = require("./detector2");

const Width = 500;
const Height = 250;
const FPS = 60;
const half = Width / 2;

let detector2_X = half;
const detector2_Y = 0;
let detector2Velocity = 2;
let hasDetected2;

let detector3_X = 0;
let detector3_Y = 0;
let detector3Velocity = 1;
let hasDetected3;

const THICKNESS = 30;

const field1Thickness = 50;
const field1_X = half - field1Thickness;
const field1_Y = 0;
const field1End = field1_X + field1Thickness;

const field2_X = half + 100;
const field2_Y = 0;
const field2Thickness = 5;
const field2End = field2_X + field2Thickness;

const field3_X = 0;
const field3_Y = Height / 2;
const field3Thickness = 20;
const field3End = field3_Y + field3Thickness;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(Width, Height, "Particle_Detector");
    r.SetTargetFPS(FPS);
}

function overlaps(start1, end1, start2, end2) {
    return !(end1 < start2 || end2 < start1);
}

function overlapFields(dStart, dEnd, f1Start, f1End, f2Start, f2End) {
    return (
        overlaps(dStart, dEnd, f1Start, f1End) ||
        overlaps(dStart, dEnd, f2Start, f2End)
    );
}
function hasDetected() {
    let detector1End = d1.detectorX + THICKNESS;
    let detector2End = detector2_X + THICKNESS;
    let detector3End = detector3_Y + THICKNESS;

    d1.hasDetected = overlapFields(
        d1.detectorX,
        detector1End,
        field1_X,
        field1End,
        field2_X,
        field2End,
    );
    hasDetected2 = overlapFields(
        detector2_X,
        detector2End,
        field1_X,
        field1End,
        field2_X,
        field2End,
    );
    hasDetected3 = overlaps(detector3_Y, detector3End, field3_Y, field3End);
}

function update() {
    d1.Velocity = d.toggleVelocity(
        d.checkBoundaries(d1.detectorX, 0, half, THICKNESS),
        d1.Velocity,
    );
    d1.detectorX += d1.Velocity;

    detector2Velocity = d.toggleVelocity(
        d.checkBoundaries(detector2_X, half, Width, THICKNESS),
        detector2Velocity,
    );
    detector2_X += detector2Velocity;

    detector3Velocity = d.toggleVelocity(
        d.checkBoundaries(detector3_Y, 0, Height, THICKNESS),
        detector3Velocity,
    );
    detector3_Y += detector3Velocity;
    hasDetected();
}

function drawDetector(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function drawField(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawField(field1_X, field1_Y, field1Thickness, Height, r.SKYBLUE);
    drawField(field2_X, field2_Y, field2Thickness, Height, r.SKYBLUE);
    drawField(field3_X, field3_Y, Width, field3Thickness, r.SKYBLUE);

    drawDetector(
        d1.detectorX,
        d1.detectorY,
        THICKNESS,
        Height,
        d.selectColor(d1.hasDetected),
    );
    drawDetector(
        detector2_X,
        detector2_Y,
        THICKNESS,
        Height,
        d.selectColor(hasDetected2),
    );
    drawDetector(
        detector3_X,
        detector3_Y,
        Width,
        THICKNESS,
        d.selectColor(hasDetected3),
    );

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
