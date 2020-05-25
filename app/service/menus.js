'use strict';

const Service = require('egg').Service;

class MenusService extends Service {

  /**
   * 菜单列表
   *
   * @return {*} 结果
   * @memberof MenusService
   */
  async menus() {
    const Category = await this.ctx.model.Category.findAll({
      where: {
        menus: 1,
      },
    });
    return Category;
  }
}

module.exports = MenusService;
