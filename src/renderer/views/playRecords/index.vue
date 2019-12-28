<template>
    <div class="play-records">
        <div class="header">播放历史</div>
        <div class="count">共{{playList.length}}首</div>
        <div class="list">
            <div class="item">
                <div class="list-col name">歌曲</div>
                <div class="list-col at">歌手</div>
                <div class="list-col album">专辑</div>
                <div class="list-col play-count">播放次数</div>
            </div>
            <div
                class="item"
                v-for="(item, index) in playList"
                :key="index"
                :class="{active: $store.state.music.musicInfo.id === item.song.id}"
                @click="$store.dispatch('getMusicMp3', {id: item.song.id})"
            >
                <div class="text-cut list-col name">{{item.song.name}}</div>
                <div class="text-cut list-col at">
                    <span
                        v-for="(ar, index) in item.song.ar"
                        :key="ar.id"
                    >{{index === 0 ? ar.name : `/${ar.name}`}}</span>
                </div>
                <div class="text-cut list-col album">{{item.song.al.name}}</div>
                <div class="text-cut list-col play-count">{{item.playCount}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            playList: []
        }
    },
    async created() {
        const uid = this.$store.state.user.userInfo.userId
        const { data } = await this.$http.get(`/user/record?uid=${uid}&type=0`)
        this.playList = data.allData
    }
}
</script>

<style lang="less" scoped>
.play-records {
    @paddingX: 20px;
    .header {
        padding: 20px @paddingX;
        font-size: 24px;
    }
    .count {
        font-size: 12px;
        padding: 0 @paddingX;
    }
    .list {
        margin-top: 20px;

        .item {
            display: flex;
            padding: 10px @paddingX;
            transition: 0.3s;
            &:hover {
                background-color: rgba(0, 0, 0, 0.12);
                cursor: pointer;
            }
            &.active {
                background-color: rgba(0, 0, 0, 0.12);
            }
            .list-col {
                flex: 1;
                padding-right: 16px;
            }
            .name {
                flex: 2;
            }
            .play-count {
                flex: 0.5;
            }
        }
    }
}
</style>