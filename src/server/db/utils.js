import _ from "lodash";
import fs from "fs";
const { sequelize: db } = require("./db");

export function genModel(rows, tab, displayFieldMap = {}, u, comment = "") {
  let res = {};

  let sampleRow = rows.reduce((map, data) => {
    for (let k in data) {
      if (data[k] != null && data[k] != undefined) {
        if (!map[k] || (_.isString(data[k]) && data[k].length > map[k].length))
          map[k] = data[k];
      }
    }
    return map;
  }, _.cloneDeep(rows[0]));

  res[tab.toLowerCase() + "_id"] = {
    type: "DataTypes.INTEGER",
    autoIncrement: true,
    primaryKey: true,
  };
  let keys = _.keys(sampleRow);

  if (keys.filter((e) => e.toLowerCase().indexOf("code") > -1).length == 0) {
    res["code"] = {
      type: "DataTypes.STRING(10)",
      unique: "index_unique",
    };
  }
  console.log(sampleRow);
  for (let field in sampleRow) {
    let f = (res[field] = {});
    let display = displayFieldMap[field];
    if (display) {
      f.display = display;
    }

    if (_.isEmpty(sampleRow[field])) {
      console.log(sampleRow);
    }
    let len = sampleRow[field].length;
    if (
      sampleRow[field] * 1 == sampleRow[field] &&
      !field.toLowerCase().endsWith("code")
    )
      f["type"] = "DataTypes.DOUBLE";
    else if (_.isDate(sampleRow[field])) {
      f["type"] = `DataTypes.DATE`;
    } else if (sampleRow[field] && len > 255) {
      f["type"] = `DataTypes.TEXT`;
    } else
      f["type"] = `DataTypes.STRING(${Math.max(
        10,
        sampleRow[field] && Math.round(Math.ceil(len / 10)) * 10
      )})`;
    if (u.indexOf(field) > -1) f["unique"] = "index_unique";

    f["field"] = field;
  }
  let attrs = JSON.stringify(res, null, 4).replace(/"(DataTypes.*?)"/g, "$1");
  let cls = tab[0].toUpperCase() + tab.substring(1);
  let content = `const { Model, DataTypes } = require("sequelize");
    const { sequelize: db } = require("../db");
  /*${comment}*/
    class ${cls} extends Model {}
    ${cls}.init(
      ${attrs}
    ,
      {
        sequelize: db,
        charset: 'utf8',
        modelName: "${tab}",
      }
    );
    module.exports = ${cls};
    `;
  //console.log(content);
  let file = `/Users/alexwang/git/electron-suspension/src/server/db/model/${cls}.js`;
  console.log(file);
  fs.writeFileSync(file, content);
  return cls;
}

export async function ifNoExistGenModel(
  datas,
  tableName,
  keymap,
  uColums,
  comment
) {
  let isSync = false;
  try {
    await db.query(`SELECT 1 FROM ${tableName} limit 1`);
  } catch (ee) {
    isSync = true;
    genModel(datas, tableName, keymap, uColums, comment);
    if (datas && datas.length > 0 && "code" in datas[0]) {
      let ddl = `CREATE TABLE IF NOT EXISTS \`n_notice\`(
        \`code\` VARCHAR(10) NOT NULL,
        \`notice_date\` VARCHAR(20) NOT NULL,
        PRIMARY KEY (\`code\`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8`;
      console.log(ddl);
      await db.query(ddl);
    }
  }

  let modelName = tableName[0].toUpperCase() + tableName.substring(1);
  let model = require("./model/" + modelName);
  if (isSync) await model.sync({ alert: true });
  return model;
}
