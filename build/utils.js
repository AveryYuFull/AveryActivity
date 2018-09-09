'use strict'
const path  = require('path')
const fs    = require('fs')
const _     = require('lodash')

const shell = require('shelljs')

const ExtractTextPlugin = require('extract-text-webpack-plugin')

// const minimist= require('minimist')

// const evnOptions = {
//     string: 'env',
//     default: {
//         host: process.env.NODE_ENV || '',
//         env: process.env.NODE_ENV || '',
//         environments: process.env.NODE_ENV || ''
//     }
// };
const configParam = require('./commander')().data;

// const configParam = minimist(process.argv.slice(2), evnOptions);
function resolve(dir) {
  return path.join(__dirname, '..', dir)
}
/**
* 获取环境变量名
*
* @returns {string}
*/
exports.getEvnFileName = getEvnFileName;
function getEvnFileName(){
let res = 'env';
if(configParam && configParam.env !== 'dev' && configParam.env !== 'development'){
    res = res + '.' + configParam.env;
} else {
  res = res + '.dev';
}

console.log(res)
return res;
}

/**
* 获取环境变量文件路径
*
* @returns {string}
*/
exports.getEvnFilePath = function(){
  return resolve('src/configs/env/' + getEvnFileName());
}

exports.assetsPath = function (_path) {


  const config = require('../config')
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : (process.env.NODE_ENV === 'wxdev' ? config.wxdev.assetsSubDirectory : config.dev.assetsSubDirectory)
    return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.NODE_ENV === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders(loader, loaderOptions) {
    const loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)
  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

/**
 * declare the log info action
 */
module.exports.log = function (info, spinner) {

  if (!info.state) {
    spinner.fail(info.message)
    process.exit();
  }
  else if (info.warning)
    spinner.warn(info.message)
  else
    spinner.succeed(info.message)
}

/**
 * declare the log info action
 */
module.exports.assign = function (target, commander, spinner) {

  let json
  try {
    json = commander.data.config[commander.data.type]

    target = target[commander.data.env]
  }
  catch (e) {
    spinner.fail(`file  json  error : ' ${e} ' !`)
    process.exit()
  }

  spinner.succeed(`local setting load successfully !`)

  return _.merge(target, json)
}

/**
 * declare the backup action
 */
module.exports.checkVersion = function (maxVersion) {

  let version = 0,
      distTemp = path.resolve(process.cwd(), './dist'),
      distTempBack = path.resolve(process.cwd(), './deployBack'),
      assetsPath = path.resolve(process.cwd(), './deploy')

  /* check laset version */
  do { }
  while (fs.existsSync(distTempBack + `/${++version}`) && version <= maxVersion)

  /* create the version and copy*/
  let cat = distTempBack + `/${version}`

  shell.mkdir('-p', cat)
  shell.cp('-R', `${distTemp}/*`, cat)

  !fs.existsSync(assetsPath) && shell.mkdir('-p', assetsPath)
  shell.cp('-R', `${distTemp}/*`, assetsPath)

  /* over max version */
  if (version > maxVersion) {

    shell.rm('-rf', assetsPath)
    shell.rm('-rf', `${distTempBack}/1`)
    shell.mkdir('-p', assetsPath)

    version = 2

    do {
      shell.cp('-R', `${distTempBack}/${version}/*`, assetsPath)
      shell.mv(`${distTempBack}/${version}`, `${distTempBack}/${version - 1}`)
    }
    while (fs.existsSync(distTempBack + `/${++version}`) && version <= maxVersion + 1)

  }
}
