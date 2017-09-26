/*
 * auth: siguang.liu
 * date: 2017/09/12
 * 新闻中心
 */

'use strict'

module.exports = app => {
    class ProductService extends app.Controller{

        // 查询商品列表
        async getProductList(){
            let response;
            const doc = await app.model.Product.find();

            if(doc){
                response = {
                    data: {
                        list: doc
                    },
                    message: '获取成功',
                    status: 0
                }
            }
            else{
                response = {
                    data: {
                        list: doc
                    },
                    message: '获取成功',
                    status: 0
                }
            }

            return response;
        }

        // 添加商品
        async addProduct(params){
            const doc = new app.model.Product({
                productName: params.productName,
                productType: params.productType,
                productPirce: params.productPirce,
                productPicture: params.productPicture,
                productRemind: params.productRemind,
            })

            await doc.save();

            return {
                data: {
                    list: doc
                },
                message: '商品添加操作成功',
                status: 0
            }
        }

        // 修改端口
        async editProduct(){
            
        }

        // 删除端口
        async removeProduct(){

        }
    }

    return ProductService;
}