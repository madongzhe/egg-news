'use strict';
const fs = require('fs');
const path = require('path');
const Core = require('@alicloud/pop-core');

module.exports = {
  errorCode: {
    200: '请求成功。客户端向服务器请求数据，服务器返回相关数据',
    201: '资源创建成功。客户端向服务器提供数据，服务器创建资源',
    202: '请求被接收。但处理尚未完成',
    204: '客户端告知服务器删除一个资源，服务器移除它',
    206: '请求成功。但是只有部分回应',
    400: '请求无效。数据不正确，请重试',
    401: '请求没有权限。缺少API token，无效或者超时',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求失败。请求头部不一致，请重试',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '请求失败。请验证参数',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
  },
  /**
   * 读取路径信息
   * @param {string} path 路径
   */
  getStat(path) {
    return new Promise((resolve, reject) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          resolve(false);
        } else {
          resolve(stats);
        }
      });
    });
  },

  /**
   * 创建路径
   * @param {string} dir 路径
   */
  mkdir(dir) {
    return new Promise((resolve, reject) => {
      fs.mkdir(dir, err => {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  },

  /**
   * 路径是否存在，不存在则创建
   * @param {string} dir 路径
   */
  async dirExists(dir) {
    const isExists = await this.getStat(dir);
    // 如果该路径且不是文件，返回true
    if (isExists && isExists.isDirectory()) {
      return true;
    } else if (isExists) { // 如果该路径存在但是文件，返回false
      return false;
    }
    // 如果该路径不存在
    const tempDir = path.parse(dir).dir; // 拿到上级路径
    // 递归判断，如果上级目录也不存在，则会代码会在此处继续循环执行，直到目录存在
    const status = await this.dirExists(tempDir);
    let mkdirStatus;
    if (status) {
      mkdirStatus = await this.mkdir(dir);
    }
    return mkdirStatus;
  },

  /**
   * 请求成功
   *
   * @param {*} data // 请求结果
   */
  async success(data) {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      code: '200',
      data,
      msg: '请求成功',
    };
  },

  /**
   * 请求错误
   *
   * @param {*} msg //
   */
  async error(msg) {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      code: '500',
      msg: msg || '服务器发生错误',
    };
  },

  /**
   * 请求失败
   *
   * @param {number} [code=400]
   * @param {*} [msg=null]
   */
  async fail(code = 400, msg = null) {
    const { ctx } = this;
    ctx.status = 200;
    ctx.body = {
      code,
      msg: msg || ctx.helper.errorCode[code],
      data: '',
    };
  },
  /**
   * 数组转json树
   *
   * @param {*} data // 数组
   * @param {*} pid // 父id
   * @return {*} //
   */
  convertToTreeData(data, pid) {
    const list = JSON.parse(JSON.stringify(data));
    const result = [];
    const temp = {};
    for (let i = 0; i < list.length; i++) {
      temp[list[i].id] = list[i];
    }
    for (let j = 0; j < list.length; j++) {
      const tempVp = temp[list[j][pid]];
      if (tempVp) {
        if (!tempVp.categoryGroupList) tempVp.categoryGroupList = [];
        tempVp.categoryGroupList.push(list[j]);
      } else {
        result.push(list[j]);
      }
    }
    return { categoryList: result };
  },

  /**
   * 延迟器
   *
   * @param {*} ms 延迟时间
   */
  async delay(ms) {
    setTimeout(function () {
      return 1;
    }, ms);
  },

  /**
   * 发送短信验证码
   *
   * @param {*} phone 手机号
   * @param {*} code 验证码
   */
  async sms(phone, code) {
    const client = new Core({
      accessKeyId: this.app.config.sms.accessKeyId,
      accessKeySecret: this.app.config.sms.accessSecret,
      endpoint: 'https://dysmsapi.aliyuncs.com',
      apiVersion: '2017-05-25',
    });
    const params = {
      RegionId: 'cn-hangzhou',
      PhoneNumbers: phone,
      SignName: '极客热讯',
      TemplateCode: 'SMS_192541948',
      TemplateParam: { code },
    };
    const requestOption = {
      method: 'POST',
    };
    client.request('SendSms', params, requestOption).then(result => {
      console.log(JSON.stringify(result));
      return 1;
    }, ex => {
      console.log(ex);
      return 0;
    });
  },
  /**
   * 按ascii码从小到大排序
   * @param {json} obj  排序对象
   * @return {string} 结果
   */
  async sort_ascii(obj) {
    const arr = [];
    let num = 0;
    for (const i in obj) {
      arr[num] = i;
      num++;
    }
    const sortArr = arr.sort();
    let str = '';// 自定义排序字符串
    for (const i in sortArr) {
      // str += sortArr[i] + '=' + obj[sortArr[i]] + '&';
      str += sortArr[i] + obj[sortArr[i]];
    }
    // 去除两侧字符串
    // const char = '&';
    // str = str.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '');

    return str;
  },

  /**
   * 时间格式化
   *
   * @param {*} date
   * @param {*} fmt
   * @return
   */
  async dateFormat(date, fmt) {
    let ret;
    const opt = {
      'Y+': date.getFullYear().toString(), // 年
      'M+': (date.getMonth() + 1).toString(), // 月
      'D+': date.getDate().toString(), // 日
      'H+': date.getHours().toString(), // 时
      'm+': date.getMinutes().toString(), // 分
      's+': date.getSeconds().toString(), // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (const k in opt) {
      ret = new RegExp('(' + k + ')').exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')));
      }
    }
    return fmt;
  },
};
