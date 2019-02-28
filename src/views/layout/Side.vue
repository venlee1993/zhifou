<template>
    <div class="side">
        <div class="operations">
            <div class="action">
                <router-link to="/post/create" target="_blank">写文章</router-link>
            </div>
            <div class="action">
                <router-link to="'/">写回答</router-link>
            </div>
            <div class="action">
                <router-link to="/">写想法</router-link>
            </div>
        </div>
        <div class="panel">
            <div class="p-header">你感兴趣的人</div>
            <div class="p-body">
                <ul>
                    <li>
                        <div class="interested" v-for="i in 5" :key="i">
                            <div class="avatar">
                                <b-img width="36" height="36" src="https://user-gold-cdn.xitu.io/2019/1/16/1685746c4f59d230?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1" rounded="circle" alt="Circle image"/>
                            </div>
                            <div class="info">
                                <div class="nickname">浪里行舟{{i}}</div>
                                <div class="tag">前端小白@厦门</div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

        <div class="panel">
            <div class="p-header">关于作者</div>
            <div class="p-body">
                <ul>
                    <li>dsadsadsa</li>
                    <li>dsadsadsa</li>
                    <li>dsadsadsa</li>
                </ul>
            </div>
        </div>
        <div class="panel">
            <div class="p-header">我的收藏</div>
            <div class="p-body">
                <ul>
                    <li v-for="i in 5" :key="i">
                        <div class="collect"><i class="iconfont icon-heart-fill"></i> 文章{{i}}</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Side"
    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/mixi";

    .operations {
        background-color: white;
        display: flex;
        @padding();
        .action {
            flex: 1;
            text-align: center;
            a {
                @link();
            }
        }
    }

    .panel {
        margin-top: 1rem;
        &:first-child {
            margin-top: 0;
        }
        background-color: white;
        .p-header {
            @padding();
            font-size: @font14;
            border-bottom: solid 1px @boderColor;
        }
        .p-body {
            @padding();
        }
    }

    .interested {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
        &:last-child {
            margin-bottom: 0;
        }
        .avatar {
            margin-right: .5rem;
        }
        .nickname, .tag {
            color: #333;
            line-height: 1;
            font-size: @font14;
        }
        .tag {
            margin-top: .2rem;
            font-size: @font12;
        }
    }

    .collect {
        margin-bottom: .5rem;
        font-size: @font14;
    }
</style>