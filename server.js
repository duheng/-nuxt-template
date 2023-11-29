
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { createProxyMiddleware } = require('http-proxy-middleware');
const koaConnect = require('koa2-connect');

const path = require('path');
const app = new Koa();
const env = process.env.NODE_ENV || 'development'
const router = require('./backend/routes/index')

app
  .use(router.routes())
  .use(router.allowedMethods())
  .use(async (ctx, next) => {
    if(ctx.path.startsWith('/api')) {
      ctx.status = 403; // 设置状态码为无权限
      ctx.body = 'You do not have permission to access this resource.';
      return
    }
    await next()
  })

// 设置代理到 Vue3 开发服务器
if(env == 'development') {
  app.use(
    koaConnect(
      createProxyMiddleware({
        target: 'http://localhost:9000', // 其他服务器的地址
        changeOrigin: true,
        ws: true, // 启用 websocket 代理
        pathRewrite: {
          '^/': '/', // 可选的路径重写
        },
        onError: (err, req, res) => {
          console.error(err);
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end('Something went wrong. And we are reporting a custom error message.');
        },
      })
    )
  );
} else {
  // 静态资源中间件，指定静态文件目录
  app.use(require('koa-static')(path.join(__dirname,'front/dist')));
  // 处理页面返回
  app.use(async (ctx) => {
      // 你可能需要根据请求路径返回对应的页面
      // 在这个示例中，所有请求都返回 index.html，让 Vue Router 处理路由
      ctx.type = 'html';
      ctx.body = require('fs').createReadStream(path.join(__dirname, 'front/dist/index.html'));
  });

}


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});