<template>
    <div class="layout">
        <Header></Header>
        <b-container>
            <b-row>
                <b-col :md="9">
                    <div class="setting-content">
                        <b-form>
                            <b-input-group size='lg' prepend="$" append=".00">
                                <b-form-input />
                            </b-input-group>
                        </b-form>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Header from '../layout/Header'

    export default {
        name: "Setting",
        components: {
            Header
        }
    }
</script>

<style lang="less" scoped>
    @import "../../assets/css/mixi";

    .layout {
        min-height: 100vh;
    }

    .setting-content {
        background-color: white;
    }
</style>