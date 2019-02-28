<template>
    <div class="layout">
        <Header></Header>
        <b-container>
            <b-row>
                <b-col :md="9" class="wrapper">
                    <b-row class="user-info">
                        <b-col md="3" class="avatar">
                            <b-img width="90" height="90" rounded="circle" alt="Circle image" src="https://user-gold-cdn.xitu.io/2019/1/24/1687f171f0f3bd65?imageView2/1/w/180/h/180/q/85/format/webp/interlace/1"/>
                        </b-col>
                        <b-col md="6" class="intro">
                            <div class="name">Venlee</div>
                            <div class="job"><i class="iconfont icon-bag"></i>前端工程师</div>
                            <div class="Motto"><i class="iconfont icon-businesscard"></i>范德萨发达</div>
                        </b-col>
                        <b-col md="3" class="social">
                            <div class="types">
                                <span class="item orange"><i class="iconfont icon-sina"></i></span>
                                <span class="item secondary"><i class="iconfont icon-githublogo"></i></span>
                                <span class="item primary"><i class="iconfont icon-earth"></i></span>
                            </div>
                            <div class="user-setting">
                                <b-button size="sm" variant="outline-primary">编辑个人资料</b-button>
                            </div>
                        </b-col>
                    </b-row>

                    <div class="user-column">
                        <div class="view">
                            <div class="view-header">
                                <div class="header-content">
                                    <router-link class="nav-item active" to="/">动态</router-link>
                                    <router-link class="nav-item" to="/">沸点</router-link>
                                    <router-link class="nav-item" to="/">分享</router-link>
                                    <router-link class="nav-item" to="/">赞</router-link>
                                    <router-link class="nav-item" to="/">小册</router-link>
                                    <router-link class="nav-item" to="/">更多</router-link>
                                </div>
                            </div>
                            <div class="view-body">
                                <div class="body-content">
                                    <h5 class="list-title"><span>我的动态</span></h5>
                                    <ul class="list-group">
                                        <li class="item">fsdfdsfdsf</li>
                                        <li class="item">fsdfdsfdsf</li>
                                        <li class="item">fsdfdsfdsf</li>
                                        <li class="item">fsdfdsfdsf</li>
                                        <li class="item">fsdfdsfdsf</li>
                                        <li class="item">fsdfdsfdsf</li>
                                        <li class="item">fsdfdsfdsf</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                </b-col>
                <b-col :md="3">
                    <Side></Side>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Header from '../layout/Header'
    import Side from '../layout/Side'

    export default {
        name: "Index",
        components: {
            Header, Side
        }
    }
</script>

<style lang="less" scoped>
    @import '../../assets/css/mixi';

    .user-info {
        background-color: white;
        text-align: center;
        padding: .875rem 0;
        .intro {
            text-align: left;
            vertical-align: middle;
            line-height: 1;
            .name {
                font-size: 2rem;
                font-weight: 500;
                margin-bottom: .6rem;
            }
            .job{
                margin-bottom: .2rem;
            }
            .iconfont {
                font-size: 1.2rem;
                position: relative;
                top: 2px;
                margin-right: .2rem;
            }
        }
        .social {
            .types {
                font-size: 0;
                .item {
                    display: inline-block;
                    font-size: 1rem;
                    padding: 0 5%;
                    .iconfont {
                        font-size: 1.2rem;
                    }
                }
            }
            .user-setting {
                margin-top: 1.2rem;
            }
        }
    }

    .user-column {
        margin-top: 0.875rem;
        .view {
            margin: 0 -15px;
        }
        .view-header {
            font-size: 0;
            background-color: white;
            border-bottom: 1px solid #ebebeb;
            .header-content {
                display: flex;
            }
            .nav-item {
                color: var(--blue);
                font-size: @font14;
                padding: .875rem 1.2rem;
            }
            .active {
                border-bottom: solid 2px var(--blue)
            }
        }
        .view-body {
            .list-title {
                font-size: @font14;
                padding: .875rem;
                background-color: white;
                margin-bottom: 0;
                border-bottom: solid 1px #ebebeb;
            }
            .list-group {
                .item {
                    padding: 1rem;
                    margin-bottom: .875rem;
                    background-color: white;
                }
            }
        }
    }

</style>