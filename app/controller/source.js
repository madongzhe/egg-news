'use strict';

const Controller = require('egg').Controller;
class SourceController extends Controller {
  async index() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
    };
    try {
      // 校验参数
      ctx.validate(createRule, ctx.params);
    } catch (error) {
      this.ctx.throw(404, error);
    }
    const sourceId = ctx.params.id;
    const res = await ctx.service.article.sourceArticleList(sourceId);
    await ctx.render('source.html', res);
  }
}

module.exports = SourceController;
