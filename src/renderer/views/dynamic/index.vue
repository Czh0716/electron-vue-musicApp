<template>
    <div class="dynamic">
        <div class="content">
            <div class="header">
                <div class="tit">动态</div>
                <div class="write">
                    <v-icon>mdi-plus</v-icon>写动态
                </div>
            </div>
            <div class="list">
                <div class="item" v-for="item in list" :key="item.id">
                    <div
                        class="avatar my-cover"
                        :style="`backgroundImage: url(${item.user.avatarUrl}?param=100y100)`"
                    ></div>
                    <div class="tit">
                        <span class="user-name">{{item.user.nickname}}</span>
                        <span class="type">{{types[item.type]}}</span>
                    </div>
                    <div class="publish-time">{{item.showTime | formatDate('MM-dd HH:mm')}}</div>

                    <div class="item-content">
                        <div class="msg">{{item.content.msg}}</div>
                        <div class="song" v-if="item.type === 18">
                            <div
                                class="song-cover my-cover"
                                :style="`backgroundImage: url(${item.content.song.album.picUrl}?param=80y80)`"
                            ></div>
                            <div class="info">
                                <div class="name">{{item.content.song.name}}</div>
                                <div class="at">
                                    <span
                                        v-for="(at, index) in item.content.song.artists"
                                        :key="at.id"
                                    >{{index === 0 ? at.name : `/${at.name}`}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="video" v-if="item.type === 39">
                            <div
                                class="video-cover my-cover"
                                :style="`backgroundImage: url(${item.content.video.coverUrl}?param=300y150)`"
                            ></div>
                            <div class="info">
                                <div class="tit">{{item.content.video.title}}</div>
                                <div class="desc text-cut-2">{{item.content.video.description}}</div>
                                <div class="count">
                                    <div class="play-count">
                                        <v-icon>mdi-play-box-outline</v-icon>
                                        {{item.content.video.playTime | playCount}}
                                    </div>
                                    <div
                                        class="duration"
                                    >{{item.content.video.durationms | transTime}}</div>
                                </div>
                            </div>
                        </div>
                        <div class="pic-wrap" v-if="item.pics.length">
                            <div
                                :class="`pic my-cover zoom-${item.pics.length===1 ? 1 : 'oth'}`"
                                v-for="(pic, index) in item.pics"
                                :key="index"
                                :style="`backgroundImage: url(${pic.originUrl}?param=300y300)`"
                            ></div>
                        </div>

                        <div class="count-bar">
                            <div class="text">{{item.rcmdInfo.reason}}</div>
                            <div class="counts">
                                <div :class="{liked : item.info.liked} ">
                                    <v-icon>mdi-thumb-up-outline</v-icon>
                                    {{item.info.likedCount}}
                                </div>
                                <div>
                                    <v-icon>mdi-share</v-icon>
                                    {{item.info.shareCount}}
                                </div>
                                <div>
                                    <v-icon>mdi-comment-processing-outline</v-icon>
                                    {{item.info.commentCount}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="side-bar">
            <div class="sticky">
                <div class="user-info">
                    <div class="info-hd">
                        <div class="avatar my-cover"></div>
                        <div class="name">czh boom</div>
                    </div>
                    <div class="count">
                        <div class="dnm">
                            <div class="num">3</div>
                            <div>动态</div>
                        </div>
                        <div class="followed">
                            <div class="num">3</div>
                            <div>关注</div>
                        </div>
                        <div class="fans">
                            <div class="num">4</div>
                            <div>粉丝</div>
                        </div>
                    </div>
                </div>
                <div class="hot-topic">
                    <div class="tit">热门话题</div>
                    <div class="list">
                        <div class="item" v-for="n in 5" :key="n">
                            <div class="cover my-cover"></div>
                            <div class="info">
                                <div class="name text-cut">#ashhh#</div>
                                <div class="count">123123</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
            types: {
                18: '分享单曲',
                21: '分享MV',
                36: '发布动态',
                39: '发布视频'
            }
        }
    },
    async created() {
        const { data } = await this.$http.get(`/event`)
        this.list = data.event.map(item => {
            return {
                ...item,
                content: JSON.parse(item.json)
            }
        })
    }
}
</script>

