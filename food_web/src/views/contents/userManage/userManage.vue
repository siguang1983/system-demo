<template>
    <div class="scroll-y">
        <div class="user-head">
            <el-button type="primary" @click="addUserDialog = true">添加用户</el-button>
        </div>

        <el-table :data="userData" style="width: 100%">
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="realName" label="用户姓名"></el-table-column>
            <el-table-column label="是否管理员">
                <template scope="scope">
                    {{ scope.row.isAdmin ? '是' : '否' }}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="openEditPassword(scope.row)">修改密码</el-button>
                    <el-button type="primary" size="small" @click="openDeleteUser(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加用户 -->
        <el-dialog title="添加用户" v-model="addUserDialog">
            <el-form :model="userForm" :rules="userRules" ref="userForm" label-width="100px" class="w80">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userForm.username"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="realName">
                    <el-input v-model="userForm.realName"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userForm.password"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repeatPassword">
                    <el-input type="password" v-model="userForm.repeatPassword"></el-input>
                </el-form-item>
                <el-form-item label="是否管理员" prop="isAdmin">
                    <el-radio-group v-model="userForm.isAdmin">
                        <el-radio label="是" value="true"></el-radio>
                        <el-radio label="否" value="false"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="sendAddUser('userForm')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改密码 -->
        <el-dialog title="修改密码" v-model="editPasswordDialog">
            <el-form ref="passwordForm" :model="passwordForm" :rules="passwordRules" label-width="100px" class="w80">
                <el-form-item label="初始密码">
                    <el-input v-model="passwordForm.oldPassword"></el-input>
                </el-form-item>
                <el-form-item label="新密码">
                    <el-input v-model="passwordForm.newPassword"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码">
                    <el-input v-model="passwordForm.repeatPassword"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editPasswordDialog = false">取 消</el-button>
                <el-button type="primary" @click="sendEditPassword('passwordForm')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除用户 -->
        <el-dialog title="删除用户" v-model="deleteUserDialog">
            <span>是否要删除当前用户</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="deleteUserDialog = false">取 消</el-button>
                <el-button type="primary" @click="sendDeleteUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    import { Notification } from 'element-ui'

    export default {
        data(){
            return {      
                userData: [],    
                addUserDialog: false,
                deleteUserDialog: false,
                editPasswordDialog: false,

                // 添加用户     
                userForm: {
                    username: '',
                    realName: '',
                    password: '',
                    repeatPassword: '',
                    isAdmin: '是'
                },
                userRules: {
                    username: [
                        { required: true, message: '用户名不能为空', max: 32},
                    ],
                    realName: [
                        { required: true, message: '真实姓名不能为空', max: 32},
                    ],
                    password: [
                        { required: true, message: '密码不能为空', min: 6, max: 32},
                    ],
                    repeatPassword: [
                        { required: true, message: '重复不能为空', min: 6, max: 32},
                    ],
                    isAdmin: [
                        { required: true, message: '请选择是否是管理员'},
                    ],
                },

                // 修改密码
                passwordForm: {
                    oldPassword: '',
                    newPassword: '',
                    repeatPassword: '',
                },
                passwordRules: {
                    oldPassword: [
                        { required: true, message: '请输入旧密码', max: 32},
                    ],
                    newPassword: [
                        { required: true, message: '请输入新密码', max: 32},
                    ],
                    repeatPassword: [
                        { required: true, message: '请输入重复新密码', max: 32},
                    ],
                },
                currentUser: {},
            }
        },

        mounted(){
            this.getUserList();
        },

        methods:{
            
            // 获取用户列表
            getUserList(){
                const that = this;

                $.ajax({
                    url: '/web/getUserList',
                    type: 'post',
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    success: function(res){
                        if(res.status === 0){
                            that.userData = res.data.list;
                        }
                        else if(res.status === 10001){
                            that.$router.push({path: '/login'});
                        }
                        else{
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    },
                    error: function(err){
                        that.$notify.error({
                            title: '错误',
                            message: err
                        });
                    }
                })
            },

            // 添加用户
            sendAddUser(formName){
                const that = this;

                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        if(that.userForm.password !== that.userForm.repeatPassword){
                            that.$notify.error({
                                title: '错误',
                                message: '两次密码不一致'
                            });
                            return false;
                        }

                        let adminText = that.userForm.isAdmin === '是' ? true : false;
                        let params = {
                            username: that.userForm.username,
                            realName: that.userForm.realName,
                            password: that.userForm.password,
                            repeatPassword: that.userForm.repeatPassword,
                            isAdmin: adminText
                        }

                        $.ajax({
                            url: '/web/createUser',
                            type: 'post',
                            dataType: 'json',
                            data: JSON.stringify(params),
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            success: function(res){
                                if(res.status === 0){
                                    that.$notify.success({
                                        title: '成功',
                                        message: res.message
                                    });
                                    
                                    that.getUserList();
                                    that.$refs[formName].resetFields();
                                    that.addUserDialog = false;
                                }
                                else{
                                    that.$notify.error({
                                        title: '错误',
                                        message: res.message
                                    });
                                }
                            },
                            error: function(err){
                                that.$notify.error({
                                    title: '错误',
                                    message: err
                                });
                            }
                        })
                    } 
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });                
            },

            // 修改密码 
            openEditPassword(row){
                this.currentUser = row;
                this.editPasswordDialog = true;
            },

            sendEditPassword(formName){
                const that = this;

                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        if(that.passwordForm.oldPassword === that.passwordForm.newPassword){
                            that.$notify.error({
                                title: '错误',
                                message: '新密码不能与旧密码相同'
                            });
                            return false;
                        }

                        if(that.passwordForm.newPassword !== that.passwordForm.repeatPassword){
                            that.$notify.error({
                                title: '错误',
                                message: '两次输入密码不相同'
                            });
                            return false;
                        }

                        let adminText = that.userForm.isAdmin === '是' ? true : false;
                        let params = {
                            	username: that.currentUser.username,
                                oldPassword: that.passwordForm.oldPassword,
                                newPassword: that.passwordForm.newPassword
                        }

                        $.ajax({
                            url: '/web/revisePassword',
                            type: 'post',
                            dataType: 'json',
                            data: JSON.stringify(params),
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            success: function(res){
                                if(res.status === 0){
                                    that.$notify.success({
                                        title: '成功',
                                        message: res.message
                                    });
                                    
                                    that.getUserList();
                                    that.$refs[formName].resetFields();
                                    that.editPasswordDialog = false;
                                }
                                else{
                                    that.$notify.error({
                                        title: '错误',
                                        message: res.message
                                    });
                                }
                            },
                            error: function(err){
                                that.$notify.error({
                                    title: '错误',
                                    message: err
                                });
                            }
                        })
                    } 
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });   
            },

            // 删除用户
            openDeleteUser(row){
                this.currentUser = row;
                this.deleteUserDialog = true;
            },

            sendDeleteUser(){
                const that = this;

                let params = {
                    id: that.currentUser._id,
                    username: that.currentUser.username
                }

                $.ajax({
                    url: '/web/removeUser',
                    type: 'post',
                    dataType: 'json',
                    data: JSON.stringify(params),
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    success: function(res){
                        if(res.status === 0){
                            that.$notify.success({
                                title: '成功',
                                message: res.message
                            });
                            
                            that.getUserList();
                            that.deleteUserDialog = false;
                        }
                        else{
                            that.$notify.error({
                                title: '错误',
                                message: res.message
                            });
                        }
                    },
                    error: function(err){
                        that.$notify.error({
                            title: '错误',
                            message: err
                        });
                    }
                })
            }

        }
    }

</script>

<style scoped>
    .user-head{ text-align: right; margin: 20px 10px}
    .w80{ width: 80%; margin: 0 auto; }
</style>