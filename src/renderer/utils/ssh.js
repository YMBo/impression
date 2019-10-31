/*
 * @Author: YMBo
 * @Date: 2019-10-23 09:47:27
 * @Description:ssh 上传 预览等
 * @FilePath: /src/renderer/utils/ssh.js
 */
// import SSH2Utils from 'ssh2-utils'

// 安装ssh2-utils 这个包的时候，有个fs-extra.js的模块，这个模块有个依赖是graceful-fs.js  ，
// 一定要将graceful-fs升级到@4.x，我这里升级到了最新版,npm install --save graceful-fs@latest
// 如果不升级，electron会启动不了



import SSH2Utils from 'ssh2-utils'
import { getSetting } from 'ROOT/database/db'
import { alertMessage } from './file'
import store from '@/store/'
import { forHeic } from './img'


var ssh = new SSH2Utils();
let server = { host: "39.106.27.181", username: "root", password: "yanbobo@123" };
let setting_server = getSetting('setting_server')



// 读取img文件，返回src用于展示
function readFile(fileName) {
    let remoteFile = '/home/yangmingbo/IMG_4316.HEIC'
        // remoteFile = fileName
    return new Promise((resolve, reject) => {
        ssh.streamReadFile(server, remoteFile, function(err, stdout, server, conn) {
            // 创建一个空的buffer对象
            let buffer = Buffer.alloc(0)
            let list = []
            let a = ''
            stdout.on('data', (c) => {
                list.push(c)
                a = a + c
            })
            stdout.on('close', function() {
                buffer = Buffer.concat(list)

                // console.log(a)
                let blob = new Blob([buffer], { type: 'image/*' })
                console.log(blob)
                forHeic(blob).then(r => {
                        let src = URL.createObjectURL(r)
                        resolve(src)
                    })
                    // 创建blob链接
                    // let src = URL.createObjectURL(blob)
                    // resolve(src)
                conn.end();
            });
        })
    })
}

// put文件
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
                ssh.putFileSudo({
                    host,
                    password,
                    username
                }, pathFile, remoteFile, function(err, server, conn) {
                    if (err) console.log(err);
                    console.log(id)
                    store.commit('upload/CHANGE_PROCESS', {
                        id,
                        percent: 100
                    })
                });
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