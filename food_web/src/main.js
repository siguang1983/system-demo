// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/font-awesome.css'

Vue.config.productionTip = false;
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI);

import common from './utils/common.js'

// 路由钩子
router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		if (!common.loggedIn()) {
			next({
				path: '/login',
				// query: {redirect: to.fullPath},
			});
		} 
		else {
			next();
		}
	} else {
		next();
	}
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
