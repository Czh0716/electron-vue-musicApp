<template>
    <div class="video">
        <div class="empty" v-show="!list.length">
            <img src="../../../assets/empty.png" alt />
            <div>暂无收藏视频</div>
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
.video {
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