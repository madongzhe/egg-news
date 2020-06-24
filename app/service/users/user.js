'use strict';

const Service = require('egg').Service;
class UserService extends Service {

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

  /**
   * 用id查用户
   *
   * @param {*} id 主键ID
   * @return {*} 结果
   * @memberof UserService
   */
  async findId(id) {
    const user = await this.ctx.model.Users.findOne({
      where: {
        id,
      },
    });
    return user;
  }
}
module.exports = UserService;
