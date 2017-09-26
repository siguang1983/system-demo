<template>
    <div class="header">
        <div class="left">
            <span class="ml-20">{{userName}}</span>
            <span class="ml-10">{{realName}}</span>
        </div>

        <div class="right">
            <span class="mr-20" @click="openLogout">退出</span>
        </div>

        <el-dialog title="退出" v-model="logoutDialog" size="tiny">
            <div class="center">确认是否退出登录</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="logoutDialog = false">取 消</el-button>
                <el-button type="primary" @click="sendLogout">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

    import common from '../../utils/common';

    export default {
        data(){
            return{
                userName: '',
                realName: '',
                logoutDialog: false
            }
        },

        mounted(){
            let user = common.getStorage('user');
            let {username, realName} = JSON.parse(user);
            this.userName = username;
            this.realName = realName;
        },

        methods: {
            openLogout(){
                this.logoutDialog = true;
            },

            sendLogout(){
                const remove = common.removeStorage('user');
                this.$router.push({path: '/login'});
            }
        }
    }

</script>

<style scoped>
    .header{ height: 50px; background: #1f2d3d; color: #fff; line-height: 50px; }
    .center { text-ailgn: center;}
    .left { float: left; }
    .right { float: right; }
    .ml-10 { margin-left: 10px; }
    .ml-20 { margin-left: 20px; }
    .mr-20 { margin-right: 20px; }
</style>