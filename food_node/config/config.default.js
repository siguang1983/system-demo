'use strict';

const path = require('path');

module.exports = appInfo => {
	// console.log(`appInfo ======  ${appInfo.baseDir}`)
	// console.log(`appInfo ======  ${JSON.stringify(appInfo)}`)

	const config = {
		keys: appInfo.name,
		security: {
			csrf: {
				enable: false,
				// 放过所有 content-type 为 `application/json` 的请求
				// ignoreJSON: true,
			},
		},
		bodyParser: {
			jsonLimit: '1mb',
			formLimit: '100mb',
		},
		mongoose: {
			url: 'mongodb://127.0.0.1:27017/food_node_database',
			options: {
				// db: { native_parser: true },
				// server: { poolSize: 5 },
				// user: 'core',
				// pass: 'we123',
			},
		},

		view: {
			defaultViewEngine: 'nunjucks',
			mapping: {
				'.tpl': 'nunjucks',
				'.nj': 'nunjucks',
				// '.ejs': 'ejs',
			},
		},
		
		session: {
			key: 'SESSIONID',
			maxAge: 24 * 3600 * 1000, // 1 天
			httpOnly: true,
			encrypt: true,
		},

		middleware: [],
	};

	return config;
};
