'use strict';

const Controller = require('../../core/admin_base_controller');

class ArticleController extends Controller {

  /**
   * 文章列表
   *
   * @memberof ArticleController
   */
  async list() {
    const { ctx } = this;
    const res = await ctx.service.admin.article.articleList();
    await ctx.render('admin/article/article_list.html', { res: JSON.stringify(res) });
  }

  /**
   * 列表分页
   *
   * @memberof ArticleController
   */
  async post_list() {
    const { ctx } = this;
    const createRule = {
      page: 'int',
    };
    // 校验参数
    ctx.validate(createRule);
    const { page } = ctx.request.body;
    const res = await ctx.service.admin.article.articleList(page || 1);
    if (res) {
      ctx.helper.success(res);
    } else {
      ctx.helper.error();
    }
  }

  /**
   * 添加文章页
   *
   * @memberof ArticleController
   */
  async add() {
    const { ctx } = this;
    const category = await ctx.service.admin.category.findall();
    const res = await ctx.service.admin.source.selpage(1, 500);
    await ctx.render('admin/article/article_add.html', { category, source: res.rows });
  }

  /**
   * 编辑文章页
   *
   * @memberof ArticleController
   */
  async edit() {
    const { ctx } = this;
    const createRule = {
      id: 'number',
    };
    ctx.validate(createRule, ctx.params);
    const id = ctx.params.id;
    const res = await ctx.service.admin.article.article(id);
    const category = await ctx.service.admin.category.findall();
    const source = await ctx.service.admin.source.selpage(1, 500);
    await ctx.render('admin/article/article_edit.html', { article: res, category, source: source.rows });
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
      source: 'string',
      category: 'string',
    };
    // 校验参数
    ctx.validate(createRule);
    // 组装参数
    // const author = ctx.session.id;
    // const req = Object.assign(ctx.request.body, { author });
    const { title, content, source, category } = ctx.request.body;
    const res = await ctx.service.admin.article.add(title, content, source, category);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.fail();
    }
  }

  /**
   * 编辑文章
   *
   * @memberof ArticleController
   */
  async post_edit() {
    const { ctx } = this;
    const createRule = {
      title: 'string',
      content: 'string',
      source: 'string',
      category: 'string',
      id: 'number',
    };
    // 校验参数
    ctx.validate(createRule);
    const { title, content, source, category, id } = ctx.request.body;
    const res = await ctx.service.admin.article.edit(title, content, source, category, id);
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
  async post_del() {
    const { ctx } = this;
    const createRule = {
      id: 'number',
    };
    // 校验参数
    ctx.validate(createRule);
    const { id } = ctx.request.body;
    const res = await ctx.service.admin.article.articleDel(id);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.fail();
    }
  }
}

module.exports = ArticleController;
