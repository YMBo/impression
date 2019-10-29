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

export {
    getFileUrl
}