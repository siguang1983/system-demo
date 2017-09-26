/*
 * auth: siguang.liu
 * date: 2017/09/12
 * 新闻中心
 */

'use strict'

module.exports = app => {
    class ProductController extends app.Controller{

        // 查询商品列表
        async getProductList(){
            const {ctx, app, service} = this;

            ctx.body = ctx.service.product.product.getProductList(ctx.request.body);            
        }

        // 添加商品
        async addProduct(){
            const {ctx, app, service} = this;

            const paramRule = {
                productName: {type: String},        // 名称
                productType: {type: String},        // 类型
                productPirce: {type: Number},       // 价格
                productPicture: [String],           // 图片
                productRemind: {type: String}       // 提醒
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

            ctx.body = ctx.service.product.product.addProduct(ctx.request.body);      
        }

        // 修改配置
        async editProduct(){
            const {ctx, app, service} = this;

            const paramRule = {
                id: {type: String},
                productName: {type: String},        // 名称
                productType: {type: String},        // 类型
                productPirce: {type: Number},       // 价格
                productPicture: [String],           // 图片
                productRemind: {type: String}       // 提醒
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

            ctx.body = ctx.service.product.product.editProduct(ctx.request.body);   
        }

        // 删除端口
        async removeProduct(){
            const {ctx, app, service} = this;

            const paramRule = {
                id: {type: String}
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

            ctx.body = ctx.service.product.product.removeProduct(ctx.request.body);
        }
    }

    return ProductController;
}