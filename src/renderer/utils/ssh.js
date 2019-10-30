// import SSH2Utils from 'ssh2-utils'

// 安装ssh2-utils 这个包的时候，有个fs-extra.js的模块，这个模块有个依赖是graceful-fs.js  ，
// 一定要将graceful-fs升级到@4.x，我这里升级到了最新版,npm install --save graceful-fs@latest
// 如果不升级，electron会启动不了



import SSH2Utils from 'ssh2-utils'
import { getSetting } from 'ROOT/database/db'
import { alertMessage } from './file'
import store from '@/store/'

const nativeImage = require('electron').nativeImage;
var ssh = new SSH2Utils();
let server = { host: "39.106.27.181", username: "root", password: "yanbobo@123" };
let setting_server = getSetting('setting_server')




function readFile() {
    console.log('触发')
    let remoteFile = '/home/yangmingbo/1.jpg'
    return new Promise((resolve, reject) => {
        ssh.streamReadFileSudo(server, remoteFile, function(err, stdout, server, conn) {
            let a = ''
            stdout.on('data', (c) => {
                console.log(c)
                a = a + c
            })
            stdout.on('close', function() {
                // var image = nativeImage.createFromBuffer(a);
                // console.log(image)
                let buffer = new Buffer(a)
                let blob = new Blob([buffer], { type: 'image/*' })
                    // 创建blob链接
                let src = URL.createObjectURL(blob)
                resolve(src)
                return
                conn.end();
            });
        })
    })
}

function putFile() {
    let { fileList: file } = store.state.upload
    let flag = null;
    try {
        flag = setting_server.server_disable
        if (!flag) throw ('服务器配置读取失败！')
    } catch (error) {
        alertMessage('error', `错误信息：${error} 请重新配置服务器信息`)
        return;
    }
    file.forEach(e => {
        const pathFile = e.file.path
        const name = e.file.name
        let id = e.id
        try {
            setting_server.server.forEach(m => {
                let { ip: host, password, role: username, path: remoteFile } = m
                remoteFile = remoteFile + '/' + name
                console.log(remoteFile)
                    // setTimeout(() => {
                    //     console.log(id)
                    //     store.commit('upload/CHANGE_PROCESS', {
                    //         id,
                    //         percent: 100
                    //     })
                    // }, 5000);
                    // ssh.putFileSudo({
                    //     host,
                    //     password,
                    //     username
                    // }, pathFile, remoteFile, function(err, server, conn) {
                    //     if (err) console.log(err);
                    //     console.log(id)
                    //     store.commit('upload/CHANGE_PROCESS', {
                    //         id,
                    //         percent: 100
                    //     })
                    // });
            })
        } catch (error) {
            alertMessage('error', `错误信息：${error} 请重新配置服务器信息`)
            return;
        }
    })

}

export {
    putFile,
    readFile
}