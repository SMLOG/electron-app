const Sequelize = require("sequelize");
const { dbName, host, port, user, password } = require("./config").database;
//set global max_allowed_packet=10*1024*1024;
const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: false,
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
sequelize.sync({
  sync: false,
  alter: true,
});
module.exports = {
  sequelize,
};
