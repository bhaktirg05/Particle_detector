const r = require("raylib");
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

module.exports = {
    selectColor,
    checkBoundaries,
    toggleVelocity,
};
