import { frameAnimtion } from '@/utils/common'



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
        // 成功时调用
        CHANGE_PROCESS(state, paload) {
            console.log('调用')
            const { id, percent } = paload
            let status = 'active'
            let file = state.fileList.filter(e => e.id == id)[0]
            var run = frameAnimtion(100, () => {
                if (file.percent >= 100) {
                    run.cancel()
                } else {
                    ++file.percent
                }
            })
            run()
            if (file.percent == 100) {
                status = 'success'
            }
            file.status = status
                // if (file.percent == 100) {
                //     state.successList.push(file)
                //     state.fileList.splice(id, 1)
                //     state.fileList = state.fileList.filter(e => e.id != id)
                // }
        }
    },
    actions: {
        o_progress(context) {
            context.commit('increment')

        }
    }
}
export default upload