'use strict';

const Service = require('egg').Service;
class SourceService extends Service {

  /**
   * 用id查媒体信息
   *
   * @param {*} id 主键ID
   * @return {*} 结果
   * @memberof SourceService
   */
  async findId(id) {
    const source = await this.ctx.model.Source.findOne({
      where: {
        id,
      },
    });
    return source;
  }
}
module.exports = SourceService;
