'use strict';

const Controller = require('../../core/admin_base_controller');
class SourceController extends Controller {

  /**
   * 媒体列表
   *
   * @memberof SourceController
   */
  async source() {
    const { ctx } = this;
    const res = await ctx.service.admin.source.selpage();
    await ctx.render('admin/source/source_list.html', { res: JSON.stringify(res) });
  }

  /**
   * 新增页
   *
   * @memberof SourceController
   */
  async add() {
    const { ctx } = this;
    await ctx.render('admin/source/source_add.html');
  }

  /**
   * 修改页
   *
   * @memberof SourceController
   */
  async edit() {
    const { ctx } = this;
    const createRule = {
      id: 'id',
    };
    ctx.validate(createRule, ctx.params);
    const id = ctx.params.id;
    const res = await ctx.service.admin.source.selone(id);
    await ctx.render('admin/source/source_edit.html', { res });
  }

  /**
   * 新增提交
   *
   * @memberof SourceController
   */
  async post_add() {
    const { ctx } = this;
    const createRule = {
      source_name: 'string',
      userId: 'int',
    };
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.logger.warn(error);
      ctx.helper.error(422);
      return;
    }
    const { source_name, userId } = ctx.request.body;
    const res = await ctx.service.admin.source.add(source_name, userId);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.error();
    }
  }

  /**
   * 修改提交
   *
   * @memberof SourceController
   */
  async post_edit() {
    const { ctx } = this;
    const createRule = {
      id: 'id',
      source_name: 'string',
      userId: 'int',
    };
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.logger.warn(error);
      ctx.helper.error(422);
      return;
    }
    const { id, source_name, userId } = ctx.request.body;
    const res = await ctx.service.admin.source.edit(id, source_name, userId);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.error();
    }
  }

  /**
   * 删除
   *
   * @memberof SourceController
   */
  async post_del() {
    const { ctx } = this;
    const createRule = {
      id: 'id',
    };
    ctx.validate(createRule);
    const res = await ctx.service.admin.source.del(ctx.request.body.id);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.error();
    }
  }
}

module.exports = SourceController;
