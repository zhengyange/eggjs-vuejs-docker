function compose(middleware) {
  return function(context, next) {
    // last called middleware
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if(i <= index) return Promise.reject(new Error('next() called multiple times'));
      index = i;
      let fn = middleware[i];
      if(i === middleware.length) fn = next;
      if(!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, function next() {
          return dispatch(i + 1);
        }))
      } catch (err) {
        return Promise.reject(err);
      }
    }
  }
}

// 测试
async function a(ctx, next) {
  console.log(1);
  const hello = await Promise.resolve('Hello node.js');
  console.log(hello);
  await next();
  console.log('a end');
}

async function b(ctx, next) {
  console.log(2);
  const hello = await Promise.resolve('Hello node.js');
  console.log(hello);
  await next();
  console.log('b end');
}

compose([a, b])({});