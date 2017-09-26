/*
* auth: siguang
* date: 2017/01/16
* 公用方法
*/
'use strict'

export default{
    serverHost: 'http://127.0.0.1:7001',

    // 本地存储控制
    setStorage(key, val){
        return localStorage.setItem(key, val)
    },

    getStorage(key){
        return localStorage.getItem(key);
    },

    removeStorage(key){
        return localStorage.removeItem(key);
    },

    // 存储登录信息
    saveUser(user){
        this.setStorage('user', JSON.stringify(user));
    },

    // 是否登录
    loggedIn(){
        let user = this.getStorage('user');
        return user ? true : false;
    },


    
    // 格式化日期
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
    },

}
