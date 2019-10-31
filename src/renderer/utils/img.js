import heic2any from "heic2any";

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
function forHeic(HEICBlobFile) {
    return heic2any({
        // required: the HEIF blob file
        blob: HEICBlobFile,
        // (optional) MIME type of the target file
        // it can be "image/jpeg", "image/png" or "image/gif"
        // defaults to "image/png"
        toType: "image/jpeg",
        // conversion quality
        // a number ranging from 0 to 1
        quality: 0.1
    });
}
export {
    getFileUrl,
    forHeic
}