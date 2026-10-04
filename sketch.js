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
    d1.hasDetected = overlapFields(d1.X, d1.end);
    d2.hasDetected = overlapFields(d2.X, d2.end);
    d3.hasDetected = overlaps(d3.Y, d3.end, f3.Y, f3.end);
}

function update() {
    d.update(d1, "X", 0, s.HALF, "width");
    d.update(d2, "X", s.HALF, s.WIDTH, "width");
    d.update(d3, "Y", 0, s.HEIGHT, "height");
    hasDetected();
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    f.drawField(f1);
    f.drawField(f2);
    f.drawField(f3);

    d.drawDetector(d1, d.selectColor(d1.hasDetected));
    d.drawDetector(d2, d.selectColor(d2.hasDetected));
    d.drawDetector(d3, d.selectColor(d3.hasDetected));

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
