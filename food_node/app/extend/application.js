/*
* auth: siguang
* date: 2017/01/16
* 公用接口
*/
'use strict'

const MD5 = require('crypto-js/md5');

const STATUS_TYPE = {
    error: -1,
    success: 0,
    sessionTimeout: 10001,
    userNotExisted: 10002,
    userAlreadyExisted: 10003,
    illegalPassword: 10004,
    serverBusy: 30000,
    serviceUnavailable: 30001,
    postOnly: 30002,
    paramsError: 30003,
    illegalAppKey: 40001,
    illegalSignature: 40002,
    internalError: 50000,
    forbidAppKey: 50001,
    forbidIP: 50002,
    tooOftenCall: 50003,
    recordNotExisted: 50004,
    recordAlreadyExisted: 50005,
    recordInUse: 50006,
}

// 全局返回状态码
const STATUS_MESSAGE = {
    '-1': '错误',
    0: '操作成功',
    10001: '会话超时',
    10002: '用户不存在',
    10003: '用户已存在',
    10004: '用户密码错误',
    30000: '服务器繁忙',
    30001: '服务不可用',
    30002: '仅支持POST请求',
    30003: '参数错误',
    40001: 'AppKey错误',
    40002: '签名校验错误',
    50000: '服务器内部错误',
    50001: 'AppKey被封',
    50002: 'IP被封',
    50003: '调用频率过快',
    50004: '记录不存在',
    50005: '记录已存在',
    50006: '记录已被占用',
};

module.exports = {

    // 全局返回状态类型
    statusType: STATUS_TYPE,

    // 全局返回状态码
    statusMessage: STATUS_MESSAGE,

    // 生成返回报文
    renderBody(params) {
        if (typeof params.statusType === 'undefined') {
            throw new Error('statusType error');
        }

        const response = {
            data: params.data || {},
            message: params.message || this.statusMessage[params.statusType],
            status: params.statusType,
        };

        if (params.error) response.error = params.error;

        return response;
    },

    // 生成盐
    generateSalt(){
        return (new Date()).getTime() + '' + Math.floor(Math.random() * 100000);
    },

    generateVerifyCode(verifyCodeLen = 4) {
        return Math.floor(Math.random() * Math.pow(10, verifyCodeLen));
    },

    // 计算加密后的密码
    computePassword(username, password, salt) {
        return MD5(`${username}${password}${salt}`);
    },

    // 格式化时间
    dateFormat(date, format) {
        var format = format || 'yyyy-MM-dd';
        if (!date) {
            return '';
        }
        if (typeof date === 'string') {
            date = parseInt(date);
        }

        date = new Date(date);
        let map = {
            'M': date.getMonth() + 1, //月份
            'd': date.getDate(), //日
            'h': date.getHours(), //小时
            'm': date.getMinutes(), //分
            's': date.getSeconds(), //秒
            'q': Math.floor((date.getMonth() + 3) / 3), //季度
            'S': date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function (all, t) {
            let v = map[t];
            if (v !== undefined) {
            if (all.length > 1) {
                v = '0' + v;
                v = v.substr(v.length - 2);
            }
            return v;
            } else if (t === 'y') {
            return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    }
}
