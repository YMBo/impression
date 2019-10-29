import fs from 'fs-extra'

// 是否为文件夹
function isDir(url) {
    let stat = fs.lstatSync(url);
    return stat.isDirectory()
}

// 将文件夹扁平化
function flatDir(fileList) {
    let all = []
    for (let i in fileList) {
        let e = fileList[i]
        if (isDir(e.path)) {
            fs.readdir(e.path, function(err, file) {
                console.log(file)
            })
        }
        all.push({
            id: Math.random(),
            file: e[i],
            status: 'active',
            err: null,
            percent: 0
        })
    }
}

export {
    isDir,
    flatDir
}