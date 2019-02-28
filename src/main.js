import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/reset.css'

//---------axios 配置----

const serivce = axios.create({
    baseURL: 'http://212.64.94.111'
})

serivce.interceptors.request.use(config => {
    let token = localStorage.getItem('token');
    if (token) {
        config.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error.response.data)
})

// http响应拦截器
serivce.interceptors.response.use(response => {
    return response
}, error => {
    if (error.response) {
        // switch (error.response.status) {
        //     case 401:
        //         localStorage.getItem('token') && localStorage.removeItem('token')
        //         localStorage.getItem('user') && localStorage.removeItem('user')
        //         router.push('/auth/login');
        //         break;
        // }
    }
    return Promise.reject(error);
})
//---------axios 配置end----

router.beforeEach((to, form, next) => {
    if (to.matched.some(recode => recode.meta.auth)) {
        if (localStorage.getItem('token')) {
            next();
        }
        else {
            next({
                path: '/auth/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
})


Vue.prototype.$http = serivce
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
