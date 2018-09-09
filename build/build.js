#!/usr/bin/env node
'use strict'

/* system import */
const chalk = require('chalk')
const child = require('child_process')
const fs = require('fs')
const opn = require('opn')
const path = require('path')
const rm = require('rimraf')
const shell = require('shelljs')
const webpack = require('webpack')
const _ = require('lodash')
const spinner = require('ora')('building start ...').start()

/* business import */
const config = require('../config')
const utils = require('./utils')
const commander = require('./commander')()

/* business start */

/* tips for shell commander */
utils.log(commander, spinner)

/* const setting */
const buildConfig = utils.assign(config, commander, spinner)

/* local basic setting */
process.env.NODE_ENV = config[commander.data.env].env.NODE_ENV
process.env.PROJECT_NAME = commander.data.project
commander.data.type == 'wxdev' &&
  (process.env.assetsPublicPath = buildConfig.assetsPublicPath)
process.env.assetsRoot = buildConfig.assetsRoot

rm(
  path.join(
    buildConfig.assetsRoot,
    buildConfig.assetsSubDirectory), err => {

      /* error delete */
      err && utils.log({
        state: false,
        message: `delete error : ${err}`
      }, spinner)

      /* remove dist successfully */
      utils.log({
        state: true,
        message: `delete successfully for cat:${path.join(buildConfig.assetsRoot, buildConfig.assetsSubDirectory)}`
      }, spinner)

      /* build start */
      spinner.text = 'webpack building start......'
      spinner.start()
      webpack(require('./webpack.prod.conf'), function (err, stats) {

        spinner.stop()

        /* error build */
        err && utils.log({
          state: false,
          message: `webpack build error : ${err}`
        }, spinner)


        process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false
        }) + '\n\n')

        /* error build */
        stats.hasErrors() && utils.log({
          state: false,
          message: `Build failed with errors.\n`
        }, spinner)

        /* backup */
        utils.checkVersion(3)

        utils.log({
          state: true,
          message: `build complete successfully.`
        }, spinner)


        setTimeout(() => { process.exit(0) }, 1000)

      })
    })
