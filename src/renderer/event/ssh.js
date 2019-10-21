// import SSH2Utils from 'ssh2-utils'

// 安装ssh2-utils 这个包的时候，有个fs-extra.js的模块，这个模块有个依赖是graceful-fs.js  ，
// 一定要将graceful-fs升级到@4.x，我这里升级到了最新版,npm i graceful-fs@latest
// 如果不升级，electron会启动不了



var SSH2Utils = require('ssh2-utils')
var ssh = new SSH2Utils();

let server = { host: "39.106.27.181", username: "root", password: "yanbobo@123" };

function putFile() {
    console.log('运行')
    ssh.exec(server, 'ls', function(err, stdout, stderr) {
        if (err) console.log(err);
        console.log(stdout);
        console.log(stderr);
    });
}
let a = '2019年10月1日-2019年10月31日'
let reg = /(\d+)年([^-]+)/g
export {
    putFile
}