// import SSH2Utils from 'ssh2-utils'

// 安装ssh2-utils 这个包的时候，有个fs-extra.js的模块，这个模块有个依赖是graceful-fs.js  ，
// 一定要将graceful-fs升级到@4.x，我这里升级到了最新版,npm install --save graceful-fs@latest
// 如果不升级，electron会启动不了



import SSH2Utils from 'ssh2-utils'
import { getSetting } from 'ROOT/database/db'
import { alertMessage } from './file'
import store from '@/store/'
var ssh = new SSH2Utils();
let server = { host: "39.106.27.181", username: "root", password: "yanbobo@123" };
let setting_server = getSetting('setting_server')





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
    putFile
}