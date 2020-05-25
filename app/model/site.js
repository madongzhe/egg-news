'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Site = app.model.define('site', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    domain: STRING,
    setting: STRING,
    statistics: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  }, {
    timestamps: true,
    freezeTableName: true,
  });
  return Site;
};
