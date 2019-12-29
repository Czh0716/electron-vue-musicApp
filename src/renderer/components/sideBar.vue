<template>
    <div class="side-bar">
        <div class="bg-wrap">
            <div class="side-bar-title">
                Music App
                <v-icon>mdi-guitar-electric</v-icon>
            </div>

            <div class="player">
                <div class="control">
                    <div class="l">
                        <div class="cover-wrap">
                            <div
                                @click="openMusicDetail"
                                class="cover my-cover"
                                :style="`backgroundImage: url(${music.musicInfo.cover}?param=200y200)`"
                            ></div>
                        </div>
                        <div class="song-name">{{music.musicInfo.name}}</div>
                        <div class="singer">
                            <span
                                v-for="(item, index) in music.musicInfo.artists"
                                :key="item.id"
                            >{{index % 2 ? `/${item.name}` : item.name}}</span>
                        </div>
                    </div>
                    <div class="control-bar r">
                        <div class="btn" @click="$store.dispatch('getMusicMp3', {prev: true})">
                            <v-icon>mdi-skip-previous-outline</v-icon>
                        </div>

                        <div class="btn" @click="$store.dispatch('getMusicMp3', {next: true})">
                            <v-icon>mdi-skip-next-outline</v-icon>
                        </div>

                        <div class="play-btn btn">
                            <v-icon v-show="!music.playStatus" @click="playMusic">mdi-google-play</v-icon>
                            <v-icon
                                v-show="music.playStatus"
                                @click="pauseMusic"
                            >mdi-pause-octagon-outline</v-icon>
                        </div>
                    </div>
                </div>
                <div class="progress-line">
                    <div class="total-time">
                        <span>{{music.musicInfo.duration | transTime(true)}}</span>
                    </div>
                    <div class="base-line">
                        <div
                            class="cur-progress"
                            :style="`backgroundSize: ${music.currentProgress * 100}% 100%`"
                            @click.self="setMusicProgress"
                        ></div>
                    </div>
                    <div class="cur-time">
                        <span>{{music.currentTime}}</span>
                        <div>
                            <v-icon
                                :class="{liked}"
                                @click="$store.dispatch('likeMusic', {id: music.musicInfo.id, liked: !liked})"
                            >mdi-heart{{liked ?'' : '-outline'}}</v-icon>
                            <v-icon
                                @click="$store.dispatch('setPlayMode')"
                            >{{music.playModes[music.playMode]}}</v-icon>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="nav-list">
            <router-link to="/home" v-ripple class="nav-item">
                <div class="icon">
                    <v-icon>mdi-music-circle-outline</v-icon>
                </div>
                <div class="text">音乐馆</div>
            </router-link>
            <router-link to="/mv" v-ripple class="nav-item">
                <div class="icon">
                    <v-icon>mdi-library-video</v-icon>
                </div>
                <div class="text">MV</div>
            </router-link>
            <router-link to="/collect" v-ripple class="nav-item">
                <div class="icon">
                    <v-icon>mdi-map-legend</v-icon>
                </div>
                <div class="text">我的收藏</div>
            </router-link>
            <router-link to="/localMusic" v-ripple class="nav-item">
                <div class="icon">
                    <v-icon>mdi-monitor</v-icon>
                </div>
                <div class="text">本地音乐</div>
            </router-link>
            <div v-ripple class="nav-item">
                <div class="icon">
                    <v-icon>mdi-radio</v-icon>
                </div>
                <div class="text">电台</div>
            </div>
            <div v-ripple class="nav-item">
                <div class="icon">
                    <v-icon>mdi-folder-outline</v-icon>
                </div>
                <div class="text">下载管理</div>
            </div>
            <router-link to="/dynamic" v-ripple class="nav-item">
                <div class="icon">
                    <v-icon>mdi-spider-web</v-icon>
                </div>
                <div class="text">动态</div>
            </router-link>
            <router-link to="/playRecords" v-ripple class="nav-item">
                <div class="icon">
                    <v-icon>mdi-history</v-icon>
                </div>
                <div class="text">播放历史</div>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        music() {
            return this.$store.state.music
        },
        liked() {
            return this.$store.getters.likeList.includes(this.music.musicInfo.id)
        }
    },
    methods: {
        playMusic() {
            this.$store.commit('PLAY_MUSIC')
        },
        pauseMusic() {
            this.$store.commit('PAUSE_MUSIC')
        },
        setMusicProgress({ target, offsetX }) {
            let width = target.offsetWidth
            let progress = offsetX / width
            this.$store.commit('SET_PLAY_PROGRESS', {
                progress
            })
        },
        openMusicDetail() {
            this.$store.commit('TOGGLE_DETAIL_PAGE_SHOW')
        }
    }
}
</script>

