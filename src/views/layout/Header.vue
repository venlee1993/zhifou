<template>
    <b-navbar toggleable="md" type="light" variant="white" class="shadows" fixed="top">
        <b-container>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">知否</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="#">首页</b-nav-item>
                    <b-nav-item href="#">发现</b-nav-item>
                    <b-nav-item href="#">话题</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <b-form-input size="sm" class="mr-sm-2" type="text" placeholder/>
                        <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="primary">提问</b-button>
                    </b-nav-form>
                    <b-nav-item-dropdown no-caret v-if="user">
                        <template slot="button-content">
                            <b-img rounded="circle" width="30" height="30" :src="user.avatar" alt="img"></b-img>
                        </template>
                        <router-link to="/user/profile" class="dropdown-item">个人中心</router-link>
                        <router-link to="#" class="dropdown-item">我的主页</router-link>
                        <router-link to="#" class="dropdown-item">我的收藏</router-link>
                        <router-link to="#" class="dropdown-item">设置</router-link>
                        <span class="dropdown-item">注销</span>
                    </b-nav-item-dropdown>
                    <div v-else class="auth">
                        <router-link to="/auth/login" class="login item">登录</router-link>
                        <router-link to="/auth/register" class="register item">注册</router-link>
                    </div>
                </b-navbar-nav>
            </b-collapse>
        </b-container>
    </b-navbar>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Header",
        data() {
            return {}
        },
        computed: {
            ...mapState(['user']),
        },
        mounted() {

        },
        methods: {
            log() {
                console.log(111);
            }
        }
    }
</script>

<style lang="less" scoped>
    .auth {
        margin-left: 1.5rem;
        display: flex;
        .item {
            color: #007bff;
            line-height: 1;
            align-self: center;
        }
        .login {
            margin-right: .5rem;
        }
    }
</style>