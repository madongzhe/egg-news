'use strict';

const { Controller } = require('egg');
class BaseController extends Controller {
  get user() {
    return this.ctx.session.admin;
  }

  success(data) {
    this.ctx.body = {
      success: true,
      data,
    };
  }

  notFound(msg) {
    msg = msg || 'not found';
    this.ctx.throw(404, 'site not found');
  }
}
module.exports = BaseController;
