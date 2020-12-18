import _ from "lodash";
import fs from "fs";
const { db } = require("./db");
const xlsx = require("node-xlsx");

let path = `${__dirname}/../gz.xlsx`;

let sheetList = xlsx.parse(path);
let sheet = sheetList[0];
sheet.data[7][1] = 0.4;
sheet.data.forEach((row, ri) => {
  let arr = [];
  row.forEach((cell, ci) => {
    arr.push([ri, ",", ci, ":", cell].join(""));
  });
  console.log(arr.join("\t"));
});
let buffer = xlsx.build(sheetList);

fs.writeFile(path.replace(".xlsx", ".bak.xlsx"), buffer, function(err) {
  if (err) {
    console.log(err);

    return;
  }
});

//console.log(sql);
//db.query(sql);
