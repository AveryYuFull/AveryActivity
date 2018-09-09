'use strict'
const fs = require('fs')
const child = require('child_process')
const path = require('path')
// const myutil = require('./myutil')

process.chdir(path.join(__dirname, '..'))

// require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.env.proxyTable

const app = express()
const compiler = webpack(webpackConfig)

const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true,
  https: true
})

const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})

// myutil.copyLib()

// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// proxy api requests
// Object.keys(proxyTable).forEach(function (context) {
//   const options = proxyTable[context]
//   if (typeof options === 'string') {
//     options = { target: options }
//   }

//   app.use(proxyMiddleware(options.filter || context, options))
// })
// proxy api requests
proxyTable.children && Object.keys(proxyTable.children).forEach(function (context) {
    var options = proxyTable.children[context]
    if (typeof options === 'string') {
      options = { target: options }
    }
    console.log(context, options)
    app.use(context, proxyMiddleware(options))
})

app.use(proxyMiddleware(proxyTable.filter, proxyTable))
app.use(proxyMiddleware(proxyTable.filter, proxyTable))



// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')({
  // logger: console.log.bind(console),
  rewrites: [
    {
      from: /^\/pages\/.*\.html$/,
      to: function(context) {
        return '/index.html'
      }
    }
  ]
}))

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
