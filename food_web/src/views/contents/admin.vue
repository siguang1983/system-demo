<template>
    <div class="admin">
        <HeaderAdmin></HeaderAdmin>

        <div class="body-amdin">
            <div class="body-left">
                <MenuAdmin></MenuAdmin>
            </div>
            <div class="body-right">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    
    import HeaderAdmin from './header.vue'
    import MenuAdmin from './menu.vue'

    export default {
        components: {
            HeaderAdmin,
            MenuAdmin
        }
    }

</script>

<style>
    .scroll-y { width: 90%; overflow-y: auto; position: relative; padding: 10px 5% 30px; }
</style>

<style scoped>
    .admin{ height: 100%;}
    .body-amdin { height: calc(100% - 50px); }
    .body-left { float: left; width: 200px; height: 100%; overflow-y: auto; background-color: #48576a; }
    .body-right{ width: auto; height: 100%; overflow-y: auto;}
</style>