/*
* auth: siguang
* date: 2017/01/16
* 验证是否登录
*/

'use strict'

module.exports = app => {

    return async function checkAuth(ctx, next){
        const user = ctx.session.user;

        if(user){
            console.log(`visited true`);
            await next();
        }
        else{
            console.log(`visited false`);
            ctx.body ={
                status: 10001,
                message: '会话超时'
            }
        }
    }

}