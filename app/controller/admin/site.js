'use strict';

const Controller = require('../../core/admin_base_controller');

class SiteController extends Controller {

  /**
   * 网站设置页
   *
   * @memberof SiteController
   */
  async index() {
    const { ctx } = this;
    const site = await ctx.service.admin.site.index();
    await ctx.render('admin/site.html', { site });
  }

  async post_site() {
    const { ctx } = this;
    const createRule = {
      id: 'id',
      name: 'string',
      domain: 'string',
      statistics: 'string',
    };
    ctx.validate(createRule);
    const { id, name, domain, statistics } = ctx.request.body;
    const res = await ctx.service.admin.site.edit(id, name, domain, statistics);
    if (res) {
      ctx.helper.success();
    } else {
      ctx.helper.error();
    }
  }
}

module.exports = SiteController;
