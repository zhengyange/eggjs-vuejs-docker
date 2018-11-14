const koa = require('koa');
const init = require('./egg');

const app = new koa();

init(app);

app.use(async (ctx, next) => {
  console.log(ctx.service);
  console.log(ctx.config);
  ctx.type = 'application/json';
  ctx.body = ctx.service.user.getUser();
});

app.listen(3000);