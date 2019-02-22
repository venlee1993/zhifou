export default {
    //登录
    login(state, data) {
        state.loginState = true;
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));
    },
    //登出
    logout(state) {
        state.loginState = false;
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
}