const r = require("raylib");

function createField(x, y, w, h, e) {
    return {
        X: x,
        Y: y,
        width: w,
        height: h,
        color: r.SKYBLUE,
        end: e,
    };
}

function drawField(f) {
    r.DrawRectangle(f.X, f.Y, f.width, f.height, f.color);
}

module.exports = {
    createField,
    drawField,
};
