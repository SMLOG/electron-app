var i, n, a;
(a = function(t) {
  return "[object Object]" === Object.prototype.toString.call(t);
}),
  (n = function t(e, i) {
    var n;
    for (n in e)
      if (void 0 !== e[n])
        try {
          if ((a(e[n]) && a(i[n]) && t(e[n], i[n]), i.hasOwnProperty(n)))
            continue;
          i[n] = e[n];
        } catch (t) {}
  }),
  (i = function() {
    var t,
      e = arguments,
      i = {};
    if (!e.length) return {};
    for (t = e.length - 1; t >= 0; t--) a(e[t]) && n(e[t], i);
    return (e[0] = i), i;
  });
export const i4 = i;
