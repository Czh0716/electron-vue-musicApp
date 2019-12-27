<template>
    <div class="singer">
        <div class="empty" v-show="!list.length">
            <img src="../../../assets/empty.png" alt />
            <div>暂无收藏歌手</div>
        </div>
        <div class="item" v-for="item in list" :key="item.id">
            <div class="cover">
                <div class="my-cover" :style="`backgroundImage: url(${item.picUrl})`"></div>
                <div class="name">{{item.name}}</div>
            </div>
            <div class="album-num">专辑数：{{item.albumSize}}</div>
            <div class="mv-num">mv数：{{item.mvSize}}</div>
        </div>
    </div>
</template>

<script>
export default {
    async created() {
        const { data } = await this.$http.get('/artist/sublist')
        console.log(data.data)
        this.list = data.data
    },
    data() {
        return {
            list: []
        }
    }
}
</script>

<style lang="less" scoped>
.singer {
    .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 50px;
        img {
            width: 200px;
        }
    }
    .item {
        display: flex;
        align-items: center;
        > * {
            padding-right: 30px;
        }
        .cover {
            flex: 3;
            display: flex;
            align-items: center;
            .my-cover {
                width: 50px;
                height: 50px;
                border-radius: 4px;
            }
            .name {
                margin-left: 10px;
            }
        }
    }
}
</style>