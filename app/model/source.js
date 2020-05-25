'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Source = app.model.define('source', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    sourceName: STRING,
    userId: INTEGER,
    mediaLogo: STRING,
    createdAt: DATE,
    updatedAt: DATE,
  }, {
    timestamps: true,
    freezeTableName: true,
  });
  return Source;
};
