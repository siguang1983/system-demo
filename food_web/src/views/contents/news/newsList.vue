<template>
    <div class="scroll-y">
        <div class="news-head">
            <el-button type="primary" @click="addNewsDialog = true">添加新闻</el-button>
        </div>

        <el-table :data="newsList" style="width: 100%">
            <el-table-column prop="newsTitle" label="新闻标题" width="400">
                <template scope="scope">
                    <router-link :to="scope.row.url">{{scope.row.newsTitle}}</router-link>
                </template>
            </el-table-column>
            <el-table-column prop="createdAt" label="创建日期" :formatter="createTimeFormat"></el-table-column>
            <el-table-column prop="updatedAt" label="修改日期" :formatter="updateTimeFormat"></el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button type="primary" size="small" @click="editNews(scope.row)">修改</el-button>
                    <el-button type="primary" size="small" @click="removeNews(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 添加新闻 -->
        <el-dialog title="添加新闻" v-model="addNewsDialog">
            <el-form :model="addNewsForm" :rules="addNewsRules" ref="addNewsForm" label-width="100px" class="w80">
                <el-form-item label="新闻标题" prop="newsTitle">
                    <el-input v-model="addNewsForm.newsTitle"></el-input>
                </el-form-item>
                <el-form-item label="新闻内容" prop="newsContent">
                    <el-input type="textarea" v-model="addNewsForm.newsContent" :rows="6"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addNewsDialog = false">取 消</el-button>
                <el-button type="primary" @click="sendAddNews('addNewsForm')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改新闻 -->
        <el-dialog title="修改新闻" v-model="editNewsDialog" size="large">
            <el-form :model="editNewsForm" :rules="editNewsRules" ref="editNewsForm" label-width="100px" class="w90">
                <el-form-item label="新闻标题" prop="newsTitle">
                    <el-input v-model="editNewsForm.newsTitle"></el-input>
                </el-form-item>
                <el-form-item label="新闻内容" prop="newsContent">
                    <el-input type="textarea" v-model="editNewsForm.newsContent" :rows="6"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editNewsDialog = false">取 消</el-button>
                <el-button type="primary" @click="sendEditNews('editNewsForm')">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 删除新闻 -->
        <el-dialog title="删除新闻" v-model="removeNewsDialog">
            <span>请确认是否删除新闻</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="removeNewsDialog = false">取 消</el-button>
                <el-button type="primary" @click="sendRemoveNews">确 定</el-button>
            </span>
        </el-dialog>
    </div>    
</template>

<script>

    import common from '../../../utils/common.js';
    import { Notification } from 'element-ui'

    export default {
        data(){
            return {
                newsList: [],

                addNewsDialog: false,
                addNewsForm: {                   
                    newsTitle: '',
                    newsContent: ''
                },
                addNewsRules:{
                    newsTitle: [
                        { required: true, message: '请输入新闻标题', trigger: 'blur' },
                        { max: 30, message: '标题文字不能超过30个', trigger: 'blur' }
                    ],
                    newsContent: [
                        { required: true, message: '请输入新闻内容', trigger: 'blur' },
                    ]
                },

                editNewsDialog: false,
                editNewsForm: {
                    newsId: '',
                    newsTitle: '',
                    newsContent: ''
                },
                editNewsRules:{
                    newsTitle: [
                        { required: true, message: '请输入新闻标题', trigger: 'blur' },
                        { max: 30, message: '标题文字不能超过30个', trigger: 'blur' }
                    ],
                    newsContent: [
                        { required: true, message: '请输入新闻内容', trigger: 'blur' },
                    ]
                },

                removeNewsDialog: false,
                deleteNewsId: '',
            }
        },

        mounted(){
            this.getNewsList();
        },

        methods:{
            getNewsList(){
                const that = this;

                $.ajax({
                    url: '/web/postNewsAll',
                    type: 'post',
                    data: {},
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    success: function(res){
                        if(res.status === 0){
                            that.newsList = [];
                            
                            that.newsList = res.data.list.map(function(news, idx, arr){
                                // 动态新闻详情页
                                // news['url'] = common.serverHost + '/web/getNewsContent?id='+ news._id;

                                // 静态页面
                                news['url'] = '/admin/newsContent/'+ news._id;
                                return news;
                            })
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

            // 添加新闻
            sendAddNews(formName){
                const that = this;

                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        const params = {
                            newsTitle: that.addNewsForm.newsTitle,
                            newsContent: that.addNewsForm.newsContent
                        }

                        $.ajax({
                            url: '/web/addNews',
                            type: 'post',
                            data: JSON.stringify(params),
                            dataType: 'json',
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            success: function(res){
                                if(res.status === 0){
                                    that.$notify.success({
                                        title: '成功',
                                        message: res.message
                                    });
                                    that.addNewsDialog = false;
                                    that.resetForm('addNewsForm');

                                    that.getNewsList();
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
                    } 
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 修改新闻
            editNews(row){
                this.editNewsForm.newsId = row['_id'];
                this.editNewsForm.newsTitle = row['newsTitle'];
                this.editNewsForm.newsContent = row['newsContent'];
                this.editNewsDialog = true;
            },

            sendEditNews(formName){
                const that = this;

                that.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.editNewsForm.newsId == ''){
                            that.$notify.error({
                                title: '错误',
                                message: '新闻id未获取到'
                            });
                        }

                        const params = {
                            id: that.editNewsForm.newsId,
                            newsTitle: that.editNewsForm.newsTitle,
                            newsContent: that.editNewsForm.newsContent,
                        }

                        $.ajax({
                            url: '/web/editNews',
                            type: 'post',
                            data: JSON.stringify(params),
                            dataType: 'json',
                            headers: {
                                'Content-Type': 'application/json;charset=UTF-8'
                            },
                            success: function(res){
                                if(res.status === 0){
                                    that.$notify.success({
                                        title: '成功',
                                        message: res.message
                                    });
                                    that.editNewsDialog = false;
                                    that.resetForm('editNewsForm');
                                    that.getNewsList();
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
                    } 
                    else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },

            // 删除新闻
            removeNews(row){
                this.deleteNewsId = row['_id'];
                this.removeNewsDialog = true;
            },

            sendRemoveNews(){
                const that = this;
                const params = {
                    id: that.deleteNewsId
                }

                $.ajax({
                    url: '/web/removeNews',
                    type: 'post',
                    data: JSON.stringify(params),
                    dataType: 'json',
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    success: function(res){
                        if(res.status === 0){
                            that.$notify.success({
                                title: '成功',
                                message: res.message
                            });
                            that.removeNewsDialog = false;

                            that.getNewsList();
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


            resetForm(formName) {
                this.$refs[formName].resetFields();
            },

            createTimeFormat(row){
                return common.dateFormat(new Date(row.createdAt).getTime(), 'yyyy-MM-dd hh:mm:ss')
            },

            updateTimeFormat(row){
                return common.dateFormat(new Date(row.updatedAt).getTime(), 'yyyy-MM-dd hh:mm:ss')
            }
        }
    }

</script>


<style lang="" scoped>
    .news-list-box { width: 90%; margin: 0 auto; }
    .news-head { padding: 20px 0; text-align: right;}
    .news-list li { line-height: 28px;}
    .w90 { width: 90%; margin: 0 auto}
    .w80 { width: 80%; margin: 0 auto}
</style> 