<style lang="less"  scoped>
.side-bar {
    width: 260px;
    position: fixed;
    left: 0;
    top: 0;
    border-top-left-radius: 16px;
    overflow: hidden;
    .bg-wrap {
        background-color: var(--theme-color);
        color: #fff;
        .player {
            height: 220px;
            padding-top: 20px;
            padding: 0 30px;
            .control {
                display: flex;
                justify-content: space-between;
                .l {
                    flex: 1;
                    overflow: hidden;
                }
            }
            .progress-line {
                width: 100%;
                font-size: 13px;
                position: relative;
                .total-time {
                    position: absolute;
                    right: 0;
                    bottom: calc(100% + 6px);
                    line-height: 15px;
                    height: 15px;
                }
                .base-line {
                    height: 3px;
                    background-color: #dddddd;
                    margin: 6px 0;
                    position: relative;
                    .cur-progress {
                        height: 100%;
                        cursor: pointer;
                        background: linear-gradient(90deg, rgba(255, 192, 203, 0.671), pink);
                        background-repeat: no-repeat;
                    }
                }
                .cur-time {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    .v-icon {
                        font-size: 20px;
                        margin-left: 4px;
                        cursor: pointer;
                    }
                }
            }

            .cover {
                width: 116px;
                height: 116px;
                border-radius: 8px;
                box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
                position: relative;
                overflow: visible;
                cursor: pointer;
                &::before,
                &::after {
                    content: '';
                    background: inherit;
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    left: 0;
                    z-index: 1;
                    border-radius: 8px;
                }

                &::before {
                    z-index: 1;
                    bottom: -10px;
                    filter: blur(6px);
                    opacity: 0.8;
                    transform: scale(0.9);
                }
                &::after {
                    z-index: 2;
                    top: 0;
                }
            }
            .song-name {
                font-weight: 700;
                margin-bottom: 6px;
                letter-spacing: 1px;
                margin-top: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .singer {
                color: rgba(255, 255, 255, 0.8);
                font-size: 12px;
                letter-spacing: 1px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                line-height: 15px;
                height: 15px;
            }
            .control-bar {
                color: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                .v-icon {
                    font-size: 28px;
                }
                .play-btn {
                    .v-icon {
                        font-size: 32px;
                    }
                }
                .btn {
                    cursor: pointer;
                    position: relative;
                    + .btn {
                        margin-top: 14px;
                    }
                    &::before {
                        content: '';
                        position: absolute;
                        width: 100%;
                        height: 100%;
                        background-color: white;
                        border-radius: 50%;
                        transform: scale(0);
                        transition: 0.3s;
                        box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.15);
                    }
                    &:hover {
                        &::before {
                            transform: scale(1.5);
                        }
                        .v-icon {
                            color: var(--theme-color) !important;
                        }
                    }
                    .v-icon {
                        position: relative;
                        z-index: 5;
                    }
                }
            }
        }
    }
    .side-bar-title {
        line-height: 60px;
        text-align: center;
        font-size: 24px;
        font-weight: 700;
        font-style: italic;
    }

    .nav-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
        padding: 20px;
        .nav-item {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 90px;
            height: 90px;
            border-radius: 10px;
            font-size: 14px;
            transition: 0.3s;
            cursor: pointer;
            margin-bottom: 10px;
            .v-icon {
                font-size: 24px;
                margin-bottom: 10px;
                transition: none;
            }

            &.active {
                background-color: var(--theme-color);
                color: #fff;
                box-shadow: 0px 0px 14px 0px rgba(0, 0, 0, 0.158);
            }
        }
    }
}
</style>