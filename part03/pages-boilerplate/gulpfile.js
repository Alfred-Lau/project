// 实现这个项目的构建任务

/* 

需要支持的命令
    "clean": "gulp clean",
    "lint": "gulp lint",
    "serve": "gulp serve",
    "build": "gulp build",
    "start": "gulp start",
    "deploy": "gulp deploy --production"

*/

const { src, dest } = require("gulp");
const cleanTask = require("gulp-clean");
const bs = require("browser-sync").create();

/**
 *清除打包构建产物
 *
 * @return {*}
 */
const clean = () => {
  return src("dist", { allowEmpty: true }).pipe(cleanTask());
};

/**
 *构建静态资源
 *
 */
const compile = () => {};

/**
 *启动开发服务
 *
 * @return {*}
 */
const serve = () => {
  return bs.init({
    server: {
      baseDir: "dist",
    },
  });
};

module.exports = { clean, serve };
