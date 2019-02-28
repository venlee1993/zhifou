import {LOGIN, LOGOUT} from "./mutations-types";

export default {
    //登录
    [LOGIN](state, data) {
        state.loginState = true;
        state.user = data.user;
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
    },
    //登出
    [LOGOUT](state) {
        state.loginState = false;
        state.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }
}