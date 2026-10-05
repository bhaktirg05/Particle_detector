function overlaps(d, x, f) {
    return !(d.end < f[x] || f.end < d[x]);
}

module.exports = {
    overlaps,
};
