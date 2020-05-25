'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Link = app.model.define('link', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    linkName: STRING,
    linkUrl: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  }, {
    timestamps: true,
    freezeTableName: true,
    timezone: '+08:00',
  });

  return Link;
}
