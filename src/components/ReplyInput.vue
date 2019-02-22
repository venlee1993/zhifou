<template>
    <div class="input-box">
        <div class="m-editor" contenteditable @input="handleInput" placeholder="请输入..." ref="input"></div>
        <div class="input-slide">
            <div class="submit-box d-flex">
                <div class="face primary">添加表情</div>
                <div class="submit-btn">
                    <b-button type="submit" :disabled="state" variant="primary" size="sm" @click="handleSubmit">提交</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ReplyInput",
        props: ['info'],
        data() {
            return {
                value: '',
                state: true
            }
        },
        mounted() {
            this.$emit('show', this.$el)
        },
        methods: {
            handleInput(e) {
                let val = e.target.innerText.replace(/(^\s*)|(\s*$)/g, '');
                this.state = val.length == 0 ? true : false;
                this.value = val;
            },
            handleSubmit() {
                let data = this.info;
                data.content = this.value;
                this.$emit('eventHandle', data)
            },
        },
    }
</script>

<style lang="less" scoped>
    @import "../assets/css/mixi";

    .m-editor {
        padding: .6rem;
        font-size: @font14;
        line-height: 1;
        border: solid 1px #007bff;
        border-radius: 0.2rem;
        outline: none;
        background-color: white;
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
</style>