<template>
    <div class="layout">

        <div class="header">
            <div class="title">
                <input type="text" placeholder="输入文章标题..." v-model="formData.title" class="titie-input">
            </div>
            <div class="options">
                <div class="d-flex inner">
                    <div class="publish">
                        <b-btn size="sm" variant="primary" @click="showModal">发布</b-btn>
                    </div>
                    <div class="avatar">
                        <!--<b-img width="36" height="36" :src="user.avatar" rounded="circle" alt="Circle image"/>-->
                    </div>
                </div>
            </div>
        </div>

        <mavon-editor v-model="text" :toolbars="toolbar" :boxShadow="false" @change="handleChange" class="markdown"></mavon-editor>

        <b-modal title="发布" v-model="show" size="lg" @hidden="handleHidden" :centered="true">
            <b-form @submit="handleSubmit" class="publish-option">
                <b-form-group label="分类">
                    <b-form-radio-group v-model="formData.column_id" :options="options" name="column_id"/>
                </b-form-group>
                <b-form-group>
                    <label for="tag">标签</label>
                    <b-form-input id="tag" type="text" placeholder="自定义标签" v-model="formData.tag"/>
                </b-form-group>
            </b-form>
            <div slot="modal-footer">
                <b-button type="button" size="sm" @click="handleHidden">取消</b-button>
                <b-button type="button" variant="primary" size="sm" @click="handleSubmit" style="margin-left: 1rem">发布</b-button>
            </div>
        </b-modal>

    </div>
</template>

<script>
    import "mavon-editor/dist/css/index.css"
    import {mavonEditor} from 'mavon-editor'
    import config from './editorconfig'
    import {mapState} from 'vuex'

    export default {
        name: "Create",
        data() {
            return {
                title: '',
                text: '',
                formData: {title: '', content: '', column_id: 9, tag: ''},
                toolbar: config,
                show: false,
                selected: 9,
                options: [
                    {text: '前端', value: 2},
                    {text: 'IOS', value: 3},
                    {text: '产品', value: 5},
                    {text: '设计', value: 6},
                    {text: '后端', value: 7},
                    {text: '工具资源', value: 8},
                    {text: 'Ardriod', value: 1},
                    {text: '阅读', value: 9},
                    {text: '运维', value: 10}
                ]
            }
        },
        components: {
            mavonEditor
        },
        computed: {
            ...mapState(['user'])
        },
        methods: {
            handleHidden() {
                this.show = false
            },
            showModal() {
                this.show = true
            },
            handleSubmit(evt) {
                evt.preventDefault();
                this.$http.post('/api/post/store', this.formData).then(res => {
                    if (res.status == 201) {
                        const id = res.data.post_id
                        this.$router.push(`/post/${id}/detail`);
                    }
                })
            },
            handleChange(value, render) {
                this.formData.content = render;
            }
        }
    }
</script>

<style lang="less" scoped>
    .layout {
        display: flex;
        flex-direction: column;
        padding-top: 0;
        height: 100vh;
        overflow: hidden;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: white;
        .title {
            margin-left: 1rem;
            width: 50%;
            .titie-input {
                width: 100%;
                font-size: 1.4rem;
                padding: .8rem;
                line-height: 1;
                border: none;
                outline: none;
            }
        }
        .options {
            margin-right: 2rem;
            .inner {
                align-items: center;
                .publish {
                    margin-right: 1rem;
                }
            }
        }
    }

    .markdown {
        flex: 1;
    }

</style>