<template>
    <div class="layout d-flex">
        <div class="inner">
            <Auth :type="type"></Auth>
        </div>
    </div>
</template>

<script>
    import Auth from '../../components/Auth'

    export default {
        name: "Register",
        data() {
            return {
                type: 'login'
            }
        },
        components: {
            Auth
        }
    }
</script>

<style lang="less" scoped>
    .layout {
        padding-top: 0;
        align-self: center;
        background-image: url('../../assets/images/ba.png');
        background-repeat: no-repeat;
        background-size: cover;
        height: 100vh;
    }

    .inner {
        margin: 0 auto;
        margin-top: 10%;
    }
</style>