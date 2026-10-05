const r = require("raylib");
const range = require("./range");

function createDetector(x, y, velocity, w, h) {
    return {
        X: x,
        Y: y,
        velocity: velocity,
        hasDetected: false,
        end: 0,
        width: w,
        height: h,
        color: r.WHITE,
    };
}

function selectColor(detected) {
    return detected ? r.RED : r.WHITE;
}

function checkBoundaries(start, end, leftBoundary, rightBoundary) {
    return start < leftBoundary || end > rightBoundary;
}

function toggleVelocity(a, velocity) {
    return a ? -velocity : velocity;
}

function overlapFields(d, start, f1, f2) {
    return range.overlaps(d, start, f1) || range.overlaps(d, start, f2);
}

function hasDetected(d, x, f1, f2) {
    d.hasDetected =
        x === "X" ? overlapFields(d, x, f1, f2) : range.overlaps(d, x, f1);
}

function update(d, x, start, end, t, f1, f2) {
    d.velocity = toggleVelocity(
        checkBoundaries(d[x], d.end, start, end),
        d.velocity,
    );
    d[x] += d.velocity;
    d.end = d[x] + d[t];
    hasDetected(d, x, f1, f2);
    d.color = selectColor(d.hasDetected);
}

function drawDetector(d) {
    r.DrawRectangle(d.X, d.Y, d.width, d.height, d.color);
}

module.exports = {
    selectColor,
    checkBoundaries,
    toggleVelocity,
    createDetector,
    update,
    drawDetector,
};
