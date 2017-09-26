/*
* auth: siguang
* date: 2017/01/16
* 登录、角色
*/
'use strict'

module.exports = app => {
    class UserController extends app.Controller {
        async login() {
            const { ctx, app } = this;
            
            const paramRule = {
                username: {type: "string"},
                password: {type: "string"}
            }

            const paramErrors = app.validator.validate(paramRule, ctx.request.body);
            if(paramErrors){
                ctx.body = {
                    data: {},
                    status: 333,
                    message: paramErrors
                }
                return false;
            }

            ctx.body = await ctx.service.user.user.login(ctx.request.body);
        }

        // 获取用户列表
        async getUserList(){
            const {ctx, app, service} = this;

            ctx.body = await ctx.service.user.user.getUserList();
        }

        // 创建用户
        async createUser(){
            const {ctx, app, service} = this;

            const paramsRule = {
                username: {type: "string"},
                realName: {type: "string"},
                password: {type: "string", min: 6, max: 12},
                isAdmin: {type: "boolean"}
            }

            const paramErrors = app.validator.validate(paramsRule, ctx.request.body);

            console.log(paramErrors);
            if(paramErrors){
                ctx.body = app.renderBody({
                    successType: app.statusType.paramsError,
                    message: paramErrors
                })
                return false;
            }

            ctx.body = await ctx.service.user.user.createUser(ctx.request.body);
        }

        // 修改密码
        async revisePassword(){
            const {ctx, app, service} = this;

            const paramsRule = {
                username: {type: 'string'},
                oldPassword: {type: 'string'},
                newPassword: {type: 'string'}
            }
            const paramErrors = app.validator.validate(paramsRule, ctx.request.body);
            if(paramErrors){
                ctx.body = app.renderBody({
                    successType: app.statusType.paramsError,
                    message: paramErrors
                })
                return false;
            }

            ctx.body = await ctx.service.user.user.revisePassword(ctx.request.body);
        }

        // 删除用户
        async removeUser(){
            const {ctx, app, service} = this;

            const paramsRule = {
                id: {type: 'string'},
                username: {type: 'string'}
            }
            const paramErrors = app.validator.validate(paramsRule, ctx.request.body);
            if(paramErrors){
                ctx.body =  app.renderBody({
                    successType: app.statusType.paramsError,
                    message: paramErrors
                })
                return false;
            }

            ctx.body = await ctx.service.user.user.removeUser(ctx.request.body);
        }

        // 编辑用户
        async editUser(){
            ctx.body = '功能稍后完善'
        }
    }

    return UserController;
}