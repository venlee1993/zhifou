<template>
    <div class="form">
        <div class="form-header">
            <h3 class="primary">知否</h3>
            <p class="primary">{{ type=='login'? '登录':'注册' }}知否，发现更多可信赖的解答</p>
        </div>
        <b-form class="form-inner" @submit="handleSubmit">
            <div class="input-item">
                <b-form-input type="text" placeholder="请输入邮箱" v-model="formData.email"></b-form-input>
            </div>
            <div class="input-item">
                <b-form-input type="password" placeholder="请输入密码" v-model="formData.password"></b-form-input>
            </div>
            <div class="input-item" v-if="type=='register'">
                <b-form-input type="password" placeholder="重复密码" v-model="formData.password_confirmation"></b-form-input>
            </div>
            <div class="input-item">
                <b-btn variant="primary" size="md" class="w-100" type="submit">{{ type=='login'? '登录':'注册' }}</b-btn>
            </div>
        </b-form>
        <div class="oauth">
            <div class="d-flex">
                <div class="oauth-item">
                    <b-img src="https://b-gold-cdn.xitu.io/v3/static/img/weibo.fa758eb.svg" width="38" height="38" rounded="circle"/>
                </div>
                <div class="oauth-item">
                    <b-img src="https://b-gold-cdn.xitu.io/v3/static/img/wechat.e0ff124.svg" width="38" height="38" rounded="circle"/>
                </div>
                <div class="oauth-item">
                    <b-img src="https://b-gold-cdn.xitu.io/v3/static/img/github.547dd8a.svg" width="38" height="38" rounded="circle"/>
                </div>
            </div>
        </div>
        <div class="form-footer" v-if="type=='login'">
            还没有账号？
            <router-link to="/auth/register" class="primary">注册</router-link>
        </div>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        name: "Auth",
        props: ['type'],
        data() {
            return {
                formData: {
                    email: '',
                    password: '',
                    password_confirmation: ''
                }
            }
        },
        methods: {
            ...mapMutations(['login']),
            handleSubmit(evt) {
                evt.preventDefault();
                const url = this.type == 'login' ? '/api/auth/login' : '/api/auth/register';
                this.$http.post(url, this.formData).then(res => {
                    if (res.status == 201) {
                        this.login(res.data)
                        this.$router.push('/');
                    }
                })
            }
        }
    }
</script>

<style lang="less" scoped>

    .form {
        padding: 1.5rem;
        background-color: white;
    }

    .form-header {
        text-align: center;
        h3 {
            margin-bottom: .6rem;
        }
        margin-bottom: .4rem;
    }

    .form-inner {
        .input-item {
            width: 352px;
            margin-bottom: 1rem;
        }
    }

    .oauth {
        margin-top: 1rem;
        .oauth-item {
            text-align: center;
            flex: 1;
        }
    }

    .form-footer {
        margin-top: .6rem;
        text-align: center;
        padding: .875rem 0;
        border-top: solid 1px #EBEBEB;
    }
</style>