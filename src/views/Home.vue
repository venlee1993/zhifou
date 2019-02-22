<template>
    <div class="layout">
        <Header></Header>
        <b-container>
            <b-row>
                <b-col md="9">
                    <div class="wrapper">
                        <div class="sort-links">
                            <router-link to="/" class="link">推荐</router-link>
                            <router-link to="/" class="link">前端</router-link>
                            <router-link to="/" class="link">Android</router-link>
                            <router-link to="/" class="link">后端</router-link>
                            <router-link to="/" class="link">人工智能</router-link>
                        </div>
                        <div class="sort-group" v-if="posts.length">
                            <ul class="list">
                                <li class="item" v-for="(post) in posts" :key="post.id">
                                    <div class="info-entry">
                                        <div class="content-box">
                                            <div class="meta-row">
                                                <ul class="meta-list">
                                                    <li class="indigo">专栏-</li>
                                                    <li class="">机械之心-</li>
                                                    <li>4小时-</li>
                                                    <li class="">{{ post.created_at}}</li>
                                                </ul>
                                            </div>
                                            <div class="title-row ">
                                                <router-link :to="{path:`/post/${post.id}/detail`}" class="title">{{ post.title }}</router-link>
                                            </div>
                                            <div class="action-row">
                                                <div class="action-group">
                                                    <div class="action" @click="likeAction"><i class="iconfont icon-like"></i>1</div>
                                                    <div class="action" @click="msgAction"><i class="iconfont icon-comment"></i>121</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="cover">
                                            <b-img rounded="0" width="60" height="60" alt="Not rounded image" src="https://picsum.photos/250/250/?image=54"/>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div class="loading text-center" v-else>
                            <b-spinner variant="primary" label="Spinning"/>
                        </div>
                    </div>
                </b-col>
                <b-col md="3">
                    <Side></Side>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Side from './layout/Side'
    import Header from './layout/Header'

    export default {
        name: 'home',
        components: {
            Side, Header
        },
        data() {
            return {
                posts: []
            }
        },
        created() {
            this.$http.get('/api/post/list').then(res => {
                if (res.status == 200) {
                    this.posts = res.data
                }
            })
        },
        methods: {
            likeAction() {
                this.$http.get('/api/post/like').then(res => {
                    console.log(res);
                })
            },
            msgAction() {

            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/mixi";

    .wrapper {
        background-color: white;
    }

    .sort-links {
        display: flex;
        border-bottom: solid 1px @boderColor;
        @padding();
        .link {
            font-size: @font14;
            padding: 0 1rem;
            &:first-child {
                padding-left: 0;
            }
        }
    }

    .sort-group {
        .item {
            border-bottom: solid 1px @boderColor;
            &:last-child {
                border: none;
            }
        }
    }

    .info-entry {
        display: flex;
        align-items: center;
        @padding();
        .content-box {
            flex: 1;
        }
        .meta-list {
            display: flex;
            font-size: @font12;
        }
        .cover {
            width: 60px;
            height: 60px;
            margin-left: 1rem;
        }
        .title-row {
            margin: .3rem 0 .8rem 0;
            .title {
                color: #000;
            }
        }
        .action-group {
            display: flex;
            .action {
                padding: .08rem .4rem;
                border: 1px solid #edeeef;
                color: #b2bac2;
                font-size: @font14;
                cursor: pointer;
                user-select: none;
                &:first-child {
                    border-right: none;
                }
                &:hover {
                    background-color: #f7f8fa;
                }
                .iconfont {
                    margin-right: .2rem;
                }
            }
        }
    }

    .loading {
        padding: 1rem 0;
        background-color: white;
        margin-bottom: 1rem;
    }
</style>