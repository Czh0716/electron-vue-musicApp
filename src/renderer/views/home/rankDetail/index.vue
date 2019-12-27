<template>
    <div class="rankDetail">
        <div class="content" v-if="Object.keys(rankDetailInfo).length">
            <div class="rank-header">
                <div
                    class="cover my-cover"
                    :style="`backgroundImage: url(${rankDetailInfo.coverImgUrl})`"
                ></div>
                <div class="rank-info">
                    <div class="tit">
                        <div class="name">{{rankDetailInfo.name}}</div>
                        <div class="count">
                            <span class="track-count">歌曲数：{{rankDetailInfo.trackCount}}</span>
                            <span class="divider"></span>
                            <span>播放数：{{rankDetailInfo.playCount | playCount}}</span>
                        </div>
                    </div>
                    <div class="author">
                        <div
                            class="avatar my-cover"
                            :style="`backgroundImage: url(${rankDetailInfo.creator.avatarUrl})`"
                        ></div>
                        <div class="name">{{rankDetailInfo.creator.nickname}}</div>
                        <div class="date">最近更新：{{new Date(rankDetailInfo.updateTime)}}</div>
                    </div>
                    <div class="operation">
                        <div class="play-btn btn main">
                            <v-icon>mdi-play-outline</v-icon>全部播放
                        </div>
                        <div class="collect-btn btn">
                            <v-icon>mdi-map-legend</v-icon>收藏
                        </div>
                    </div>
                    <div class="description">简介：{{rankDetailInfo.description}}</div>
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
                    @click="$store.dispatch('getMusicMp3', {id: item.id})"
                    class="list-item"
                    v-for="(item, index) in rankDetailInfo.tracks"
                    :key="item.id"
                >
                    <div class="name item">
                        <span class="num">{{(index + 1).toString().padStart(2, '0')}}</span>
                        <v-icon class="collect">mdi-heart-outline</v-icon>
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
    name: 'home_rankDetail',
    created() {
        const idx = this.rankKeys.indexOf(this.$route.params.id)
        this.$http
            .get(`/top/list?idx=${idx}`)
            .then(res => {
                console.log(res)
                this.rankDetailInfo = res.data.playlist
            })
            .catch(err => {})
    },
    data() {
        return {
            rankDetailInfo: {},
            rankKeys: [
                '云音乐新歌榜',
                '云音乐热歌榜',
                '网易原创歌曲榜',
                '云音乐飙升榜',
                '云音乐电音榜',
                'UK排行榜周榜',
                '美国Billboard周榜',
                'KTV嗨榜',
                'iTunes榜',
                'Hit FM Top榜',
                '日本Oricon周榜',
                '韩国Melon排行榜周榜',
                '韩国Mnet排行榜周榜',
                '韩国Melon原声周榜',
                '中国TOP排行榜(港台榜)',
                '中国TOP排行榜(内地榜)',
                '香港电台中文歌曲龙虎榜',
                '华语金曲榜',
                '中国嘻哈榜',
                '法国 NRJ EuroHot 30周榜',
                '台湾Hito排行榜',
                'Beatport全球电子舞曲榜',
                '云音乐ACG音乐榜',
                '云音乐说唱榜',
                '云音乐古典音乐榜',
                '云音乐电音榜',
                '抖音排行榜',
                '新声榜',
                '云音乐韩语榜',
                '英国Q杂志中文版周榜',
                '电竞音乐榜',
                '云音乐欧美热歌榜',
                '云音乐欧美新歌榜',
                '说唱TOP榜'
            ]
        }
    }
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
        padding: 10px 30px;
        font-size: 13px;
        color: rgb(90, 90, 90);
        display: flex;
        cursor: pointer;
        .item {
            flex: 1;
            overflow: hidden;
            padding-right: 20px;

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
        font-size: 14px;
        color: black;
        transition: 0.3s;
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