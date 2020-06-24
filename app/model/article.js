'use strict';


module.exports = app => {
  const { STRING, TEXT, INTEGER, BIGINT, DATE } = app.Sequelize;

  const Article = app.model.define('article', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    title: STRING,
    content: TEXT,
    images: STRING,
    sourceId: INTEGER,
    usersId: INTEGER,
    author: STRING,
    keyword: STRING,
    categoryId: INTEGER,
    collecturl: STRING,
    look: INTEGER,
    status: BIGINT,
    createdAt: DATE,
    updatedAt: DATE,
  }, {
    timestamps: true,
    freezeTableName: true,
    timezone: '+08:00',
  });
  return Article;
};
