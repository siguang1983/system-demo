/*
* auth: siguang
* date: 2017/01/16
* 登录、角色
*/
'use strict'

module.exports = app => {
    class UserService extends app.Service {
        async login(params) {
            const {ctx, app} = this;
            const {username, password} = params;

            console.log(`---------${username}, ${password}`);

            // 超级管理员
            if(params.username == 'super' && params.password == 'ssssss'){
                ctx.session.visited = ctx.session.visited ? ctx.session.visited++ : 1;
                
                return ctx.body = {
                    data: {
                        user: '超级管理员'
                    },
                    status: 0,
                    message: '登功成功'
                }
                
                return false;
            }

            // 普通用户
            const findUser = await this.findUser(username);

            console.log(`Username: ${findUser}`)
            if(!findUser){
                return app.renderBody({
                    statusType: app.statusType.recordAlreadyExisted,
                    message: '该用户不存在'
                })
            }

            const loginPassword = app.computePassword(username, password, findUser.salt);  
            if(findUser.password != loginPassword){
                return app.renderBody({
                    statusType: app.statusType.recordAlreadyExisted,
                    message: '登录失败'
                })
            }

            ctx.session.user = findUser;

            const response = app.renderBody({
                statusType: app.statusType.success,
                data: findUser,
                message: '登录成功'
            })

            console.log(`Response: ${response}`);
            return response          
        }

        // 获取用户列表数据
        async getUserList(){
            const userList = await app.model.User.find();
            console.log(`list ====== ${userList}`);

            return app.renderBody({
                statusType: app.statusType.success,
                data: {
                    list: userList
                }
            })
        }

        // 创建用户
        async createUser(params){
            console.log(`Params ==== ${JSON.stringify(params)}`)
            const {username, password, realName, isAdmin} = params;
            
            // 查看是否存在
            const findUser = await this.findUser(username);
            if(findUser){
                return app.renderBody({
                    statusType: app.statusType.recordAlreadyExisted
                })
            }

            // 获取盐
            const salt = app.generateSalt();
            console.log(`Salt ==== ${salt}`)

            // 对密码进行加密
            const cryptedPassword = app.computePassword(username, password, salt);
            console.log(`Password ==== ${cryptedPassword}`)
            
            // 添加到库中
            let insertRole = new app.model.User({
                username: username,
                realName: realName || username,
                password: cryptedPassword,
                isAdmin: isAdmin,
                salt: salt
            })
            await insertRole.save()
            return app.renderBody({
                statusType: app.statusType.success
            })
        }

        // 修改密码
        async revisePassword(params){
            const {username, oldPassword, newPassword, salt} = params;

            if(newPassword === oldPassword){
                return app.renderBody({
                    statusType: app.statusType.recordAlreadyExisted,
                    message: '新密码与旧密码不能相同'
                })
            }

            // 查看旧密码是否正确
            let findUser = await this.findUser(username);
            if(!findUser){
                return app.renderBody({
                    statusType: app.statusType.recordAlreadyExisted
                })
            }

            const oldCryptedPassword = app.computePassword(username, oldPassword, findUser.salt);            
            if(oldCryptedPassword != findUser.password){
                return app.renderBody({
                    statusType: app.statusType.recordAlreadyExisted,
                    message: '旧密码错误'
                })
            }

            // 对新密码进行加密
            const newCryptedPassword = app.computePassword(username, newPassword, findUser.salt);
            findUser.password = newCryptedPassword;
            findUser.save();

            const response = app.renderBody({
                statusType: app.statusType.success
            })

            console.log(`Response: ${response}`);
            return response
        }

        // 删除用户
        async removeUser(params){
            const {id, username} = params;
            
            // 查看用户是否存在
            let findUser = await this.findUser(username);

            if(!findUser){
                return app.renderBody({
                    statusType: app.statusType.recordAlreadyExisted,
                    message: '用户不存在'
                })
            }

            // 删除用户信息
            const doc = await app.model.User.remove({_id: id});
 
            const response = app.renderBody({
                statusType: app.statusType.success
            })
            console.log(`Response: ${response}`);

            return response
        }

        // 查看用户
        async findUser(username){
            if(username == 'super'){
                return {
                    username: 'super',
                    salt: '',
                    isAdmin: true
                }
            }

            const user = await app.model.User.findOne({username});
            return user;            
        }
    }

    return UserService;
}