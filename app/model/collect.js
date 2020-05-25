'use strict';

module.exports = app => {
  const { STRING, INTEGER, BIGINT, DATE } = app.Sequelize;

  const Collect = app.model.define('collect', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    url: STRING,
    category: INTEGER,
    sourceId: STRING,
    listrule: STRING,
    titlerule: STRING,
    articlerule: STRING,
    state: BIGINT,
    createdAt: DATE,
    updatedAt: DATE,
  }, {
    timestamps: true,
    freezeTableName: true,
  });
  return Collect;
};
