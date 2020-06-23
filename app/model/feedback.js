'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const Feedback = app.model.define('feedback', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    feedback: STRING,
    reply: STRING,
    userId: INTEGER,
    createdAt: DATE,
    updatedAt: DATE,
  }, {
    timestamps: true,
    freezeTableName: true,
  });
  return Feedback;
};
