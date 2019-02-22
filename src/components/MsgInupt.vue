<template>
    <div class="msg-input" ref="input">
        <div class="d-flex">
            <div class="user">
                <b-img width="32" height="32" rounded="circle" src="https://user-gold-cdn.xitu.io/2019/1/24/1687f171f0f3bd65?imageView2/1/w/100/h/100/q/85/format/webp/interlace/1"></b-img>
            </div>
            <div class="input-box">
                <div class="m-editor" contenteditable @focus="handleFocus" @input="handleInput" placeholder="请输入..."></div>
                <div class="input-slide" v-show="state">
                    <div class="submit-box d-flex">
                        <div class="face primary">添加表情</div>
                        <div class="submit-btn">
                            <b-button type="submit" :disabled="valid" variant="primary" size="sm" @click="handleSubmit">提交</b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MsgInupt",
        data() {
            return {
                value: '',
                valid: true
            }
        },
        props: ['state'],
        methods: {
            handleFocus() {
                this.$emit('showSubmit');
            },
            handleInput(e) {
                let text = e.target.innerText.replace(/(^\s*)|(\s*$)/g, '');
                this.valid = text.length > 0 ? false : true;
                this.value = text;
            },
            handleSubmit() {
                this.$emit('eventHandle', this.value);
            }
        }
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/mixi";

    .msg-input {
        .user {
            margin-right: .5rem;
        }
        .input-box {
            flex: 1;
        }
        .m-editor {
            padding: .6rem;
            font-size: @font14;
            line-height: 1;
            border: solid 1px #ced4da;
            border-radius: 0.2rem;
            outline: none;
            background-color: white;
            &:focus {
                border-color: #007bff;
            }
            &:empty:before {
                content: attr(placeholder);
                color: #909090;
            }

        }

        .submit-box {
            margin-top: .6rem;
            align-items: center;
            justify-content: space-between;
            .face {
                font-size: @font14;
            }
        }
    }
</style>