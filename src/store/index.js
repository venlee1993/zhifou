import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const token = localStorage.getItem('token');
const user = localStorage.getItem('user')

export default new Vuex.Store({
    state: {
        token: token ? token : '',
        user: user ? JSON.parse(user) : null,
    },
    mutations,
    actions
})
