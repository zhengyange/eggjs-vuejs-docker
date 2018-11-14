module.exports = ({ key }, app) => async (ctx, next) => {
  ctx.session[key] = ctx.session[key] || {};
  const flash = ctx.session[key];
  ctx.session[key] = {};

  function set(msg) {
    ctx.session[key] = msg;
  }

  const get = () => flash;

  Object.defineProperty(ctx, 'flash', {
    set,
    get,
    enumerable: true
  });

  ctx.request.flash = (type, msg) => {
    ctx.flash = { type, message: msg };
  }

  ;['success', 'error', 'info', 'warning'].forEach(type => {
    ctx['flash' + type] = msg => (ctx.flash = { type, message: msg });
  })

  if(ctx.status === 302 && ctx.session && !ctx.session[key]) {
    ctx.session[key] = flash;
  }
}