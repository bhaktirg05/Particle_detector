const r = require("raylib");
const { HEIGHT } = require("./screen");
function selectColor(detected) {
    return detected ? r.RED : r.WHITE;
}

// function checkBoundaries(start, leftBoundary, rightBoundary, thickness) {
//     const end = start + thickness;
//     return start < leftBoundary || end > rightBoundary;
// }

function checkBoundaries(start, end, leftBoundary, rightBoundary) {
    return start < leftBoundary || end > rightBoundary;
}

function toggleVelocity(a, velocity) {
    return a ? -velocity : velocity;
}

function createDetector(x, y, velocity, w, h) {
    return {
        X: x,
        Y: y,
        velocity: velocity,
        hasDetected: false,
        end: 0,
        width: w,
        height: h,
    };
}

function update(d, x, start, end, t) {
    d.velocity = toggleVelocity(
        checkBoundaries(d[x], d.end, start, end),
        d.velocity,
    );
    d[x] += d.velocity;
    d.end = d[x] + d[t];
}

function drawDetector(d, color) {
    r.DrawRectangle(d.X, d.Y, d.width, d.height, color);
}

module.exports = {
    selectColor,
    checkBoundaries,
    toggleVelocity,
    createDetector,
    update,
    drawDetector,
};
