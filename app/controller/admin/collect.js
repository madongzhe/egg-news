'use strict';

const Controller = require('../../core/admin_base_controller');

class CollectController extends Controller {

  /**
   * 采集媒体列表页
   *
   * @memberof CollectController
   */
  async list() {
    const { ctx } = this;
    const res = await ctx.service.admin.collect.list(1);
    await ctx.render('admin/collect/collect_list', { res: JSON.stringify(res) });
  }

  /**
   * 请求列表
   *
   * @memberof CollectController
   */
  async post_list() {
    const { ctx } = this;
    const createRule = {
      page: 'int?',
    };
    // 校验参数
    ctx.validate(createRule, ctx.request.query);
    const page = ctx.request.query.page;
    const res = await ctx.service.admin.collect.list(page);
    if (res) {
      ctx.helper.success(res);
    } else {
      ctx.helper.error();
    }
  }

  /**
   * 添加页
   *
   * @memberof CollectController
   */
  async add() {
    const { ctx } = this;
    const category = await ctx.service.admin.category.findall();
    const source = await ctx.service.admin.source.selpage(1, 200);
    await ctx.render('admin/collect/collect_add', { category, source });
  }

  /**
   * 保存采集媒体
   *
   * @memberof CollectController
   */
  async post_add() {
    const { ctx } = this;
    const createRule = {
      name: 'string',
      category: 'string',
      source_id: 'string',
      url: 'string',
      listrule: 'string',
      articlerule: 'string',
      // state: { type: 'int' },
    };
    // 校验参数
    ctx.validate(createRule);
    const { name, url, category, source_id, listrule, articlerule } = ctx.request.body;
    const res = await ctx.service.admin.collect.add(name, url, category, source_id, listrule, articlerule);
    ctx.helper.success(res);
  }

  /**
   * 编辑页
   *
   * @memberof CollectController
   */
  async edit() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
    };
    // 校验参数
    ctx.validate(createRule, ctx.params);
    const id = ctx.params.id;
    const res = await ctx.service.admin.collect.selone(id);
    const category = await ctx.service.admin.category.findall();
    const source = await ctx.service.admin.source.selpage(1, 200);
    await ctx.render('admin/collect/collect_edit', { res, category, source });
  }

  /**
   * 提交编辑数据
   *
   * @memberof CollectController
   */
  async post_edit() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
      name: 'string',
      category: 'string',
      source_id: 'int',
      url: 'string',
      listrule: 'string',
      titlerule: 'string',
      articlerule: 'string',
    };
    // 校验参数
    ctx.validate(createRule);
    const { id, name, url, category, source_id, listrule, titlerule, articlerule } = ctx.request.body;
    const res = await ctx.service.admin.collect.edit(id, name, url, category, source_id, listrule, titlerule, articlerule);
    ctx.helper.success(res);
  }

  /**
   * 删除采集媒体
   *
   * @memberof CollectController
   */
  async post_del() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
    };
    // 校验参数
    ctx.validate(createRule);
    const res = await ctx.service.admin.collect.del(ctx.request.body.id);
    if (res) {
      ctx.helper.success('删除成功');
    } else {
      ctx.helper.error('删除失败');
    }
  }

  /**
   * 是否开启采集
   *
   * @memberof CollectController
   */
  async post_state() {
    const { ctx } = this;
    const createRule = {
      id: 'int',
      state: 'int',
    };
    // 校验参数
    ctx.validate(createRule);
    const { id, state } = ctx.request.body;
    const res = await ctx.service.admin.collect.state(id, state);
    if (res) {
      ctx.helper.success('成功');
    } else {
      ctx.helper.error('失败');
    }
  }

  /**
   * 测试获取列表
   *
   * @memberof CollectController
   */
  async test_list() {
    const { ctx } = this;
    const createRule = {
      url: 'string',
      listrule: 'string',
    };
    try {
      // 校验参数
      const e = ctx.validate(createRule);
      console.log(e);
    } catch (error) {
      ctx.helper.error('参数错误');
      return;
    }
    const { url, listrule } = ctx.request.body;
    const res = await ctx.service.admin.collect.collectList(url, listrule);
    ctx.helper.success(res || '没有数据');
  }

  /**
   * 测试采集标题
   *
   * @memberof CollectController
   */
  async test_title() {
    const { ctx } = this;
    const createRule = {
      url: 'string',
      listrule: 'string',
      titlerule: 'string',
    };
    // 校验参数
    ctx.validate(createRule);
    const { url, listrule, titlerule } = ctx.request.body;
    const list = await ctx.service.admin.collect.collectList(url, listrule);
    const res = await ctx.service.admin.collect.ceshi_collectArticle(list[0], titlerule);
    ctx.helper.success(res || '没有数据');
  }
  /**
   * 测试文章内容
   *
   * @memberof CollectController
   */
  async test_article() {
    const { ctx } = this;
    const createRule = {
      url: 'string',
      listrule: 'string',
      articlerule: 'string',
    };
    // 校验参数
    ctx.validate(createRule);
    const { url, listrule, articlerule } = ctx.request.body;
    const list = await ctx.service.admin.collect.collectList(url, listrule);
    if (list.length > 0) {
      const res = await ctx.service.admin.collect.ceshi_collectArticle(list[0], articlerule);
      ctx.helper.success(res || '没有数据');
      return;
    }
    ctx.helper.error();
  }
}
module.exports = CollectController;
