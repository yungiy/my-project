const Router = require('koa-router');
const api = new Router();
const bodyParser = require('koa-bodyparser');

api.get('./text', (ctx) => {
	ctx.body = 'test 성공';
});

//라우터 모듈화
module.exports = api;
