const util = {
  db: function(e) {
    if (!e) return [];
    for (var t, a, r = [], i = 0, n = 0, s = 0, o = e.length; o > s; s++)
      (t = this.c2b(e.charAt(s))),
        (a = 6 & n ? (7 & n) ^ 7 : 5),
        (i |= (t >> (5 - a)) << ((7 ^ n) - a)),
        64767 == i && 63 == t && (i = 65535),
        n > 25 && ((n -= 32), (r[r.length] = i), (i = 0)),
        (i |= (t & ((1 << (5 - a)) - 1)) << ((7 | n) + 4 + a)),
        (n += 6);
    return r;
  },
  c2b: function(e) {
    e = e.replace(" ", "+");
    var t = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".indexOf(
      e
    );
    return t >= 0 ? t : 0;
  },
  fB: function(t, a = false, r = "CN", i = {}) {
    t.splice(360, 3);
    for (
      var s, o = [], l = n.gata(r), c = 3 * l.length, d = 0, p = 0, m = 0;
      c > m;
      m += 3
    )
      (p = Math.floor(m / 3)),
        a
          ? (o[o.length] = {
              time: l[p],
              price: t[m + 1] / 1e3
            })
          : ((o[o.length] = {
              time: l[p],
              avg_price: t[m] / 1e3,
              price: t[m + 1] / 1e3,
              volume: t[m + 2] / 100
            }),
            e.isRepos(i.symbol) &&
              ((o[p].avg_price = o[p].price), (o[p].volume *= 10)),
            /^(hy|gn|dy)\d+/.test(i.symbol) && (o[p].volume *= 100),
            e.isCNK(i.symbol) && (o[p].volume *= 100),
            o[p].volume > 0 && (d += o[p].volume),
            o[p] &&
              0 == o[p].price &&
              (0 == p
                ? (o[p].price = o[p].avg_price = i.prevclose)
                : ((o[p].price = o[p - 1].price),
                  (o[p].avg_price = o[p - 1].price))),
            o[p].avg_price > 0 && (s = o[p].avg_price));
    return (
      o[0].price < 0 && (o[0].price = o[0].avg_price = d = 0),
      a || ((o[0].totalVolume = d), (o[0].totalAmount = d * s)),
      (o[0].index = i.index),
      (o[0].prevclose = i.prevclose),
      (o[0].symbol = i.symbol),
      (o[0].name = i.name),
      (o[0].today = i.today),
      (o[0].date = i.date),
      (o[0].lastfive = i.lastfive),
      o
    );
  }
};

let str =
  "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";

util.db(str);
