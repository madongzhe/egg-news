'use strict';

const Controller = require('../../core/base_controller');

class ArticleController extends Controller {

  /**
   * 用户文章列表
   *
   * @memberof HomeController
   */
  async article_list() {
    const { ctx } = this;
    const sourceId = ctx.session.users.sourceId;
    const res = await ctx.service.article.articleListUser(sourceId);
    await ctx.render('users/article_list.html', { res: JSON.stringify(res) });
  }

  /**
   * 用户添加文章页
   *
   * @memberof ArticleController
   */
  async article_add() {
    const { ctx } = this;
    const category = await ctx.service.admin.category.findall();
    await ctx.render('users/article_add.html', { category });
  }

  /**
   * 提交添加文章内容
   *
   * @memberof ArticleController
   */
  async post_add() {
    const { ctx } = this;
    const createRule = {
      title: 'string',
      content: 'string',
      category: 'string',
    };
    // 校验参数
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.helper.error(422);
      return;
    }
    // 组装参数
    const sourceId = ctx.session.user.sourceId;
    if (!sourceId) {
      ctx.logger.warn('用户ID' + ctx.session.user.id + '没有申请发文权限');
      ctx.helper.error(300, '没有申请发文权限');
    }
    const { title, content, category } = ctx.request.body;
    const res = await ctx.service.admin.article.add(title, content, sourceId, category);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.fail();
    }
  }
  /**
   * 用户编辑文章
   *
   * @memberof ArticleController
   */
  async article_edit() {
    const { ctx } = this;
    await ctx.render('users/article_edit.html');
  }
}

module.exports = ArticleController;
