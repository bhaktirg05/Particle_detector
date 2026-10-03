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

module.exports = {
    createField,
};
