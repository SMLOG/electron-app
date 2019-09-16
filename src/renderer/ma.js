export function drawMAs(canvas, items, lineHeight = 27) {
  let radius = 1;
  let ctx = canvas.getContext("2d");
  let width = canvas.width;

  canvas.style.height = items.length * lineHeight + "px";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let rows = items.map(item => {
    let e = item.predays && item.predays[item.predays.length - 1];
    return [
      [30, e.ma_price30],
      [20, e.ma_price20],
      [10, e.ma_price10],
      [5, e.ma_price5],
      [0, item.now]
    ];
  });

  for (let r = 0; r < rows.length; r++) {
    let values = rows[r];
    let max = Math.max.apply(null, values.map(e => e[1]));
    let min = Math.min.apply(null, values.map(e => e[1]));

    let start = radius / 2;
    let per = (width - radius) / (values.length - 1);
    let startY = r * lineHeight + lineHeight - radius / 2;
    let perY = (lineHeight - radius) / (max - min);

    for (let i = 0; i < values.length; i++) {
      let x = start + i * per;
      let y = startY - perY * (values[i][1] - min);
      ctx.beginPath();
      console.log(`x:${x},y:${y},per:${per},perY:${perY}`);
      ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
      values[i][0] == 30 ? (ctx.fillStyle = "red") : (ctx.fillStyle = "green");
      ctx.fill();
    }

    if (r > 0) {
      ctx.strokeStyle = "#bbb";
      ctx.lineWidth = 1;
      ctx.setLineDash([1, 5]);
      ctx.beginPath();
      ctx.moveTo(0, r * lineHeight);
      ctx.lineTo(width, r * lineHeight);
      ctx.stroke();
    }
  }
}
