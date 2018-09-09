/* system import */
const program = require('commander')
const utils = require('./utils')
const fs = require('fs')

module.exports = function () {

    /* commander settings */
    program
        .option('-t, --type [value]', '发布环境0:正式')
        .option('-p, --project [value]', '项目名称')
        .option('-e, --env [value]', '编译环境')
        .parse(process.argv)

    if (!program.type) {
        return {
            state: false,
            message: `commander line error : please check the parametres -t | --type !`
        }
    }

    let env = 'build'
    if (program.env) {
        env = program.env
    }

    let paths = __dirname.split(/[/\\]/)
    let project = paths[paths.length - 2]
    let config = {}
    if (program.project) {
        project = program.project
    }
    else {
        let json
        try {
            let temJson = JSON.parse(fs.readFileSync('./.tuhurc').toString())
            project = temJson.projectName
            config = temJson
        }
        catch (e) {
            return {
                state: false,
                message: `file ./.tuhurc to json  error : ' ${e} ' !`
            }
        }
    }

    return {
        state: true,
        message: `commander line check successful , start to build : ' ${program.type} ' !`,
        data: {
            type: program.type,
            project,
            env,
            config
        }
    }
}