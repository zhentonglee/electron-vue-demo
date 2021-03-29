const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  chainWebpack: config => {
    // eslint-loader配置
    config.module
      .rule('eslint')
      .use('eslint-loader')
      .loader('eslint-loader')
      .tap(options => {
        options.formatter = require('eslint-friendly-formatter')
        options.emitWarning = false
        options.fix = true
        return options
      })
    config.resolve.alias
      .set('@', resolve('src'))
  },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      chainWebpackMainProcess: config => {
        config.resolve.alias
          .set('@', resolve('src'))
      },
      builderOptions: {
        productName: 'PxxCourseware',
        appId: 'com.zzpxx.courseware',
        dmg: {
          contents: [
            {
              x: 410,
              y: 150,
              type: 'link',
              path: '/Applications'
            },
            {
              x: 130,
              y: 150,
              type: 'file'
            }
          ]
        },
        mac: {
          icon: 'public/icon.icns',
          extendInfo: {
            LSUIElement: 1
          }
        },
        win: {
          icon: 'public/icon.ico',
          target: 'nsis'
        },
        nsis: {
          shortcutName: 'PxxCourseware',
          oneClick: false,
          allowToChangeInstallationDirectory: true
        }
      }
    }
  }
}
