'use strict';

exports.formatDate = (date, format) => {
  const d = new Date(date);
  const o = {
    'M+': d.getMonth() + 1,
    'D+': d.getDate(),
    'H+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3), // 季度
    'f+': d.getMilliseconds(), // 毫秒
  };
  if (/(Y+)/.test(format)) {
    format = format.replace(RegExp.$1, d.getFullYear() + '').substr(4 - RegExp.$1.length);
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return format;
};

exports.image = (data, num = 0) => {
  if (data) {
    return data.split(',')[num];
  }
  return '/public/image.png';
};

exports.replace_str = (data) => {
  if (data) {
    return data.replace(/<.*?>/g, '').replace(/\s+/g, "").slice(0, 200)
  } else {
    return ''
  }
}
