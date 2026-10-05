function overlaps(d, x, f) {
    console.log(f);
    return !(d.end < f[x] || f.end < d[x]);
}

module.exports = {
    overlaps,
};
