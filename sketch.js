const r = require("raylib");
const s = require("./screen");
const d = require("./detector_function");
const f = require("./field_function");
const d1 = d.createDetector(0, 0, 1, 30, s.HEIGHT);
const d2 = d.createDetector(s.HALF, 0, 2, 30, s.HEIGHT);
const d3 = d.createDetector(0, 0, 1, s.WIDTH, 30);

const field1Thickness = 50;
const field1_X = s.HALF - field1Thickness;
const field1_Y = 0;
const field1End = field1_X + field1Thickness;

// const f1 = f.createField(200, 0, 50, s.HEIGHT, 250);

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

function overlapFields(dStart, dEnd) {
    return (
        overlaps(dStart, dEnd, field1_X, field1End) ||
        overlaps(dStart, dEnd, field2_X, field2End)
    );
}
function hasDetected() {
    d1.end = d1.X + d1.width;
    d2.end = d2.X + d2.width;
    d3.end = d3.Y + d3.height;
    d1.hasDetected = overlapFields(d1.X, d1.end);
    d2.hasDetected = overlapFields(d2.X, d2.end);
    d3.hasDetected = overlaps(d3.Y, d3.end, field3_Y, field3End);
}

function update() {
    d1.velocity = d.toggleVelocity(
        d.checkBoundaries(d1.X, 0, s.HALF, d1.width),
        d1.velocity,
    );
    d1.X += d1.velocity;

    d2.velocity = d.toggleVelocity(
        d.checkBoundaries(d2.X, s.HALF, s.WIDTH, d2.width),
        d2.velocity,
    );
    d2.X += d2.velocity;

    d3.velocity = d.toggleVelocity(
        d.checkBoundaries(d3.Y, 0, s.HEIGHT, d3.height),
        d3.velocity,
    );
    d3.Y += d3.velocity;
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
        d1.X,
        d1.Y,
        d1.width,
        d1.height,
        d.selectColor(d1.hasDetected),
    );
    drawDetector(
        d2.X,
        d2.Y,
        d2.width,
        d2.height,
        d.selectColor(d2.hasDetected),
    );
    drawDetector(
        d3.X,
        d3.Y,
        d3.width,
        d3.height,
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
