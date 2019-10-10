import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import '@/components/icons'

// 字体
import 'font-awesome/css/font-awesome.css'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
}).$mount('#app')