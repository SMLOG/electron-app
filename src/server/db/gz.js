import _ from "lodash";
import sqlFormatter from "sql-formatter";
import fs from "fs";
const { db } = require("./db");
const fnlist = ["exp", "pow"];

const viewId = "gz";
var indexItems = [
  ["估值分析", "PE(TTM)", "", "PE(TTM) = 总市值/归母收益总额"],
  ["", "P(PEG)", "", "P = 100*五年利润复合增长率*五年平均基本每股收益"],
];

var itemMap = indexItems.reduce((m, row) => {
  var formulaContent = row[3].split(/=/);
  var left = formulaContent[0]
    .trim()
    .replace(/\(.*?\)/g, "")
    .trim();
  var right = formulaContent[1].trim();

  m[left] = right;

  if (row[2] && row[2].trim()) {
    var indicator = `_${left}`;

    m[indicator] = ((row[2].indexOf("_") == -1 ? "_" : "") + row[2]).replace(
      /_/g,
      left
    );
  }

  return m;
}, {});

var midItemMap = `
code=h.code
reportdate=d.reportdate
`
  .trim()
  .split(/\n/)
  .filter((e) => e.indexOf("--") == -1)
  .reduce((r, line) => {
    var parts = line.split(/=/);
    var val = parts.pop();
    parts.forEach((v) => (r[v.trim()] = val.trim()));

    return r;
  }, {});

midItemMap["今年利润"] = `(
    select netprofit from lrb l where l.code=h.code and l.reporttype=1 and l.reportdate=d.reportdate
  )`;
midItemMap["五年前利润"] = `(
    select netprofit from lrb l where l.code=h.code and l.reporttype=1 and l.reportdate=DATE_FORMAT(DATE_SUB(STR_TO_DATE(d.reportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
  )`;

midItemMap["五年平均基本每股收益"] = `(
  select sum(BASICEPS)/5 from lrb l where l.code=h.code and l.reporttype=1 
  and l.reportdate>DATE_FORMAT(DATE_SUB(STR_TO_DATE(d.reportdate,'%Y-%m-%d'),INTERVAL 5*4*3 MONTH),'%Y-%m-%d')
  )`;

midItemMap["五年利润复合增长率"] = `pow(今年利润/五年前利润,1/5)-1`;
_.assign(itemMap, midItemMap);

const itemRegex = /([^\s\.\+\-\*,\/><=\(\)\d]+\d*)+/g;
function toLevelItems(map, arr, exist) {
  if (!map) return null;
  if (!arr) arr = [];
  if (!exist) exist = {};

  if (arr.length == 0) {
    let select = _.pick(
      map,
      _.toPairs(map)
        .filter((e) => isFirstElement(e[1]))
        .map((e) => e[0])
    );

    arr.push(select);
    _.defaults(exist, select);
    return toLevelItems(_.omit(map, Object.keys(select)), arr, exist);
  } else {
    let select = _.toPairs(_.omit(map, Object.keys(exist))).filter((e) => {
      let matches = e[1].match(itemRegex);
      if (matches) {
        return (
          matches.filter((a) => fnlist.indexOf(a) > -1 || exist[a]).length ==
          matches.length
        );
      }
      return false;
    });
    if (select.length == 0) {
      let stil = _.omit(map, Object.keys(exist));
      _.toPairs(stil).length > 0 && console.warn("below not fould:");

      _.toPairs(stil).forEach((e) => {
        let matches = e[1].match(itemRegex);
        if (matches) {
          let notFindList = matches.filter((a) => !exist[a]);
          if (notFindList.length > 0) {
            console.warn(
              e[0],
              "=",
              e[1],
              "**missing** ",
              notFindList.join(",")
            );
          }
        }
      });
      return arr;
    }
    let result = _.pick(
      map,
      select.map((e) => e[0])
    );
    arr.push(result);
    _.defaults(exist, result);
    return toLevelItems(_.omit(map, Object.keys(result)), arr, exist);
  }
}

