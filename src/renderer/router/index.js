import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/', redirect: { name: 'gallery' } },
        {
            path: '/gallery',
            name: 'gallery',
            component: require('@/components/gallery').default
        },
        {
            path: '/setting',
            name: 'setting',
            component: require('@/components/setting').default
        },
    ]
})