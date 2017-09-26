/*
 * auth: siguang.liu
 * date: 2017/09/12
 * 用户信息
 */

'use strict'

module.exports = app => {
    const mongoose = app.mongoose;

    const UserSchema = new mongoose.Schema({
        username: {type: String, min: 6, trim: true, unique: true},
        realName: {type: String, trim: true, unique: true},
        password: {type: String, min: 6},
        isAdmin: {type: Boolean},
        salt: {type: String, trim: true, unique: true}
    },{
        timestamps: true,
        collection: 'user',
    });

    return mongoose.model('User', UserSchema);
}