'use strict';

const Controller = require('../../core/admin_base_controller');

class LinkController extends Controller {

  /**
   * 友情链接页
   *
   * @memberof LinkController
   */
  async list() {
    const { ctx } = this;
    const res = await ctx.service.admin.link.list();
    await ctx.render('admin/link/link.html', { res: JSON.stringify(res) });
  }

  /**
   * 添加友情链接
   *
   * @memberof LinkController
   */
  async post_add() {
    const { ctx } = this;
    const createRule = {
      linkName: 'string',
      linkUrl: 'string',
    };
    ctx.validate(createRule);
    const { linkName, linkUrl } = ctx.request.body;
    const res = await ctx.service.admin.link.add(linkName, linkUrl);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.error();
    }
  }

  /**
   * 修改友情链接
   *
   * @memberof LinkController
   */
  async post_edit() {
    const { ctx } = this;
    const createRule = {
      id: 'id',
      linkName: 'string',
      linkUrl: 'string',
    };
    ctx.validate(createRule);
    const { id, linkName, linkUrl } = ctx.request.body;
    const res = await ctx.service.admin.link.edit(id, linkName, linkUrl);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.error();
    }
  }
}

module.exports = LinkController;
