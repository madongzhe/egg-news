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
    const sourceInfo = await ctx.service.admin.source.selone(sourceId);
    let isSubscribe = false;
    if (ctx.session.users) {
      isSubscribe = await ctx.service.source.isSubscribe(sourceId, ctx.session.users.id);
    }
    await ctx.render('source.html', { ...res, sourceInfo, isSubscribe });
  }
}

module.exports = SourceController;
