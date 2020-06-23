'use strict';

const Service = require('egg').Service;
class LoginService extends Service {

  /**
   * 登录判断
   *
   * @param {*} phone 手机号
   * @param {*} pwd 密码
   * @return {*} /
   * @memberof LoginService
   */
  async login(phone, pwd) {
    const res = await this.ctx.model.Users.findOne({
      where: {
        phone,
      },
    });
    if (res && res.passward === pwd && res.active === 1) {
      this.ctx.session.users = { id: res.id, username: res.username, phone: res.phone, sourceId: res.sourceId };
      return true;
    }
    return false;
  }
}
module.exports = LoginService;
