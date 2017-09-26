/*
 * auth: siguang.liu
 * date: 2017/09/12
 * 产品中心
 */

'use strict'

module.exports = app => {
    const mongoose = app.mongoose;

    const ProductSchema = new mongoose.Schema({
        productName: {type: String},        // 名称
        productType: {type: String},        // 类型
        productPirce: {type: Number},       // 价格
        productPicture: [String],           // 图片
        productRemind: {type: String}       // 提醒
    },{
        timestamps: true,
        collection: 'product',
    });

    return mongoose.model('Product', ProductSchema);
}