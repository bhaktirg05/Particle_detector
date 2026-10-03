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

let value1 = 0;
let value2 = 0;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(Width, Height, "Particle_Detector");
    r.SetTargetFPS(FPS);
}

function colorSelection(x, range1, range2, range3 = half) {
    return (x >= range1 && x <= range2) || x === range3 ? r.RED : r.WHITE;
}

function update() {
    if (detect1_X === 0) {
        value1 = 0.5;
    } else if (detect1_X + detectWidth === half) {
        value1 = -0.5;
    }

    detect1_X += value1;

    if (detect2_X === half) {
        value2 = 1;
    } else if (detect2_X + detectWidth === Width) {
        value2 = -1;
    }

    detect2_X += value2;

    if (detect3_Y === 0) {
        value1 = 0.5;
    } else if (detect3_Y + detectWidth === half) {
        value1 = -0.5;
    }

    detect3_Y += value1;

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

// 3rd Working after just d1 module

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

const r = require("raylib");
const s = require("./screen");
const d = require("./detector_function");
const d1 = require("./detector1");
const d2 = require("./detector2");
const d3 = require("./detector3");

const detectorThinkness = 30;

const field1Thickness = 50;
const field1_X = s.HALF - field1Thickness;
const field1_Y = 0;
const field1End = field1_X + field1Thickness;

const field2_X = s.HALF + 100;
const field2_Y = 0;
const field2Thickness = 5;
const field2End = field2_X + field2Thickness;

const field3_X = 0;
const field3_Y = s.HEIGHT / 2;
const field3Thickness = 20;
const field3End = field3_Y + field3Thickness;

function running() {
    return !r.WindowShouldClose();
}

function setup() {
    r.InitWindow(s.WIDTH, s.HEIGHT, s.TITLE);
    r.SetTargetFPS(s.FPS);
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
    let detector1End = d1.detectorX + detectorThinkness;
    let detector2End = d2.detectorX + detectorThinkness;
    let detector3End = d3.detectorY + detectorThinkness;

    d1.hasDetected = overlapFields(
        d1.detectorX,
        detector1End,
        field1_X,
        field1End,
        field2_X,
        field2End,
    );
    d2.hasDetected = overlapFields(
        d2.detectorX,
        detector2End,
        field1_X,
        field1End,
        field2_X,
        field2End,
    );
    d3.hasDetected = overlaps(d3.detectorY, detector3End, field3_Y, field3End);
}

function update() {
    d1.Velocity = d.toggleVelocity(
        d.checkBoundaries(d1.detectorX, 0, s.HALF, detectorThinkness),
        d1.Velocity,
    );
    d1.detectorX += d1.Velocity;

    d2.Velocity = d.toggleVelocity(
        d.checkBoundaries(d2.detectorX, s.HALF, s.WIDTH, detectorThinkness),
        d2.Velocity,
    );
    d2.detectorX += d2.Velocity;

    d3.Velocity = d.toggleVelocity(
        d.checkBoundaries(d3.detectorY, 0, s.HEIGHT, detectorThinkness),
        d3.Velocity,
    );
    d3.detectorY += d3.Velocity;
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

    drawField(field1_X, field1_Y, field1Thickness, s.HEIGHT, r.SKYBLUE);
    drawField(field2_X, field2_Y, field2Thickness, s.HEIGHT, r.SKYBLUE);
    drawField(field3_X, field3_Y, s.WIDTH, field3Thickness, r.SKYBLUE);

    drawDetector(
        d1.detectorX,
        d1.detectorY,
        detectorThinkness,
        s.HEIGHT,
        d.selectColor(d1.hasDetected),
    );
    drawDetector(
        d2.detectorX,
        d2.detectorY,
        detectorThinkness,
        s.HEIGHT,
        d.selectColor(d2.hasDetected),
    );
    drawDetector(
        d3.detectorX,
        d3.detectorY,
        s.WIDTH,
        detectorThinkness,
        d.selectColor(d3.hasDetected),
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
