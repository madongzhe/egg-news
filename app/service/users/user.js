'use strict';

const Service = require('egg').Service;
class UserService extends Service {

  /**
   * 用户注册
   *
   * @param {*} phone 手机号
   * @param {*} passward 密码
   * @return {*} /
   * @memberof UserService
   */
  async add(phone, passward) {
    const user = await this.findOne(phone);
    if (!user) {
      const res = await this.ctx.model.Users.create({
        phone,
        passward,
      });
      if (!res) {
        this.ctx.throw(404, 'site not found');
      }
      return res;
    }
    return false;
  }

  /**
   * 查找用户
   *
   * @param {*} phone 手机
   * @return {*} /
   * @memberof UserService
   */
  async findOne(phone) {
    const user = await this.ctx.model.Users.findOne({
      where: {
        phone,
      },
    });
    return user;
  }
}
module.exports = UserService;
