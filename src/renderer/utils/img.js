import heic2any from "heic2any";
import EXIF from 'exif-js'
import fs from 'fs'
import { wgs2gcj } from '@pirxpilot/eviltransform'
import { getAdress } from '../api/map'



function formatDateTime(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + ':' + m + ':' + d + ' ' + h + ':' + minute + ':' + second;
};

// 根据图像file对象来创建一个url，用以预览
function getFileUrl(sourceId) {
    var url;
    if (window.createObjectURL != undefined) {
        url = window.createObjectURL(sourceId);
    } else if (window.URL != undefined) {
        url = window.URL.createObjectURL(sourceId);
    } else if (window.webkitURL != undefined) {
        url = window.URL.createObjectURL(sourceId);
    }
    return url;
}


// 针对heic图片的转换
function forHeic(HEICBlobFile, quality = 0.1) {
    return heic2any({
        // required: the HEIF blob file
        blob: HEICBlobFile,
        // (optional) MIME type of the target file
        // it can be "image/jpeg", "image/png" or "image/gif"
        // defaults to "image/png"
        toType: "image/jpeg",
        // conversion quality
        // a number ranging from 0 to 1
        quality: quality
    });
}


// 关于坐标，手机的GPS坐标是WGS84，这个标准谷歌地球和非中国的谷歌地图在用（谷歌中国不是），但是中国的地图都是用的
// GCJ-02（火星坐标系），腾旭，高德等中国的地图都是用的这个格式，在WGS84基础上加密来的
// BD09 百度地图使用的坐标，在GCJ-02基础上加密来的

// 获取图片信息
function getExif(img) {
    return new Promise((resolve, reject) => {
        EXIF.getData(img, function() {
            let { lastModifiedDate } = img
            let data = EXIF.getAllTags(this)
                // 时间 、东经、北纬
            let { DateTimeOriginal, GPSLatitude, GPSLongitude } = data

            // 如果exif信息中没有创建时间，那么就是用图片的lastModifiedDate作为创建时间
            if (!DateTimeOriginal) {
                DateTimeOriginal = lastModifiedDate ? formatDateTime(lastModifiedDate) : '0 0'
            }
            let E = undefined
            let N = undefined
            let location = undefined
            if (GPSLatitude || GPSLongitude) {
                // 东经
                E = GPSLatitude[0].valueOf() + GPSLatitude[1].valueOf() / 60 + GPSLatitude[2].valueOf() / 3600
                    // 北纬
                N = GPSLongitude[0].valueOf() + GPSLongitude[1].valueOf() / 60 + GPSLongitude[2].valueOf() / 3600

                // WGS-84 => GCJ-02
                const GCJ = wgs2gcj(E, N)
                location = {
                    E: GCJ.lng,
                    N: GCJ.lat
                }
            }

            let reg = /([\d|:|-]+)\s([\d|:]+)/g
            let d = reg.exec(DateTimeOriginal);
            let y = /(\d{4}):(\d{2}:\d{2})/g.exec(d[1])
                // 日期和时间 
            let time = {
                year: y[1],
                date: y[2],
                time: d[2]
            }
            let pos = undefined
            if (!location) {
                resolve({
                    time,
                    pos
                })
            } else {
                getAdress(`${location.E},${location.N}`).then(r => {
                    const { data } = r
                    if (data.status == 1) {
                        const { addressComponent: l } = data.regeocode
                        pos = {
                            // 国家
                            country: l.country,

                            // 区/县
                            district: l.district,

                            //市
                            city: l.city.length ? l.city : '',

                            // 乡镇
                            township: l.township,

                            // 省
                            province: l.province,

                            // 商圈
                            businessAreas: l.businessAreas[0] ? l.businessAreas[0].name : undefined
                        }
                    }
                    resolve({
                        time,
                        pos
                    })
                }).catch(r => {
                    // 如果网络等原因没取到地址，则设地址为空，有网络自动取值
                    resolve({
                        time,
                        pos: undefined
                    })
                })
            }

        })
    })

}

export {
    getFileUrl,
    forHeic,
    getExif
}