function isFirstElement(content) {
  return content.indexOf("\n") > -1 || content.match(/[a-z]+\d*\./i);
}

let levelItemsMap = toLevelItems(itemMap);

function getchildnodes(node) {
  let nodes = [];
  if (itemMap[node.alias]) {
    let content = itemMap[node.alias];
    let pnode = {};
    pnode.id = ++id;
    pnode.alias = pnode.topic = content;
    pnode.parentid = node.id;
    nodes.push(pnode);
    let matchs = !isFirstElement(content) && content.match(itemRegex);
    if (matchs) {
      matchs = _.uniq(matchs).filter((e) => fnlist.indexOf(e) == -1);
      let i = matchs.length;
      while (i-- > 0) {
        let cnode = {};
        if (pnode.topic == matchs[i]) cnode = pnode;
        else {
          cnode.id = ++id;
          cnode.topic = cnode.alias = matchs[i];
          cnode.parentid = pnode.id;
          nodes.push(cnode);
        }
        nodes = nodes.concat(getchildnodes(cnode));
      }
    }
  }
  return nodes;
}
let id = 0;
function getTrees(conf) {
  let trees = [];
  let tree = [];

  trees.push(tree);
  let cat = "";
  let pid;
  for (let row of conf) {
    cat = row[0] || cat;
    if (row[0]) {
      pid = ++id;
      if (cat.startsWith("@")) {
        let subroot = {
          id: pid,
          parentid: 0,
          topic: cat.replace(/@/, ""),
          subTree: 1,
        };
        tree.push(subroot);
        tree = [subroot];
        trees.push(tree);
      } else {
        let catnode = {};
        catnode.id = pid;
        catnode.topic = cat;
        catnode.direction = "right";
        catnode.parentid = 0;
        tree.push(catnode);
      }
    }
    let name = row[1];
    let alias = row[3]
      .split(/=|=/)[0]
      .replace(/\(.*?\)/g, "")
      .trim();

    let node = {};
    node.id = ++id;
    node.topic = name;
    node.parentid = pid;
    node.alias = alias;
    node.tip = row[4];

    let childnodes = getchildnodes(node);

    tree.push(node);
    tree.push(...childnodes);
  }

  return trees.map((e) => e.filter((e) => e.topic.match(itemRegex)));
}

getTrees(indexItems).map((tree) => {
  fs.writeFileSync(
    `/Users/alexwang/git/electron-suspension/static/${viewId}.json`,
    JSON.stringify(tree, null, 4)
  );
});

function wrapFmt(arr, sql) {
  let cols = arr.reduce((arr, a) => {
    return arr.concat(Object.keys(a));
  }, []);

  let wrapSelects = cols
    .map((e) => (e.match(itemRegex) ? `fmt(\`${e}\`) "${e}"` : e))
    .join(",");

  return `select ${wrapSelects} from (${sql}) w`;
}

function genSQL(levelMapArr, fromSQL, len) {
  let last = levelMapArr.pop();
  let sql = _.toPairs(last)
    .map(
      (e) =>
        `${
          isFirstElement(e[1])
            ? e[1]
            : e[1].replace(itemRegex, function(v) {
                if (fnlist.indexOf(v) > -1) return v;
                return `\`${v}\``;
              })
        } "${e[0]}"`
    )
    .join(",\n");
  let id = levelMapArr.length;
  if (levelMapArr.length == 0) {
    return `select ${sql}  ${fromSQL}  `;
  }
  return `select t${id}.*,${sql} from (${genSQL(
    levelMapArr,
    fromSQL,
    len || levelMapArr.length
  )}) t${id} `;
}
let sql = sqlFormatter.format(
  `create or replace view v_${viewId} as ` +
    (levelItemsMap,
    genSQL(
      levelItemsMap,
      `  
      from hq h left join (
        select
          code as code,
          max(reportdate) reportdate
        from
          lrb
        where
          reporttype = 1
        group by
          code
      ) as d  on d.code=h.code 
      `
    ))
);

console.log(sql);
db.query(sql);
