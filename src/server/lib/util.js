export function getLastReportDate(d = new Date()) {
  let now = ((d) =>
    ("0" + (d.getMonth() + 1)).substr(-2, 2) +
    ("0" + d.getDate()).substr(-2, 2))(d);
  for (let e of ["09-30", "06-30", "03-31"]) {
    if (now > e) {
      return d.getFullYear() + "-" + e;
    }
  }

  return d.getFullYear() - 1 + "-12-31";
}
export function prevReportDate(date) {
  let rd = new Date(date);
  rd.setMonth(rd.getMonth() - 3);
  return getLastReportDate(rd);
}
