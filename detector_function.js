const r = require("raylib");
const { HEIGHT } = require("./screen");
function selectColor(detected) {
    return detected ? r.RED : r.WHITE;
}

function checkBoundaries(start, leftBoundary, rightBoundary, thickness) {
    const end = start + thickness;
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

module.exports = {
    selectColor,
    checkBoundaries,
    toggleVelocity,
    createDetector,
};
