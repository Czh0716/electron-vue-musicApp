<template>
    <div class="column">
        <div class="empty" v-show="!list.length">
            <img src="../../../assets/empty.png" alt />
            <div>暂无收藏专栏</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    }
}
</script>

<style lang="less" scoped>
.column {
    .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 50px;
        img {
            width: 200px;
        }
    }
}
</style>