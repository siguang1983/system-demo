'use strict';

module.exports = app => {

	// 验证是否登录中间件
	const checkAuth = app.middleware.checkAuth();

	app.get('/', 'home.index');
	app.post('/web/login', 'user.user.login');
	
	// 用户
	app.post('/web/getUserList', checkAuth, 'user.user.getUserList');			// 获取用户列表
	app.post('/web/createUser', checkAuth, 'user.user.createUser');				// 创建用户
	app.post('/web/removeUser', checkAuth, 'user.user.removeUser');				// 删除用户
	app.post('/web/editUser', checkAuth, 'user.user.editUser');					// 编辑用户
	app.post('/web/revisePassword', checkAuth, 'user.user.revisePassword');		// 修改密码


	// 新闻
	app.get('/web/getNewsAll', 'news.news.getNewsAll');
	app.get('/web/getNewsContent', 'news.news.getNewsContent');
	app.post('/web/postNewsAll', checkAuth, 'news.news.postNewsAll');
	app.post('/web/postNewsContent', checkAuth, 'news.news.postNewsContent');
	app.post('/web/addNews', checkAuth, 'news.news.addNews');
	app.post('/web/editNews', checkAuth, 'news.news.editNews');
	app.post('/web/removeNews', checkAuth, 'news.news.removeNews');
};
