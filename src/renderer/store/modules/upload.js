// domain信息
const upload = {
    namespaced: true,
    state: {
        fileList: [],
        successList: []
    },
    mutations: {
        ADD_LIST(state, payload) {
            state.fileList = state.fileList.concat(payload.data)
        },
        CHANGE_PROCESS(state, paload) {
            const { id, percent } = paload
            let status = 'active'
            if (percent == 100) {
                status = 'success'
            }
            let file = state.fileList.filter(e => e.id == id)[0]
            console.log(file)
            file.status = status
            file.percent = percent
            if (percent == 100) {
                state.successList.push(file)
                state.fileList.splice(id, 1)
                state.fileList = state.fileList.filter(e => e.id != id)
                console.log(state.fileList)
            }
        }
    }
}
export default upload