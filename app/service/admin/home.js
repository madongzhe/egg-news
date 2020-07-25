'use strict';

const Service = require('egg').Service;
const sequelize = require('sequelize');
const Op = sequelize.Op;
class HomeService extends Service {
  async dashboard() {
    const { ctx } = this;
    const article = await ctx.model.Article.findOne({
      attributes: [[sequelize.fn('COUNT', sequelize.col('id')), 'count']],
      where: {
        createdAt: { [Op.gt]: new Date(new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate()) },
      },
      raw: true,
    });
    const collect = await ctx.model.Collect.findOne({
      attributes: [[ sequelize.fn('COUNT', sequelize.col('id')), 'count' ]],
      raw: true,
    });
    const source = await ctx.model.Source.findOne({
      attributes: [[ sequelize.fn('COUNT', sequelize.col('id')), 'count' ]],
      raw: true,
    });
    const users = await ctx.model.Users.findOne({
      attributes: [[ sequelize.fn('COUNT', sequelize.col('id')), 'count' ]],
      raw: true,
    });
    return { article, collect, source, users };
  }
}
module.exports = HomeService;
