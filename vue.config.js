module.exports = {
    outputDir: 'dist',
    publicPath:'./',
    assetsDir:'static',
    devServer: {
        open: true, //浏览器自动打开页面
        host: "0.0.0.0", //本地服务器访问的路径
        port: 8001, //本地服务器访问的端口
        proxy: {
            '/api': {
                //你要跨域的域名(包含host、端口号,切记：一定要带上http头);
                //同一个域名只能设置一次跨域，否则重复报错！
                target: 'http://218.104.146.37:9000/ucc?AppID=XXDL_WLWPT&Password=XXDL_WLWPT2557013&Pagename=front_interface&return=true&', 
                ws: true,
                changeOrigin: true, //是否跨域，设置为true;(必须)
                pathRewrite: {
                    '^/api': ''
                  }
            },
            '/message': {
              target: 'http://113.247.223.6:23834', 
              ws: true,
              changeOrigin: true, 
              pathRewrite: {
                  '^/message': ''
              }
          },
        }
    },
    css: {
        loaderOptions: {
          css: {},
          postcss: {
            plugins: [
              require('postcss-px2rem')({
                remUnit: 144
              })
            ]
          }
        }
      }
};
