
function calcOffset(outer, inner) {
    return (outer - inner) / 2;
}

function centerOfRectangleCoordinates(x, y) {
    return x + y / 2;
}

function newCoordinates(x, y) {
    return x - y / 2;
}

module.exports = {
    calcOffset,
    centerOfRectangleCoordinates,
    newCoordinates,
};