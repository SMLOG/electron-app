export function drawMAs(canvas, items, lineHeight = 27) {
  let radius = 1.2;
  let ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = lineHeight * items.length;
  let width = canvas.width;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let rows = items.map(item => {
    let e = item.predays && item.predays[item.predays.length - 1];
    return (
      item.predays && [
        [
          60,
          item.predays.reduce((total, cur, arr, i) => {
            return total + parseFloat(cur.close);
          }, 0) / item.predays.length
        ],
        [30, e.ma_price30],
        [20, e.ma_price20],
        [10, e.ma_price10],
        [5, e.ma_price5],
        [0, item.now]
      ]
    );
  });
  let margin = 8;
  for (let r = 0; r < rows.length; r++) {
    let values = rows[r];
    if (!values) continue;
    let max = Math.max.apply(null, values.map(e => e[1]));
    let min = Math.min.apply(null, values.map(e => e[1]));

    let start = 2;
    let per = (width - 2 * margin) / (values.length - 1);
    let startY = r * lineHeight + lineHeight - radius / 2;
    let perY = (lineHeight - 4) / (max - min);

    for (let i = 0; i < values.length; i++) {
      let x = start + i * per;
      let y = startY - perY * (values[i][1] - min);
      ctx.beginPath();
      console.log(`x:${x},y:${y},per:${per},perY:${perY}`);
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      values[i][0] == 30 ? (ctx.fillStyle = "red") : (ctx.fillStyle = "#555");
      ctx.fill();

      if (i < values.length - 1) {
        let x2 = start + (i + 1) * per;
        let y2 = startY - perY * (values[i + 1][1] - min);
        ctx.beginPath();
        ctx.strokeStyle = "#aaa";

        ctx.setLineDash([1, 3]);
        ctx.moveTo(x, y);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    }

    ctx.strokeStyle = "#bbb";
    ctx.lineWidth = 1;
    ctx.setLineDash([1, 10]);
    ctx.beginPath();
    ctx.moveTo(0, (r + 1) * lineHeight);
    ctx.lineTo(width, (r + 1) * lineHeight);
    ctx.stroke();
  }
}
