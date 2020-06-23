'use strict';

const Controller = require('../core/base_controller');

class FeedbackController extends Controller {

  /**
   * 反馈页
   *
   * @memberof FeedbackController
   */
  async index() {
    const { ctx } = this;
    await ctx.render('feedback.html');
  }

  /**
   * 提交反馈
   *
   * @memberof FeedbackController
   */
  async post_feedback() {
    const { ctx } = this;
    const createRule = {
      feedback: 'string',
    };
    try {
      ctx.validate(createRule);
    } catch (error) {
      ctx.helper.fail(422);
    };
    // if (false) {
    //   ctx.helper.fail(402);
    // }
  }
}

module.exports = FeedbackController;
