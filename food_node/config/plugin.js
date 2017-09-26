'use strict';

// had enabled by egg
// exports.static = true;
exports.mongoose = {
    enable: true,
    package: 'egg-mongoose',
};

exports.validate = {
    package: 'egg-validate',
};


// 后端模板
exports.nunjucks = {
    enable: true,
    package: 'egg-view-nunjucks',
};
  
// exports.ejs = {
//     enable: true,
//     package: 'egg-view-ejs',
// };

exports.session = true; 