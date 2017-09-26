<template>
    <div class="login-container">
        <div class="login-box">
            <h1 class="login-title">登录</h1>
            <el-form :model="loginForm" ref="loginForm" :rules="loginRule" label-width="80px" class="login-form">
                <el-form-item prop="username" label="用户名">
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item prop="password" label="密码">
                    <el-input type="password" v-model="loginForm.password"></el-input>
                </el-form-item>
                <el-form-item class="center">
                    <el-button type="primary" @click="login('loginForm')">提交</el-button>
                    <el-button @click="resetForm('loginForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>

    import { Notification } from 'element-ui'
    import common from '../../utils/common.js'

    export default {
        data(){
            return {
                loginForm: {
                    username: '',
                    password: ''
                },

                loginRule:{
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 16, message: '长度在 3 到 16 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 32, message: '长度在 6 到 32 个字符', trigger: 'blur' }
                    ]                         
                }
            }
        },

        methods:{
            login(formName){
                const that = this;
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let param = {
                            "username": that.loginForm.username,
                            "password": that.loginForm.password
                        }

                        $.ajax({
                            url: '/web/login',
                            type: 'post',
                            data: JSON.stringify(param),
                            dataType: 'json',
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            success: (res) => {
                                if(res.status === 0){
                                    common.saveUser(res.data);
                                    that.$router.push({path: '/admin'});
                                }
                                else{
                                    that.$notify.error({
                                        title: '错误',
                                        message: res.message
                                    });
                                }
                            },
                            error: (err) => {
                                that.$notify.error({
                                    title: '错误',
                                    message: err
                                });
                            }
                        })
                    }
                    else{

                    }
                });
            },

            resetForm(formName){
                this.$refs[formName].resetFields();
            }
        }
    }

</script>

<style scoped>
    .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        width: 100%;
        position: absolute;
    }

    .login-box { width: 500px; height: 320px; border: 1px #ccc solid; background-color: #fff; box-shadow: 0px 0px 50px #dadada; padding: 10px; }
    .login-title { font-size: 18px; text-align: center; height: 50px;}
    .login-form{ width: 80%; margin: 20px auto;}
    .center { text-align: center;}
</style>