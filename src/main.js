import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/reset.css'


axios.defaults.baseURL = 'http://192.168.10.10'

axios.interceptors.request.use(config => {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
}, error => {
    return Promise.reject(error.response.data)
})

axios.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                this.$route.push('/auth/login')
                break;
        }
    }
})

Vue.prototype.$http = axios
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
