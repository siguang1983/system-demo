/*
 * auth: siguang.liu
 * date: 2017/09/12
 * 新闻中心
 */

'use strict'

module.exports = app => {
    const mongoose = app.mongoose;

    const NewsSchema = new mongoose.Schema({
        newsTitle: {type: String, max: 32},
        newsContent: {type: String},
    },{
        timestamps: true,
        collection: 'news',
    });

    return mongoose.model('News', NewsSchema);
}

