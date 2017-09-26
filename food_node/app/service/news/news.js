/*
* auth: siguang
* date: 2017/01/16
* 新闻 - service
*/
'use strict'

module.exports = app => {
    class NewsService extends app.Controller{

        /******* Get新闻列表和内容 *******/ 
        // 获取新闻列表
        async getNewsAll(){
            let doc = await app.model.News.find({}, {_id: '', newsTitle: '', createAt: '', updateAt: ''});
            await this.printLog('', doc)

            return app.renderBody({
                data: {
                    list: doc
                },
                message: '获取成功',
                statusType: app.statusType.success
            })
        }

        // 通过_id获取内容
        async getNewsContent(params){
            let doc = await app.model.News.findOne({_id: params.id});

            let newDoc = doc.toObject();
            newDoc.createdAt = app.dateFormat(new Date(newDoc.createdAt).getTime(), 'yyyy-MM-dd hh:mm:ss')
            newDoc.updatedAt = app.dateFormat(new Date(newDoc.updatedAt).getTime(), 'yyyy-MM-dd hh:mm:ss')

            this.printLog(params, newDoc);
            return app.renderBody({
                data: newDoc,
                message: '获取成功',
                statusType: app.statusType.success
            })           
        }


        /******* Post新闻列表和内容 *******/ 
        // 获取新闻列表
        async postNewsAll(){
            let doc = await app.model.News.find({});

            await this.printLog('新闻列表-------', doc)
            return app.renderBody({
                data: {
                    list: doc
                },
                message: '获取成功',
                statusType: app.statusType.success
            })
        }

        // 通过_id获取内容
        async postNewsContent(params){
            let doc = await app.model.News.findOne({_id: params.id});

            let newDoc = doc.toObject();
            newDoc.createdAt = app.dateFormat(new Date(newDoc.createdAt).getTime(), 'yyyy-MM-dd hh:mm:ss')
            newDoc.updatedAt = app.dateFormat(new Date(newDoc.updatedAt).getTime(), 'yyyy-MM-dd hh:mm:ss')

            this.printLog(params, newDoc);
            return app.renderBody({
                data: newDoc,
                message: '获取成功',
                statusType: app.statusType.success
            })
        }


        // 添加新闻
        async addNews(params){
            let doc = new app.model.News({
                newsTitle: params.newsTitle,
                newsContent: params.newsContent
            })
            await doc.save();

            await this.printLog(params, doc)

            return app.renderBody({
                data: {},
                message: '添加成功',
                statusType: app.statusType.success
            })
        }

        // 修改新闻
        async editNews(params){
            let doc = await app.model.News.findOne({_id: params.id});
            if(doc){

                console.log(`Doc ========== ${doc}`)
                doc['_id'] = doc.id;
                doc.newsTitle = params.newsTitle;
                doc.newsContent = params.newsContent;

                await doc.save();
                return app.renderBody({
                    message: '修改成功',
                    statusType: app.statusType.success
                })
            }
            else{
                return app.renderBody({
                    statusType: app.statusType.error,
                    message: doc
                })
            }

            await this.printLog(params, doc)
        }

        // 删除新闻
        async removeNews(params){
            let doc = await app.model.News.remove({_id: params.id});

            console.log(`-----${doc}`)
            return app.renderBody({
                message: '修改成功',
                statusType: app.statusType.success
            })
            
            await this.printLog(params, doc)
        }

        // log
        async printLog(params, doc){
            console.log(`---------------------Request----------------------`);
            console.log(`${JSON.stringify(params)}`);
            console.log(`--------------------Response-----------------------`);
            console.log(`${JSON.stringify(doc)}`);
        }
    }

    return NewsService;
}