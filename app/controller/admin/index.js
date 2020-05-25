'use strict';

const Controller = require('../../core/admin_base_controller');

class IndexController extends Controller {
  async index() {
    const { ctx } = this;
    const data = {}; // await ctx.service.site.findOne();
    await ctx.render('admin/index.html', data);
  }
}

module.exports = IndexController;
