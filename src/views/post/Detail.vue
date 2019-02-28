<template>
    <div class="layout detail" @click="hideInput">
        <Header></Header>
        <b-container>
            <b-row>
                <b-col :md="9">
                    <!---- 正文详细 ---->
                    <div class="context" v-if="postInner">
                        <div class="author d-flex">
                            <div class="info">
                                <div class="d-flex">
                                    <div class="avatar">
                                        <b-img width="40" height="40" rounded="circle" :src="postInner.user.avatar"></b-img>
                                    </div>
                                    <div class="intros">
                                        <div class="name">{{postInner.user.name}}</div>
                                        <div class="time">{{postInner.created_at}}</div>
                                    </div>
                                </div>
                            </div>
                            <div class="attention">
                                <b-button size="sm" variant="outline-success" @click="attention(postInner.id)">关注</b-button>
                            </div>
                        </div>
                        <div class="contain">
                            <h3 class="title">{{postInner.title}}</h3>
                            <div class="text markdown-body" v-html="postInner.content"></div>
                        </div>
                    </div>
                    <!---- 正文详细end ---->

                    <!---- 加载状态 ---->
                    <div class="loading text-center" v-else>
                        <b-spinner variant="primary" label="Spinning"/>
                    </div>
                    <!---- 加载状态end ---->

                    <!---- 评论 ---->
                    <div class="comment">
                        <h4 class="text-center">评论</h4>
                        <div class="msg-box" id="editor">
                            <msg-input :state="commentState" @eventHandle="commentSubmit" @showSubmit="commentBtnShow" id="input"></msg-input>
                        </div>

                        <div class="comment-group">
                            <ul class="list">
                                <li class="item" v-for="comment in commentList" :key="comment.id">
                                    <div class="info-content">
                                        <div class="user-popover">
                                            <b-img width="32" height="32" rounded="circle" :src="comment.user.avatar"></b-img>
                                        </div>
                                        <div class="inner">
                                            <div class="user-info">{{ comment.user.name }}</div>
                                            <div class="user-text">{{ comment.content }}</div>
                                            <div class="time-action">
                                                <div class="time cyan">{{ comment.created_at }}</div>
                                                <div class="action cyan">
                                                    <span class="like"><i class="iconfont icon-like"></i>11</span>
                                                    <span class="msg" @click="handleMsg(`${comment.id}-0`)"><i class="iconfont icon-comment"></i>回复</span>
                                                </div>
                                            </div>

                                            <div class="comment-msg-box sildeInput" v-if="slideDown(`${comment.id}-0`)">
                                                <reply-input @eventHandle="replySubmit" @show="inputShow" :info="{post_id:id,comment_id:comment.id,replied_id:comment.user_id}"></reply-input>
                                            </div>

                                            <div class="reply-group" v-if="comment.replies">
                                                <ul class="list">
                                                    <li class="item" v-for="reply in comment.replies" :key="reply.id">
                                                        <div class="info-content">
                                                            <div class="user-popover">
                                                                <b-img width="32" height="32" rounded="circle" :src="reply.user.avatar"></b-img>
                                                            </div>
                                                            <div class="inner">
                                                                <div class="reply-content">
                                                                    <div class="user-info">{{reply.user.name}} @ {{reply.replyer.name}}</div>
                                                                    <div class="user-text">{{ reply.content }}</div>
                                                                    <div class="time-action">
                                                                        <div class="time cyan">2小时前</div>
                                                                        <div class="action cyan">
                                                                            <span class="like"><i class="iconfont icon-like"></i>11</span>
                                                                            <span class="msg" @click="handleMsg(`${comment.id}-${reply.id}`)"><i class="iconfont icon-comment"></i>{{ `${comment.id}-${reply.id}` == slideId ? '收起回复':'回复' }}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="comment-reply-box sildeInput" v-if="slideDown(`${comment.id}-${reply.id}`)">
                                                                    <reply-input @eventHandle="replySubmit" @show="inputShow" :info="{comment_id:comment.id,post_id:id,replied_id:reply.user_id}"></reply-input>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>

                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!---- 评论end ---->

                    <!---- 推荐 ---->
                    <div class="recommend"></div>
                    <!---- 推荐end ---->
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
    import {mapState} from 'vuex'
    import MsgInput from '../../components/MsgInupt'
    import ReplyInput from '../../components/ReplyInput'
    import '../../assets/css/markdown.css'

    export default {
        name: "Detail",
        props: ['id'],
        components: {
            Header, Side, MsgInput, ReplyInput
        },
        data() {
            return {
                postInner: null,  //文章详情默认
                slideId: '0-0',     //回复输入框ID组合
                slideElement: null, //回复输入框DOM
                commentState: false, //评论框提交显示
                commentList: []

            }
        },
        computed: {
            ...mapState(['user']),
        },
        created() {
            this.getPostInner();
            this.getCommentlist();
        },
        methods: {
            inputShow(ele) {
                this.slideElement = ele
            },
            attention() {
                console.log('attention');
            },
            slideDown(sid) {
                return sid == this.slideId
            },
            handleMsg(sid) {
                event.stopPropagation()
                this.slideId = this.slideDown(sid) ? '0-0' : sid;
            },
            hideInput(event) {
                if (this.slideId != '0-0' && !this.slideElement.contains(event.target)) {
                    this.slideId = '0-0'
                    this.slideElement = null;
                }
                if (this.commentState) {
                    let input = document.getElementById('input');
                    if (!input.contains(event.target)) {
                        this.commentState = false;
                    }
                }
                event.stopPropagation()
            },
            commentSubmit(text) {
                this.$http.post('/api/post/comment', {
                    post_id: this.id,
                    content: text
                }).then(res => {
                    if (res.status == 200) {
                        this.commentState = false
                        this.getCommentlist();
                    }
                })
            },
            replySubmit(data) {
                this.$http.post('/api/comment/reply', data).then(res => {
                    if (res.status == 200) {
                        this.slideElement = null;
                        this.slideId = '0-0';
                        this.getCommentlist();
                    }
                })
            },
            commentBtnShow() {
                this.commentState = true;
            },
            getPostInner() {
                this.$http.get(`/api/post/${this.id}/show`).then(res => {
                    this.postInner = res.data;
                })
            },
            getCommentlist() {
                this.$http.get(`/api/post/${this.id}/comment`).then(res => {
                    this.commentList = res.data
                })
            },
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/mixi";

    .context {
        background-color: white;
        margin-bottom: 1rem;
        @padding();
    }

    .author {
        align-self: center;
        .info {
            flex: 1;
        }
        .avatar {
            margin-right: .5rem;
        }
        .name {
            font-size: @font14;
        }
        .time {
            font-size: @font12;
        }
        .attention {
            width: 3rem;
            button {
                position: relative;
                top: .25rem;
            }
        }
    }

    .contain {
        .title {
            margin: .875rem 0;
        }
    }

    .loading {
        padding: 1rem 0;
        background-color: white;
        margin-bottom: 1rem;
    }

    .comment {
        @padding();
        background-color: white;
        h4 {
            padding: .875rem;
        }
        padding-bottom: 100px;
    }

    .msg-box {
        background-color: #fafbfc;
        padding: 1rem;
    }

    .info-content {
        display: flex;
        padding: 1rem 2rem;
        padding-bottom: 0;
        .user-popover {
            margin-right: .6rem;
            user-select: none;
        }
        .inner {
            flex: 1;
            padding-bottom: .5rem;
            border-bottom: solid 1px @boderColor;
        }
        font-size: @font14;
        .user-info {
            color: #8a9aa9;
            margin-bottom: .2rem;
        }
        .user-text {
            margin-bottom: .5rem;
        }
        .time-action {
            display: flex;
            justify-content: space-between;
            .like {
                margin-right: 2rem;
                user-select: none;
                cursor: pointer;
            }
            .msg {
                user-select: none;
                cursor: pointer;
            }
            .iconfont {
                margin-right: .15rem;
            }
        }
    }

    .reply-group {
        margin-top: .5rem;
        background-color: #fafbfc;
        .info-content {
            padding: 1rem;
            padding-bottom: 0;
        }
        .list {
            .item:last-child {
                .inner {
                    border: none;
                }
            }
        }
    }

    .comment-msg-box {
        padding: 1rem;
        margin-top: .5rem;
        background-color: #fafbfc;
    }

    .comment-reply-box {
        margin-top: .5rem;
        padding: 1rem;
        border: solid 1px #f1f1f2;
        border-radius: 0.2rem;
        background-color: white;
    }

</style>