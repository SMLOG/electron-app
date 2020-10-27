const { Model, DataTypes } = require("sequelize");
const { sequelize: db } = require("../db");
/*job*/
class Job extends Model {}
Job.init(
  {
    jobname: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      field: "jobname",
    },
    runtime: {
      type: DataTypes.DATE,
      field: "runtime",
    },
    status: {
      type: DataTypes.DOUBLE,
      field: "status",
    },
  },
  {
    sequelize: db,
    charset: "utf8",
    modelName: "job",
  }
);
module.exports = Job;
