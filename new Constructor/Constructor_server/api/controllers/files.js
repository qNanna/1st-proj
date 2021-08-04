var fs = require('fs')
var mkdirp = require('mkdirp')
const dbOp = require('./dbOp')
const { generateToken } = require('../controllers/auth')
const servdomain = require('../controllers/config')
var extract = require('extract-zip')
//const { exec } = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);



class File {
    async createFolder(data) {
        try {      
            let tok = generateToken(2)
            let path = `./versions/${data.data.target}/${data.data.playableId}/${data.data.name + tok}/`
            let url = servdomain + `${data.data.target}/${data.data.playableId}/${data.data.name + tok}/index.html`
            await mkdirp(path)
            data.path = path
            data.url = url
            return data
        } catch (err) {
            throw err
        }
    }

    async compileFile(data) {
        try {
            let proj_path = (__dirname + `/../../proj_playables/${data.data.target}/${data.data.playableId}`)
            console.log("compiling")
            let a1 = await exec('npm run buildPlay', {cwd: proj_path})
            console.log('compiled'); // console.log(a1.stdout); console.log(a1.stderr)
            
            let pth = `./proj_playables/${data.data.target}/${data.data.playableId}/dist/`
            fs.renameSync(pth +'index.html', data.path + `/index.html`)

            let dataq = {
                create: {
                    path: `${data.path}index.html`,
                    url: data.url,
                    playableId: data.data.playableId,
                    name: data.data.name,
                    userid: data._id,
                    config_path: data.data.config_path,
                    config: data.config
                },
                collection: 'versions'
            }

            let obj = await dbOp.createDoc(dataq)
            return obj
        } catch (err) {
            throw err
        }  
    }

    async uploadPlayable(data, file, callback) {
        try {

            console.log('uploaded, started execution')

            let proj_path = (__dirname + `/../../proj_playables/${data.userid}/${data.playableId}`)
            let filepath = proj_path + `/${file.File.name}`
            await mkdirp(proj_path)
            if (file.File.name) { await file.File.mv(proj_path + `/${file.File.name}`) }

            extract(filepath, {dir: proj_path}, async (err) => {
                if (err) {
                    console.log(err)
                } else {
                    try {
                    console.log('unzipped')

                    fs.unlinkSync(filepath)

                    let tok = generateToken(1)
                    let path = `./versions/${data.userid}/${data.playableId}/${data.name + tok}/`
                    let url = servdomain + `${data.userid}/${data.playableId}/${data.name + tok}/index.html`

                    await mkdirp(path)
                    console.log('versions  dir created')

                    console.log('compiling')
                    await exec('npm run buildPlay', {cwd: proj_path})
                    console.log('compiled'); // console.log(a1.stdout); console.log(a1.stderr)                    
                    
                    let p1 = proj_path +'/dist/index.html'                    
                    fs.renameSync(p1, `${path}/index.html`)
                    console.log('moved')

                    let dataq = {
                        create: {
                            name: data.name,
                            userid: data.userid,
                            playableId: data.playableId,
                            path: path + 'index.html',
                            url: url,
                            config_path: proj_path + '/src/constructor_config.js',
                            default: true
                        },
                        collection: 'versions'
                    }

                    let n = await dbOp.createDoc(dataq)
                    console.log('ALL WORK!!!')

                    callback(n)
                    } catch (err) {
                        throw err
                    }
                }
            })

        } catch (err) {
            throw err
        }
    }

    async applydefconf(data) {
        try {
            let obj = {
                find: {
                    playableId: data.playableId
                },
                update: {
                   config: data.config
                },
                collection: 'versions'
            }
            
            await dbOp.updateDoc(obj)
        } catch (err) {
            throw err
        }  
    }

    async saveconf(data) {
        try {  
        let pathq = data.data.url.replace(servdomain, './versions/') 
        let proj_path = (__dirname + `/../../proj_playables/${data.data.target}/${data.data.playableId}`)
        console.log("compiling")
        let a1 = await exec('npm run buildPlay', {cwd: proj_path})
        console.log('compiled'); // console.log(a1.stdout); console.log(a1.stderr)

        let pth = `./proj_playables/${data.data.target}/${data.data.playableId}/dist/index.html`
        fs.renameSync(pth, pathq)

            let dataq = {
                find: {
                    playableId: data.data.playableId,
                    _id: data.data._id
                },
                update: {
                    config: data.config
                },
                collection: 'versions'
            }

            let document = await dbOp.findAndUpdateDoc(dataq)
            return document
        } catch (err) {
            throw err
        }
    }

    async changeFile(obj, replacements) {
        try {
            let pth_sett = `./proj_playables/${obj.data.target}/${obj.data.playableId}/src/settings.js`
            let data = fs.readFileSync(pth_sett, 'utf-8')
            var regex, replaceStr
            regex = new RegExp("(\\" + 'let' + "\\s* ]*" + replacements.rule + "\\s*=\\s*)([^\\n;}]+)([\\s*;}])")
            replaceStr = "$1" + replacements.replacer
            let toWrite = data.replace(regex, replaceStr)
            fs.writeFileSync(pth_sett, toWrite, 'utf-8')

        } catch (err) {
            throw err
        }

    }

}

module.exports = new File()