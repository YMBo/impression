// 文件上传事件
export class Drag {
    constructor(dom, eventObj) {
        this.dom = dom
        this.eventObj = eventObj
        this.EVENT = ['dragenter', 'drop', 'dragleave', 'dragover']
        this.addEvent()
    }

    addEvent() {
        this.EVENT.forEach(e => {
            this.dom.addEventListener(e, this.eventObj[e], false)
        })
    }
    destory() {
        this.EVENT.forEach(e => {
            this.dom.removeEventListener(e, this.eventObj[e], false)
        })
    }
}