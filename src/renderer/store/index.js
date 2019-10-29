import Vue from 'vue'
import Vuex from 'vuex'
import upload from './modules/upload'


Vue.use(Vuex)

const store = new Vuex.Store({
    modules: { upload }
})

export default store