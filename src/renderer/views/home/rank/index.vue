<template>
    <div class="rank">
        <div class="main-rank">
            <div
                class="item"
                v-for="(item) in mainRanks"
                :key="item.id"
                @click="goRankDetail(item.name)"
            >
                <div class="cover my-cover" :style="`backgroundImage: url(${item.coverImgUrl})`"></div>
                <div class="list">
                    <div class="song-row" v-for="(row, index) in item.mySongs" :key="row.id">
                        <div class="row-l">
                            <div class="num">{{index + 1}}</div>
                            <div class="name">{{row.al.name}}</div>
                        </div>
                        <div class="artists">
                            <span v-for="artist in row.ar" :key="artist.id">{{artist.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="other-rank">
            <router-link
                tag="div"
                :to="`/home/rankDetail/${item.name}`"
                class="item"
                v-for="(item) in otherRanks"
                :key="item.id"
            >
                <div class="cover my-cover" :style="`backgroundImage: url(${item.coverImgUrl})`">
                    <div class="cover-box">
                        <v-icon>mdi-headphones</v-icon>
                        {{item.playCount | playCount}}
                    </div>
                </div>
                <div class="name">{{item.name}}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home_rank',
    created() {
        this.$http
            .get('/toplist')
            .then(res => {
                this.mainRanks = res.data.list.splice(0, 4)
                this.otherRanks = res.data.list
                this.mainRanks.forEach((item, index) => {
                    this.getMainRankSongs(item.name, index)
                })
            })
            .catch(err => {})
    },
    data() {
        return {
            mainRanks: [],
            otherRanks: [],
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
    },
    methods: {
        getMainRankSongs(name, idx) {
            let target = this.rankKeys.findIndex(item => {
                return item === name
            })
            this.$http
                .get(`/top/list?idx=${target}`)
                .then(res => {
                    this.$set(
                        this.mainRanks[idx],
                        'mySongs',
                        res.data.playlist.tracks.slice(0, 7)
                    )
                })
                .catch(err => {})
        },
        goRankDetail(name) {
            this.$router.push(`/home/rankDetail/${name}`)
        }
    }
}
</script>

<style lang="less" scoped>
.rank {
    padding: 20px 30px;
    .main-rank {
        display: flex;
        justify-content: space-between;
        .item {
            width: 190px;
            box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);
            border-radius: 4px;
            overflow: hidden;
        }
        .cover {
            height: 100px;
            cursor: pointer;
        }
        .list {
            font-size: 12px;
            padding: 4px 0px;
            .song-row {
                display: flex;
                padding: 4px 6px;
                justify-content: space-between;
                overflow: hidden;
                .row-l {
                    display: flex;
                    max-width: 120px;
                }
                .num {
                    width: 16px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    border-radius: 50%;
                    flex-shrink: 0;
                    margin-right: 5px;
                }
                .name,
                .artists {
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                .artists {
                    color: #aaa;
                    margin-left: 10px;
                }
            }
        }
    }
    .other-rank {
        margin-top: 30px;
        display: flex;
        flex-wrap: wrap;
        .item {
            width: 150px;
            padding: 6px;
            margin-right: 18.5px;
            margin-bottom: 16px;
            border-radius: 4px;
            overflow: hidden;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            transition: 0.3s;
            &:nth-child(5n) {
                margin-right: 0;
            }
            &:hover {
                transform: translateY(-10px);
            }
        }

        .cover {
            width: 100%;
            padding-top: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            overflow: hidden;
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: rgba(0, 0, 0, 0.3);
            }
        }
        .name {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 12px;
            margin-top: 6px;
            color: rgb(69, 69, 69);
        }
        .cover-box {
            position: absolute;
            width: 100%;
            left: 0;
            top: 0;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            color: white;
            font-size: 12px;
            padding: 4px;
            .v-icon {
                font-size: 14px;
                margin-right: 4px;
            }
        }
    }
}
</style>