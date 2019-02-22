import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/post/:id/detail',
            props: true,
            name: 'deatil',
            component: () => import('./views/post/Detail')
        },
        {
            path: '/post/create',
            name: 'create',
            props: true,
            component: () => import('./views/post/Create')
        },
        {
            path: '/auth/login',
            name: 'login',
            component: () => import('./views/auth/Login')
        },
        {
            path: '/auth/register',
            name: 'register',
            component: () => import('./views/auth/Register')
        }
    ]
})
