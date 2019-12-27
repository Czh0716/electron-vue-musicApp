<template>
    <div class="video-player">
        <div class="l">
            <div class="player">
                <video
                    autoplay
                    controls
                    :src="videoDetail.brs[Object.keys(videoDetail.brs).slice(-1)[0]]"
                ></video>
            </div>
            <div class="operation">
                <div>
                    <v-icon>mdi-thumb-up-outline</v-icon>
                    {{videoDetail.likeCount | playCount}}
                </div>
                <div>
                    <v-icon>mdi-star-face</v-icon>
                    {{videoDetail.subCount | playCount}}
                </div>
                <div>
                    <v-icon>mdi-share</v-icon>
                    {{videoDetail.shareCount | playCount}}
                </div>
            </div>
            <div class="comment">
                <div class="tit">评论</div>
                <div class="list">
                    <div class="item" v-for="item in commentList" :key="item.id">
                        <div
                            class="avatar my-cover"
                            :style="`backgroundImage: url(${item.user.avatarUrl}?param=100y100)`"
                        ></div>
                        <div class="content">
                            <div class="name">{{item.user.nickname}}</div>
                            <div class="text">{{item.content}}</div>
                            <div class="time">
                                <div>{{new Date(item.time).toLocaleDateString()}}</div>
                                <div>
                                    <v-icon>mdi-thumb-up-outline</v-icon>
                                    {{item.likedCount ? item.likedCount : ''}}
                                </div>
                                <div>回复</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="r">
            <div class="introduction">
                <div
                    class="cover my-cover"
                    :style="`backgroundImage: url(${videoDetail.cover}?param=400y200)`"
                ></div>
                <div>{{videoDetail.name}}</div>
                <div>{{videoDetail.artistName}}</div>
                <div>
                    <span>发布时间：</span>
                    <span>{{videoDetail.publishTime}}</span>
                </div>
                <div>
                    <span>播放次数：</span>
                    <span>{{videoDetail.playCount | playCount}}</span>
                </div>
            </div>
            <div class="correlation">
                <div class="tit">相关推荐</div>
                <div class="list">
                    <div
                        class="item"
                        v-for="item in simiMvs"
                        :key="item.id"
                        @click="getVideo(item.id)"
                    >
                        <div
                            class="cover my-cover"
                            :style="`backgroundImage: url(${item.cover}?param=400y200)`"
                        ></div>
                        <div class="info">
                            <div class="name">{{item.name}}</div>
                            <div class="artist">{{item.artistName}}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'mv_videoPlayer',
    created() {
        this.getVideo(this.videoId)
    },
    data() {
        return {
            videoId: this.$route.params.id,
            playMp4: '',
            videoDetail: null,
            simiMvs: [],
            commentList: []
        }
    },
    methods: {
        getVideo(id) {
            this.$http
                .get(`/mv/detail?mvid=${id}`)
                .then(res => {
                    console.log(res)

                    this.videoDetail = res.data.data
                })
                .catch(err => {})

            this.$http
                .get(`/simi/mv?mvid=${id}`)
                .then(res => {
                    this.simiMvs = res.data.mvs
                })
                .catch(err => {})

            this.$http
                .get(`/comment/mv?id=${id}`)
                .then(res => {
                    this.commentList = res.data.comments
                })
                .catch(err => {})
        }
    }
}
</script>

<style lang="less" scoped>
.video-player {
    display: flex;
    padding: 20px;

    .l {
        width: 72%;
        flex-shrink: 0;
        .operation {
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
            margin-bottom: 10px;
            div {
                margin-left: 20px;
                display: flex;
                align-items: center;
                color: #505050;
                cursor: pointer;
                .v-icon {
                    margin-right: 4px;
                }
            }
        }
        .comment {
            .tit {
                padding-bottom: 10px;
                border-bottom: 1px solid #e6e6e6;
                margin-bottom: 20px;
                text-align: center;
                color: var(--theme-color);
            }
            .item {
                display: flex;
                + .item {
                    margin-top: 20px;
                }
                .avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    margin-right: 30px;
                    margin-left: 10px;
                    flex-shrink: 0;
                }
                .content {
                    border-bottom: 1px solid #e6e6e6;
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    padding-bottom: 10px;
                }
                .name {
                    font-size: 12px;
                }
                .text {
                    font-size: 14px;
                    margin: 10px 0;
                }
                .time {
                    font-size: 10px;
                    display: flex;
                    div {
                        display: flex;
                        align-items: center;
                        margin-right: 20px;
                    }
                    .v-icon {
                        font-size: 12px;
                    }
                }
            }
        }
    }
    .r {
        width: 100%;
        margin-left: 20px;
        .introduction {
            font-size: 14px;
            padding: 10px 16px;
            margin-bottom: 20px;
            box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);
            border-radius: 6px;
            .cover {
                width: 100%;
                padding-top: 50%;
                border-radius: 4px;
            }
            div {
                margin-bottom: 10px;
            }
        }
        .correlation {
            .tit {
                border-bottom: 1px solid #e6e6e6;
                line-height: 24px;
                font-weight: 700;
            }
            .item {
                padding: 10px;
                display: flex;
                cursor: pointer;
            }
            .cover {
                width: 60%;
                padding-top: 30%;
                border-radius: 4px;
                margin-right: 10px;
                flex-shrink: 0;
            }
            .name,
            .artist {
                font-size: 12px;
            }
            .name {
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
                overflow: hidden;
            }
            .artist {
                color: #aaa;
                margin-top: 4px;
            }
        }
    }
    .player {
        width: 100%;
        overflow: hidden;
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);
        border-radius: 4px;

        video {
            width: 100%;
            border-radius: 4px;
            display: block;
        }
    }
}
</style>