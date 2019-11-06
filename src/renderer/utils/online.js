// 是否连网
function isLonline() {
    return navigator.onLine
}

function isLonlineEvent() {
    window.addEventListener('online', function() {
        let option = {
            title: "有网了!",
            body: "",
        };
        // 创建上线通知
        new Notification(option.title, option);
    })

    window.addEventListener('offline', function() {
        let option = {
            title: "断网了!",
            body: "",
        };
        // 创建上线通知
        new Notification(option.title, option);
    })
}
export {
    isLonline,
    isLonlineEvent
}