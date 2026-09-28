const r = require("raylib");

let detectorX = r.GetScreenWidth() / 2;
const detectorY = 0;
let Velocity = 2;
let hasDetected;

module.exports = {
    detectorX,
    detectorY,
    Velocity,
    hasDetected,
};
