'use strict';

const Controller = require('../../core/base_controller');

class ArticleController extends Controller {

  /**
   * 用户文章列表页
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
   * 请求分页数据
   *
   * @memberof ArticleController
   */
  async post_article_List() {
    const { ctx } = this;
    const createRule = {
      page: 'int',
    };
    try {
      ctx.validate(createRule, ctx.params);
    } catch (error) {
      ctx.helper.fail(422);
      return;
    }
    const usersId = ctx.session.users.id;
    const { page } = ctx.params;
    const res = await ctx.service.users.article.articleList(usersId, page);
    if (res) {
      ctx.helper.success(res);
    } else {
      ctx.helper.fail();
    }
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
    const sourceId = ctx.session.users.sourceId;
    const usersId = ctx.session.users.id;
    if (!sourceId) {
      ctx.logger.warn('用户ID' + usersId + '没有申请发文权限');
      ctx.helper.error(300, '没有申请发文权限');
    }
    const { title, content, category } = ctx.request.body;
    const res = await ctx.service.users.article.add(usersId, title, content, sourceId, category);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.fail();
    }
  }
  /**
   * 用户编辑文章页
   *
   * @memberof ArticleController
   */
  async article_edit() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
    };
    try {
      ctx.validate(createRule, ctx.params);
    } catch (error) {
      ctx.helper.warn(422);
      return;
    }
    const { id } = ctx.params;
    const article = await ctx.service.users.article.article(id);
    const category = await ctx.service.admin.category.findall();
    await ctx.render('users/article_edit.html', { article, category });
  }

  /**
   * 修改文章
   *
   * @memberof ArticleController
   */
  async post_article_edit() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
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
    const sourceId = ctx.session.users.sourceId;
    const usersId = ctx.session.users.id;
    if (!sourceId) {
      ctx.logger.warn('用户ID' + usersId + '没有申请发文权限');
      ctx.helper.error(300, '没有申请发文权限');
    }
    const { id, title, content, category } = ctx.request.body;
    const res = await ctx.service.users.article.edit(title, content, sourceId, category, id, usersId);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.fail();
    }
  }

  /**
   * 删除文章
   *
   * @memberof ArticleController
   */
  async post_article_del() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
    };
    // 校验参数
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.helper.error(422);
      return;
    }
    // 组装参数
    const sourceId = ctx.session.users.sourceId;
    const usersId = ctx.session.users.id;
    if (!sourceId) {
      ctx.logger.warn('用户ID' + usersId + '没有申请发文权限');
      ctx.helper.error(300, '没有申请发文权限');
    }
    const { id } = ctx.request.body;
    const res = await ctx.service.users.article.articleDel(id, usersId);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.fail();
    }
  }
}

module.exports = ArticleController;
