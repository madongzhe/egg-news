'use strict';

const Service = require('egg').Service;

class AuthService extends Service {

  /**
   * 添加媒体
   *
   * @param {*} sourceName 媒体名称
   * @param {*} sourceIntroduce 媒体介绍
   * @param {*} mediaLogo 媒体头像
   * @param {*} userId 用户Id
   * @return {*} /
   * @memberof AuthService
   */
  async add(sourceName, sourceIntroduce, mediaLogo, userId) {
    const { ctx } = this;
    const source = await this.sourcefind(sourceName);
    if (!source) {
      let t = await ctx.model.transaction();
      try {
        const res = await ctx.model.Source.create({
          sourceName,
          sourceIntroduce,
          mediaLogo,
          userId,
        }, { transaction: t });
        await ctx.model.Users.update({
          sourceId: res.id,
        }, {
          where: {
            id: userId,
          },
        }, { transaction: t });
        ctx.session.users.sourceId = res.id;
        await t.commit();
        return true;
      } catch (error) {
        ctx.logger.warn(error);
        await t.rollback();
        return false;
      }
    }
    return false;
  }

  /**
   * 查找媒体名称是否存在
   *
   * @param {*} sourceName 媒体名称
   * @return {*} 结果
   * @memberof AuthService
   */
  async sourcefind(sourceName) {
    return this.ctx.model.Source.findOne({
      where: {
        sourceName,
      },
    });
  }
}
module.exports = AuthService;
