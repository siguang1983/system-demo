/*
* auth: siguang
* date: 2017/01/16
* 新闻 Controller
*/
'use strict'

module.exports = app => {

    class NewsController extends app.Controller{

        // 获取新闻列表
        async getNewsAll(){
            const {ctx, app, service} = this;

            const doc = await ctx.service.news.news.getNewsAll();
            console.log(`Response ========== ${JSON.stringify(doc)}`);

            await ctx.render('news/newsList.tpl', {comments: doc.data.list});
        }

        // 通过_id获取内容
        async getNewsContent(){
            const {ctx, app, service} = this;

            const params = ctx.query;
            if(!params.id){
                ctx.body = {
                    data: {},
                    status: -1,
                    message: paramError
                }
                return false;
            }

            const doc = await ctx.service.news.news.getNewsContent(params);
            
            await ctx.render('news/newsContent.tpl', {comments: doc.data})
        }


        /***************** post ****************/

        // 获取新闻列表 - 前后端分离
        async postNewsAll(){
            const {ctx, app, service} = this;

            // const paramRule = {
            //     newsTitle: {type: 'String'}
            // }

            // const paramError = app.validator.validate(paramRule, ctx.request.body);
            // if(paramError){
            //     return ctx.body = {
            //         data: {},
            //         status: -1,
            //         message: paramError
            //     }
            //     return false;
            // }

            console.log(`request ------ ${ctx.request.body}`);

            ctx.body = await ctx.service.news.news.postNewsAll(ctx.request.body);
        }

        // 通过_id获取内容 - 前后端分离
        async postNewsContent(params){ 
            const {ctx, app, service} = this;

            const paramRule = {
                id: {type: 'string'}
            }
            const paramError = app.validator.validate(paramRule, ctx.request.body);
            if(paramError){
                return ctx.body = {
                    data: {},
                    status: -1,
                    message: paramError
                }
                return false;
            }
            
            ctx.body = await ctx.service.news.news.postNewsContent(ctx.request.body);
        }



        // 添加新闻
        async addNews(){
            const {ctx, app, service} = this;

            const paramRule = {
                newsTitle: {type: 'string'},
                newsContent: {type: 'string'}
            }

            const paramError = app.validator.validate(paramRule, ctx.request.body);
            if(paramError){
                ctx.body = {
                    data: {},
                    status: -1,
                    message: paramError
                }
                return false;
            }

            ctx.body = await ctx.service.news.news.addNews(ctx.request.body);
        }

        // 修改新闻
        async editNews(){
            const {ctx, app, service} = this;

            const paramRule = {
                id: {type: 'string'},
                newsTitle: {type: 'string'},
                newsContent: {type: 'string'}
            }
            const paramError = app.validator.validate(paramRule, ctx.request.body);
            if(paramError){
                ctx.body = {
                    data: {},
                    status: -1,
                    message: paramError
                }
                return false;
            }

            ctx.body = await ctx.service.news.news.editNews(ctx.request.body);
        }

        // 删除新闻
        async removeNews(){
            const {ctx, app, service} = this;

            const paramRule = {
                id: {type: 'string'}
            };
            const paramError = app.validator.validate(paramRule, ctx.request.body);
            ctx.logger.info(`======${paramError}====`)
            if(paramError){
                ctx.body = {
                    data: {},
                    status: -1,
                    message: paramError
                }
            }

            ctx.body = await ctx.service.news.news.removeNews(ctx.request.body);
        }
    }

    return NewsController;
}