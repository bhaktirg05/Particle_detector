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

function update() {
    d.update(d1, "X", 0, s.HALF, "width", f1, f2);
    d.update(d2, "X", s.HALF, s.WIDTH, "width", f1, f2);
    d.update(d3, "Y", 0, s.HEIGHT, "height", f3);
}

function draw() {
    r.BeginDrawing();
    r.ClearBackground(r.BLACK);

    f.drawField(f1);
    f.drawField(f2);
    f.drawField(f3);

    d.drawDetector(d1);
    d.drawDetector(d2);
    d.drawDetector(d3);

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
