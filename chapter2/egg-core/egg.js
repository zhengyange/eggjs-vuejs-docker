const { resolve, join, parse } = require('path');
const globby = require('globby');

module.exports = app => {
  const AppPath = resolve(__dirname, 'app');
  const context = app['context'];
  
  // 方法一
  const fileAbsolutePath = ['config', 'middleware', 'service'].reduce(
    (folderMap, v) => ((folderMap[v] = join(AppPath, v)), folderMap),
    {}
  )

  Object.keys(fileAbsolutePath).forEach(v => {
    const path = fileAbsolutePath[v];       // 对应的路径
    const prop = v;   // 挂载到ctx上面的key
    const files = globby.sync('**/*.js', {
      cwd: path
    });
    if(prop != 'middleware') {
      context[prop] = {}; // 初始化对象
    }

    files.forEach(file => {
      const filename = parse(file).name;    // 文件的名字作为key挂载到子对象上面
      const content = require(join(path, file));  // 导入内容
      // middleware 处理逻辑
      if(prop == 'middleware') {
        if(filename in context['config']) {
          // 先传递配置荐
          const plugin = content(context['config'][filename]);
          app.use(plugin);  // 加载中间件
        }
        return;
      }
      // 配置文件处理
      if(prop == 'config' && content) {
        context[prop] = Object.assign({}, context[prop], content);
        return;
      }

      context[prop][filename] = content;  // 挂载service
    })
  })
}