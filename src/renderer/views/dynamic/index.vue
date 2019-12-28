<template>
    <div class="dynamic">
        <div class="content">
            <div class="header">动态</div>
        </div>
        <div class="side-bar"></div>
        <div class="list">
            <div class="item"></div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    async created() {
        const hotList = await this.$http.get(`/event`)
        console.log(hotList)
    }
}
</script>

<style lang="less" scoped>
.dynamic {
    @paddingX: 20px;
    display: flex;
    .header {
        padding: 20px @paddingX;
        font-size: 24px;
        border-bottom: 1px solid #e6e6e6;
    }
    .content {
        flex: 1;
    }
    .side-bar {
        width: 200px;
        background-color: skyblue;
        height: 700px;
    }
}
</style>