import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'login',
			meta: {
				requiresAuth: true
			},
			redirect(){
				return '/login'
			}
		},
		{
			path: '/login',
			name: 'login',
			meta: {
				requiresAuth: false
			},
			component: (resolve) => require(['../views/contents/login.vue'], resolve)
		},
		{
			path: '/admin',
			component: (resolve) => require(['../views/contents/admin.vue'], resolve),
			children: [
				{
					path: '',
					name: 'home',
					meta: {
						requiresAuth: true
					},
					component: (resolve) => require(['../views/contents/home.vue'], resolve)
				},	
				{
					path: 'userManage',
					name: 'userManage',
					meta: {
						requiresAuth: true
					},
					component: (resolve) => require(['../views/contents/userManage/userManage.vue'], resolve)
				},

				// 新闻
				{
					path: 'newsList',
					name: 'newsList',
					meta: {
						requiresAuth: true
					},
					component: (resolve) => require(['../views/contents/news/newsList.vue'], resolve)
				},
				{
					path: 'newsContent/:id',
					name: 'newsContent',
					meta: {
						requiresAuth: true
					},
					component: (resolve) => require(['../views/contents/news/newsContent.vue'], resolve)
				}
			]
		},		
		{
			path: '*',
			name: '404',
			component: (resolve) => require(['../views/contents/404.vue'], resolve)
		}
	]
})
