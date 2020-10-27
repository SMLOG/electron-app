const Sequelize = require("sequelize");
const { dbName, host, port, user, password } = require("./config").database;
//set global max_allowed_packet=10*1024*1024;
const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: console.log,
  timezone: "+08:00",
  define: {
    // create_time && update_time
    timestamps: false,
    charset: "utf8",
    dialectOptions: {
      collate: "utf8_general_ci",
    },
    // delete_time
    /*paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",*/
    freezeTableName: true,
    // 把驼峰命名转换为下划线
    underscored: true,
    scopes: {
      bh: {
        attributes: {
          exclude: ["password", "updated_at", "deleted_at", "created_at"],
        },
      },
      iv: {
        attributes: {
          exclude: ["content", "password", "updated_at", "deleted_at"],
        },
      },
    },
  },
});
// 创建模型

(async () => {
  await sequelize.sync({
    sync: false,
    alter: true,
  });
  await sequelize.query("set global max_allowed_packet=1000*1024*1024");
  await sequelize.query(`create
  or replace view gzview as
  select
      a.name,
      a.now,
      a.pe,
      a.pe_ttm,
      fmt(a.zsz),
      fmt(d.parent_netprofit),
      b.report_date,
      yj.*,
      c.discloseDate
  from
      hq a
      left join (
          select
              code,
              max(report_date) report_date
          from
              lr
          group by
              code
      ) b on b.code = a.code
      left join yj on yj.code = b.code
      and yj.REPORTDATE = b.report_date
      left join lr d on d.code = a.code
      and d.report_date = b.report_date
      left join (
          select
              code,
              max(
                  IFNULL(
                      ACTUAL_PUBLISH_DATE,
                      IFNULL(
                          THIRD_CHANGE_DATE,
                          IFNULL(SECOND_CHANGE_DATE, FIRST_APPOINT_DATE)
                      )
                  )
              ) discloseDate
          from
              yyplrq
          group by
              code
      ) c on c.code = a.code;`);
})();

module.exports = {
  sequelize,
  db: sequelize,
};
