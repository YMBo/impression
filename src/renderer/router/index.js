import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: { name: 'gallery' } },
        {
            path: '/gallery',
            name: 'gallery',
            component: require('@/page/gallery').default
        },
        {
            path: '/upload',
            name: 'upload',
            component: require('@/page/upload').default
        },
        {
            path: '/setting',
            name: 'setting',
            component: require('@/page/setting').default
        },
    ]
})