<style lang="less" scoped>
.dynamic {
    @paddingX: 20px;
    display: flex;
    .header {
        padding: 14px @paddingX;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .tit {
            font-size: 24px;
        }
        .write {
            display: flex;
            align-items: center;
            padding: 4px 10px;
            border-radius: 14px;
            background-color: var(--theme-color);
            color: white;
            font-size: 13px;
            cursor: pointer;
            .v-icon {
                font-size: 18px;
            }
        }
    }
    .content {
        flex: 1;
        border-right: 1px solid #e6e6e6;
        .list {
            padding: 0 @paddingX;
        }
        .item {
            padding: 20px 0 20px 60px;
            margin-bottom: 20px;
            border-bottom: 1px solid #e6e6e6;
            position: relative;
            .avatar {
                position: absolute;
                top: 20px;
                left: 0;
                width: 46px;
                height: 46px;
                border-radius: 50%;
            }
            .tit {
                .user-name {
                    color: rgb(160, 223, 248);
                }
                .type {
                    margin-left: 10px;
                    color: #aaa;
                }
            }
            .publish-time {
                margin-top: 6px;
                font-size: 13px;
                color: #aaa;
            }
            .item-content {
                margin-top: 10px;

                .song {
                    display: flex;
                    border-radius: 2px;
                    background-color: rgba(0, 0, 0, 0.05);
                    padding: 10px 14px;
                    cursor: pointer;
                    transition: 0.3s;
                    margin-top: 10px;
                    &:hover {
                        background-color: rgba(0, 0, 0, 0.035);
                    }
                    .song-cover {
                        width: 40px;
                        height: 40px;
                        border-radius: 2px;
                        margin-right: 14px;
                    }
                    .info {
                        font-size: 12px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        .at {
                            color: #aaa;
                        }
                    }
                }

                .video {
                    border-radius: 4px;
                    overflow: hidden;
                    display: flex;
                    margin-top: 10px;
                    border: 1px solid #e6e6e6;
                    .video-cover {
                        width: 220px;
                        height: 140px;
                        flex-shrink: 0;
                    }
                    .info {
                        padding: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-around;
                        .desc {
                            font-size: 13px;
                            color: #aaa;
                        }

                        .tit,
                        .desc {
                            line-height: 20px;
                        }

                        .count {
                            display: flex;
                            color: #aaa;
                            justify-content: space-between;
                            align-items: center;
                            .play-count {
                                display: flex;
                                align-items: center;
                            }
                            .v-icon {
                                font-size: 16px;
                                margin-right: 6px;
                            }
                        }
                    }
                }

                .pic-wrap {
                    display: flex;
                    flex-wrap: wrap;
                    margin-top: 10px;
                    width: 400px;
                    .pic {
                        border-radius: 4px;
                    }
                    .zoom-1 {
                        width: 220px;
                        height: 220px;
                    }
                    .zoom-oth {
                        width: 116px;
                        height: 116px;
                        margin-right: 6px;
                        margin-bottom: 6px;
                    }
                }

                .count-bar {
                    display: flex;
                    font-size: 13px;
                    color: #aaa;
                    justify-content: space-between;
                    margin-top: 20px;
                    .text {
                        display: flex;
                        align-items: center;
                        &::before {
                            content: '';
                            display: block;
                            height: 1px;
                            width: 40px;
                            background-color: #aaa;
                            margin-right: 10px;
                        }
                    }
                    .v-icon {
                        font-size: 16px;
                        margin-right: 4px;
                    }
                    .counts {
                        display: flex;
                        > * {
                            margin-left: 30px;
                            cursor: pointer;
                            transition: 0.3s;
                            &:hover {
                                color: skyblue !important;
                            }
                        }

                        .liked {
                            color: skyblue !important;
                        }
                    }
                }
            }
        }
    }
    .side-bar {
        width: 240px;
        height: 700px;
        position: relative;
        .sticky {
            position: fixed;
            width: 240px;
        }
    }

    .user-info {
        padding: @paddingX;
        background-color: #fafafa;

        .info-hd {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background-color: #aaa;
                margin-right: 20px;
            }
        }
        .count {
            display: flex;
            > * {
                flex: 1;
                text-align: center;
                border-right: 1px solid #e6e6e6;
                &:last-child {
                    border-right: none;
                }
                .num {
                    cursor: pointer;
                    margin-bottom: 10px;
                }
            }
        }
    }

    .hot-topic {
        padding: @paddingX;
        .tit {
            font-size: 13px;
            margin-bottom: 20px;
        }
        .item {
            display: flex;
            + .item {
                margin-top: 10px;
            }
            .cover {
                width: 40px;
                height: 40px;
                border-radius: 2px;
                margin-right: 10px;
                background-color: #fafafa;
            }
            .info {
                font-size: 13px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                padding: 4px 0;
                .count {
                    color: #aaa;
                }
            }
        }
    }
}
</style>