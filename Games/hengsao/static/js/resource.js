var R = function (e) {
    var t = [];
    return e.createImage = function (e) {
        return typeof t[e] != "undefined" ? t[e] : (t[e] = new Image, t[e].src = e, t[e])
    }, e.loadImage = function (e, n) {
        var r = e.length, i = 0;
        for (var s = r; s--;) {
            var o = e[s];
            t[o] = new Image, t[o].onload = function () {
                i++, r == i && n && n()
            }, t[o].src = o
        }
    }, e
}({});