'use strict';

module.exports = app => {
  const { INTEGER, DATE } = app.Sequelize;

  const Subscribe = app.model.define('subscribe', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    userid: INTEGER,
    sourceid: INTEGER,
    active: INTEGER,
    createdAt: DATE,
    updatedAt: DATE,
  }, {
    timestamps: true,
    freezeTableName: true,
  });
  return Subscribe;
};
