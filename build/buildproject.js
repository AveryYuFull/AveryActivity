
const fs = require('fs')
const child = require('child_process')
const path = require('path')

const project = process.argv[2]
if (!project) {
  throw new Error('请指定发布项目名称')
}
if (project === path.basename(process.cwd())) {
  throw new Error('不能为当前项目，如果要发当前项目，请使用 npm run buildlocal')
}
const baseDir = `../${project}`
!fs.existsSync(baseDir) && fs.mkdirSync(baseDir)
fs.writeFileSync(`${baseDir}/package.json`, `{
  "name": "buildvue",
  "version": "1.0.0",
  "description": "A Vue.js project",
  "author": "caozhongping <caozhongping@tuhu.cn>",
  "private": true,
  "scripts": {
    "build": "node build/out.js"
  },
  "dependencies": {
    "base-64": "^0.1.0"
  }
}`)
!fs.existsSync(`${baseDir}/build`) && fs.mkdirSync(`${baseDir}/build`)
fs.copyFileSync(`./build/out.js`, `${baseDir}/build/out.js`)

process.env.PROJECT_NAME = project
process.env.assetsRoot = path.join(__dirname, `../../${project}/deploy`)
process.env.indexhtml = path.join(__dirname, `../../${project}/deploy/index.html`)

const ls = child.spawn('node', ['build/build.js', '-t', 'production'])
const ora = require('ora')

const spinner = ora('building for production...')
spinner.start()

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`)
})

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`)
  spinner.stop()
})

ls.on('close', (code) => {
  code === 0 && console.log(`child process exited with code ${code}`)
  console.log(`构建成功 请提交${project}到gitlab master 分支`)
  spinner.stop()
})

// fsExtra.copySync('./deploy', `${baseDir}/deploy`, { overwrite: true })
// fsExtra.removeSync('./deploy')

// fs.existsSync('./deploy_bak') && fsExtra.copySync('./deploy_bak', './deploy') && fsExtra.removeSync('./deploy_bak')

// console.log(`构建成功 请提交${project}到gitlab master 分支`)
