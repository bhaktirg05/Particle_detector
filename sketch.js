const r = require("raylib");
const Width = 500;
const Height = 250;
const FPS = 60;
const half = Width / 2;

let detector1_X = 0;
let detector1Velocity = 1;

let detector2_X = half;
let detector2Velocity = 2;
const detectorY = 0;

let detector3_X = 0;
let detector3_Y = 0;
let detector3Velocity = 1;

const detectorthickness = 30;

const field1Thickness = 50;
const field1_X = half - field1Thickness;
const field1_Y = 0;

const detection1StartPoint = field1_X - detectorthickness;

const field2_X = half + 100;
const field2Thickness = 5;

const detection2StartPoint = field2_X - detectorthickness;
const detection2EndPoint = field2_X + field2Thickness;

const field3_X = 0;
const field3_Y = Height / 2;
const field3Thickness = 20;

const detection3StartPoint = field3_Y - detectorthickness;
const detection3EndPoint = field3_Y + field3Thickness;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(Width, Height, "Particle_Detector");
    r.SetTargetFPS(FPS);
}

function selectColor(x, point1, point2, point3 = half) {
    return (x >= point1 && x <= point2) || x === point3 ? r.RED : r.WHITE;
}

function checkBoundaries(start, leftBoundary, rightBoundary, thickness) {
    const end = start + thickness;
    return start < leftBoundary || end > rightBoundary;
}

function toggleVelocity(a, velocity) {
    return a ? -velocity : velocity;
}

function update() {
    detector1Velocity = toggleVelocity(
        checkBoundaries(detector1_X, 0, half, detectorthickness),
        detector1Velocity,
    );
    detector1_X += detector1Velocity;

    detector2Velocity = toggleVelocity(
        checkBoundaries(detector2_X, half, Width, detectorthickness),
        detector2Velocity,
    );
    detector2_X += detector2Velocity;

    detector3Velocity = toggleVelocity(
        checkBoundaries(detector3_Y, 0, Height, detectorthickness),
        detector3Velocity,
    );
    detector3_Y += detector3Velocity;
}

function drawDetector(x, y, width, height, startPoint, endPoint, detector = x) {
    const color = selectColor(detector, startPoint, endPoint);
    r.DrawRectangle(x, y, width, height, color);
}

function drawField(x, y, width, height, color) {
    r.DrawRectangle(x, y, width, height, color);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawField(field1_X, field1_Y, field1Thickness, Height, r.SKYBLUE);
    drawField(field2_X, field1_Y, field2Thickness, Height, r.SKYBLUE);
    drawField(field3_X, field3_Y, Width, field3Thickness, r.SKYBLUE);

    drawDetector(
        detector1_X,
        detectorY,
        detectorthickness,
        Height,
        detection1StartPoint,
        half,
    );
    drawDetector(
        detector2_X,
        detectorY,
        detectorthickness,
        Height,
        detection2StartPoint,
        detection2EndPoint,
    );
    drawDetector(
        detector3_X,
        detector3_Y,
        Width,
        detectorthickness,
        detection3StartPoint,
        detection3EndPoint,
        detector3_Y,
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
