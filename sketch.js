const r = require("raylib");
const s = require("./screen");
const d = require("./detector_function");
const f = require("./field_function");

const d1 = d.createDetector(0, 0, 1, 30, s.HEIGHT);
const d2 = d.createDetector(s.HALF, 0, 2, 30, s.HEIGHT);
const d3 = d.createDetector(0, 0, 1, s.WIDTH, 30);

const f1 = f.createField(200, 0, 50, s.HEIGHT, 250);
const f2 = f.createField(350, 0, 5, s.HEIGHT, 355);
const f3 = f.createField(0, s.HEIGHT / 2, s.WIDTH, 20, s.HEIGHT / 2 + 20);

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
        overlaps(dStart, dEnd, f1.X, f1.end) ||
        overlaps(dStart, dEnd, f2.X, f2.end)
    );
}
function hasDetected() {
    d1.end = d1.X + d1.width;
    d2.end = d2.X + d2.width;
    d3.end = d3.Y + d3.height;
    d1.hasDetected = overlapFields(d1.X, d1.end);
    d2.hasDetected = overlapFields(d2.X, d2.end);
    d3.hasDetected = overlaps(d3.Y, d3.end, f3.Y, f3.end);
}

function update() {
    d1.velocity = d.toggleVelocity(
        d.checkBoundaries(d1.X, d1.end, 0, s.HALF),
        d1.velocity,
    );
    d1.X += d1.velocity;

    d2.velocity = d.toggleVelocity(
        d.checkBoundaries(d2.X, d2.end, s.HALF, s.WIDTH),
        d2.velocity,
    );
    d2.X += d2.velocity;

    d3.velocity = d.toggleVelocity(
        d.checkBoundaries(d3.Y, d3.end, 0, s.HEIGHT),
        d3.velocity,
    );
    d3.Y += d3.velocity;
    hasDetected();
}

function drawDetector(d, color) {
    r.DrawRectangle(d.X, d.Y, d.width, d.height, color);
}

function drawField(f) {
    r.DrawRectangle(f.X, f.Y, f.width, f.height, f.color);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    drawField(f1);
    drawField(f2);
    drawField(f3);

    drawDetector(d1, d.selectColor(d1.hasDetected));
    drawDetector(d2, d.selectColor(d2.hasDetected));
    drawDetector(d3, d.selectColor(d3.hasDetected));

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
