<template>
    <div class="news-content">
        <div class="back-newslist">
             <router-link to="/admin/newsList">进入新闻列表</router-link>
        </div>

        <h1 class="news-title">{{newsTitle}}</h1>
        <div class="news-date">
            <span>创建日期: {{createTime}}</span>
            <span>修改日期: {{editTime}}</span>
        </div>
        <div class="news-text" v-html="newsContent">
        </div>
    </div>
</template>

<script>

    import common from '../../../utils/common.js';

    export default {
        data(){
            return {
                newsTitle: '',
                newsContent: '',
                createTime: '',
                editTime: '',
                newsId: ''
            }
        },

        mounted(){
            const paramId = this.$route.params.id;
            if(!paramId){
                this.router.push('/home');
                return false;
            }
            this.newsId = paramId;
            this.getNewsContent();
        },

        methods:{
            getNewsContent(){
                const that = this;

                $.ajax({
                    url: '/web/getNewsContent',
                    type: 'post',
                    data: JSON.stringify({"id": that.newsId}),
                    dataType: 'json',
                    contentType: 'application/json',
                    success: function(res){
                        if(res.status === 0){
                            that.newsTitle = res.data.newsTitle;
                            that.newsContent = res.data.newsContent;
                            that.createTime = common.dateFormat(new Date(res.data.createdAt).getTime(), 'yyyy-MM-dd hh:mm:ss');
                            that.editTime = common.dateFormat(new Date(res.data.updatedAt).getTime(), 'yyyy-MM-dd hh:mm:ss');
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
    .news-content { width: 90%; margin: 0 auto; }
    .news-title { color: #007b43; text-align: center;}
    .news-date {padding: 20px 0; color: #868585; text-align: center; }
    .news-date span { margin: 0 20px;}
    .news-text { line-height: 26px; }
    .news-text p {text-indent: 2em}
    .back-newslist {padding: 20px 0; text-align: right; }
</style>