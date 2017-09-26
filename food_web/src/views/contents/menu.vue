<template>
    <el-menu default-active="activeMenu" class="el-menu-vertical-demo" theme="dark" @select="handleSelect">

        <template v-for="group in menuList">
            <template v-if="!group.items">
                <el-menu-item :index="group.index">   
                    <i :class="group.icon || 'el-icon-message'"></i> {{group.groupName}}
                </el-menu-item>
            </template>
            
            <template v-else>
                <el-submenu :index="group.index">
                    <template slot="title"><i :class="group.icon || 'el-icon-message'"></i> {{group.groupName}}</template>
                    <el-menu-item :index="submenu.index" v-for="submenu in group.items" :key="submenu.index">
                        <i :class="submenu.icon || 'el-icon-message'"></i> {{submenu.menuName}}
                    </el-menu-item>
                </el-submenu>
            </template>         

        </template>
    </el-menu>
</template>

<script>

    export default {
        data(){

            const menu = [
                {
                    groupName: '首页',
                    index: '',
                    icon: 'fa fa-home'
                },
                {
                    groupName: '用户系统',
                    index: 'userManage',
                    icon: 'fa fa-user-circle',
                    items: [
                        {
                            menuName: "用户列表",
                            index: 'userManage',
                            icon: 'fa fa-align-center',
                        }
                    ]
                },
                {
                    groupName: '新闻系统',
                    index: 'newsSystem',
                    icon: 'fa fa-newspaper-o',
                    items: [
                        {
                            menuName: "新闻列表",
                            index: 'newsList',
                            icon: 'fa fa-list-ul',
                        }
                    ]
                },
            ]

            return {
                menuList: menu,
                activeMenu: 'home'
            }
        },

        methods:{
            handleSelect(key, keyPath){
                this.$router.push({path: `/admin/${key}`})
            }
        }   
    }

</script>

<style scoped>
    .el-menu { border-radius: 0!important; height: 100%;}
    .menu-box { font-size: 12px!important;}
    .border-bom { border-bottom: 1px #000 solid; }
</style>