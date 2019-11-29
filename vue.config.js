module.exports = {
  //   css: {
  //     loaderOptions: {
  //       css: {
  //         // 这里的选项会传递给 css-loader
  //       },
  //       postcss: {
  //         // 这里的选项会传递给 postcss-loader
  //         // data: `@import "./src/lib/px2rem.scss"`
  //         data: `@import "./src/assets/style/main.scss"`
  //       }
  //     }
  //   }
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8889',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // bug ， 这里的意思是，把/api替换成/mock/19982/api，我那边地址是两个api，所以报错404
          '^/api': '/api',
          '^/server': '/server'
        }
      }
      // '/zepeng': {
      //   target: 'http://yapi.demo.qunar.com',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/zepeng': 'mock/19982/'
      //   }
      // }
    }
  }
  // dev: {
  //   host: '192.168.2.128' // 原为: hotst: 'localhost'
  // }
};
