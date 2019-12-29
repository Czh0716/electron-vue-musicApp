<template>
    <div class="rankDetail">
        <div class="content" v-if="Object.keys(detailInfo).length">
            <div class="rank-header">
                <div
                    class="cover my-cover"
                    :style="`backgroundImage: url(${detailInfo.coverImgUrl})`"
                ></div>
                <div class="rank-info">
                    <div class="tit">
                        <div class="name">{{detailInfo.name}}</div>
                        <div class="count">
                            <span class="track-count">歌曲数：{{detailInfo.trackCount}}</span>
                            <span class="divider"></span>
                            <span>播放数：{{detailInfo.playCount | playCount}}</span>
                        </div>
                    </div>
                    <div class="author">
                        <div
                            class="avatar my-cover"
                            :style="`backgroundImage: url(${detailInfo.creator.avatarUrl})`"
                        ></div>
                        <div class="name">{{detailInfo.creator.nickname}}</div>
                        <div class="date">最近更新：{{detailInfo.updateTime | formatDate}}</div>
                    </div>
                    <div class="operation">
                        <div class="play-btn btn main">
                            <v-icon>mdi-play-outline</v-icon>全部播放
                        </div>
                        <div class="collect-btn btn">
                            <v-icon>mdi-map-legend</v-icon>收藏
                        </div>
                        <div class="share-btn btn">
                            <v-icon>mdi-share</v-icon>分享
                        </div>
                    </div>
                    <div class="tag">
                        标签：{{detailInfo.tags.length ? '' : '无'}}
                        <span
                            v-for="(tag, index) in detailInfo.tags"
                            :key="index"
                        >
                            <span class="divider" v-if="index !== 0">/</span>
                            <span class="text">{{tag}}</span>
                        </span>
                    </div>
                    <div class="description">简介：{{detailInfo.description || '无'}}</div>
                </div>
            </div>
            <div class="song-list">
                <div class="list-title">
                    <div class="item">歌曲</div>
                    <div class="item">歌手</div>
                    <div class="item">专辑</div>
                    <div class="item">时长</div>
                </div>
                <div
                    v-ripple
                    class="list-item"
                    v-for="(item, index) in detailInfo.tracks"
                    :key="item.id"
                    @click="$store.dispatch('getMusicMp3', {id: item.id})"
                >
                    <div class="name item">
                        <span class="num">{{(index + 1).toString().padStart(2, '0')}}</span>
                        <v-icon
                            class="collect"
                            :class="{liked: $store.getters.likeList.includes(item.id)}"
                            @click.stop="$store.dispatch('likeMusic', {id: item.id, liked: !$store.getters.likeList.includes(item.id)})"
                        >mdi-heart{{ $store.getters.likeList.includes(item.id) ?'' : '-outline'}}</v-icon>

                        <span class="text-cut">{{item.name}}</span>
                    </div>
                    <div class="artist item text-cut">
                        <span
                            v-for="(ar, index) in item.ar"
                            :key="index"
                        >{{index === 0 ? ar.name : `/${ar.name}`}}</span>
                    </div>
                    <div class="album item text-cut">{{item.al.name}}</div>
                    <div class="duration item">{{item.dt | transTime}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home_songListDetail',
    async created() {
        const { data } = await this.$http.get(`/playlist/detail?id=${this.$route.params.id}`)
        this.detailInfo = data.playlist
    },
    data() {
        return {
            detailInfo: {}
        }
    },
    methods: {}
}
</script>

<style lang="less" scoped>
.rankDetail {
    padding: 20px 0;
    .rank-header {
        padding: 0 30px;
        display: flex;
        .rank-info {
            width: 100%;
        }
        .tit {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            .name {
                font-size: 24px;
                font-weight: 700;
            }
            .count {
                font-size: 13px;
                color: #aaa;
                display: flex;
                align-items: center;
                flex-shrink: 0;
            }
            .divider {
                display: inline-block;
                height: 13px;
                width: 1px;
                background-color: #aaa;
                margin: 0 10px;
            }
        }
        .author {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            .avatar {
                width: 30px;
                height: 30px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
            }
            .name {
                margin-right: 30px;
            }
            .date {
                font-size: 12px;
                color: #aaa;
            }
        }
        .operation {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            .btn {
                width: 120px;
                padding: 5px 0;
                border-radius: 14px;
                background-color: #e6e6e6;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-right: 10px;
                font-size: 13px;
                .v-icon {
                    margin-right: 10px;
                }
                &.main {
                    background-color: var(--theme-color);
                    color: white;
                }
            }
        }
        .tag {
            font-size: 13px;
            .text {
                color: skyblue;
            }
            .divider {
                margin: 0 4px;
            }
        }
        .description {
            height: 48px;
            line-height: 24px;
            font-size: 13px;
            overflow: hidden;
        }
    }
    .cover {
        width: 200px;
        height: 200px;
        border-radius: 10px;
        margin-right: 30px;
        flex-shrink: 0;
    }
    .list-title,
    .list-item {
        font-size: 13px;
        color: rgb(90, 90, 90);
        display: flex;
        padding: 10px 30px;
        .item {
            flex: 1;
            padding-right: 20px;
            overflow: hidden;
            &:nth-child(1) {
                flex: 2.2;
            }
            &:nth-child(4) {
                flex: 0.3;
                padding-right: 0;
            }
        }
    }
    .list-item {
        font-size: 13px;
        color: black;
        transition: 0.3s;
        cursor: pointer;
        .name {
            display: flex;
            align-items: center;
        }
        .collect {
            margin-right: 6px;
            cursor: pointer;
            font-size: 20px;
            &:hover {
                color: #f7a168 !important;
            }
        }
        .num {
            margin-right: 20px;
        }
        &:hover {
            background-color: rgba(0, 0, 0, 0.06);
        }
    }
}
</style>