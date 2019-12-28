<template>
    <div class="detail">
        <div class="bg">
            <div class="pic my-cover" :style="`backgroundImage: url(${music.musicInfo.cover}?param=300y300)`"></div>
        </div>
        <div
            class="cover my-cover"
            :class="{move: $store.state.app.detailPageIsShow}"
            :style="`backgroundImage: url(${music.musicInfo.cover}?param=300y300)`"
        ></div>
        <div class="music-info">
            <div class="name">{{music.musicInfo.name}}</div>
            <div class="artist">
                歌手：
                <span
                    v-for="(artist, index) in music.musicInfo.artists"
                    :key="artist.id"
                >{{index === 0 ? artist.name : `/${artist.name}`}}</span>
            </div>
            <div class="album">专辑：{{music.musicInfo.album}}</div>
            <div class="lyric" @scroll="handleLyricScroll">
                <div
                    class="lyric-row"
                    v-for="(item, index) in music.lyric"
                    :key="index"
                    ref="lyricRow"
                    :class="{active: index === curLyric}"
                >{{item.text}}</div>
            </div>
        </div>
        <div class="operation-bar">
            <div class="base-line">
                <div
                    class="cur-progress"
                    :style="`backgroundSize: ${music.currentProgress * 100}% 100%`"
                    @click.self="setMusicProgress"
                ></div>
            </div>
            <div class="l">
                <v-icon>mdi-heart-outline</v-icon>
                <v-icon>mdi-comment-processing-outline</v-icon>
                <div class="time">
                    <span>{{music.currentTime}}</span>
                    <span style="margin: 0 1px;">/</span>
                    <span>{{music.musicInfo.duration | transTime(true)}}</span>
                </div>
            </div>
            <div class="play-btns">
                <v-icon class="other">mdi-repeat-once</v-icon>
                <v-icon @click="$store.dispatch('getMusicMp3', {prev: true})">mdi-skip-previous</v-icon>
                <v-icon v-show="!music.playStatus" @click="playMusic" class="middle">mdi-play-circle-outline</v-icon>
                <v-icon v-show="music.playStatus" @click="pauseMusic" class="middle">mdi-pause-circle-outline</v-icon>
                <v-icon @click="$store.dispatch('getMusicMp3', {next: true})">mdi-skip-next</v-icon>
                <v-icon class="other">mdi-volume-high</v-icon>
            </div>
            <div class="r">
                <span>词</span>
                <v-icon>mdi-playlist-music-outline</v-icon>
            </div>
        </div>
        <v-btn class="back" @click="back" icon>
            <v-icon>mdi-close</v-icon>
        </v-btn>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cacheIdx: 0,
            lyricIsScroll: false
        }
    },
    computed: {
        music() {
            return this.$store.state.music
        },
        curLyric() {
            let time = Math.round(
                (this.$store.state.music.currentProgress *
                    this.$store.state.music.musicInfo.duration) /
                    1000
            )
            let curLyric = this.music.lyric.findIndex((item, index) => {
                return (
                    time >= item.time &&
                    time <
                        (this.music.lyric[index + 1] ? this.music.lyric[index + 1].time : item.time)
                )
            })

            if (this.cacheIdx !== curLyric) {
                this.cacheIdx = curLyric
                !this.lyricIsScroll &&
                    this.$refs.lyricRow &&
                    this.$refs.lyricRow[curLyric] &&
                    this.$refs.lyricRow[curLyric].scrollIntoView({
                        block: 'center',
                        behavior: 'smooth',
                        inline: 'start'
                    })
            }

            return curLyric
        }
    },
    methods: {
        playMusic() {
            this.$store.commit('PLAY_MUSIC')
        },
        pauseMusic() {
            this.$store.commit('PAUSE_MUSIC')
        },
        back() {
            this.$store.commit('TOGGLE_DETAIL_PAGE_SHOW', false)
        },
        handleLyricScroll(e) {
            this.lyricIsScroll = true
            clearTimeout(e.target.timeId)
            e.target.timeId = setTimeout(() => {
                this.lyricIsScroll = false
            }, 600)
        },
        setMusicProgress({ target, offsetX }) {
            console.log('hhh')
            let width = target.offsetWidth
            let progress = offsetX / width
            this.$store.commit('SET_PLAY_PROGRESS', {
                progress
            })
        }
    }
}
</script>

<style lang="less" scoped>
.detail {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 100;

    .bg {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        border-radius: 16px;
        overflow: hidden;
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.4);
            left: 0;
            top: 0;
            z-index: 1;
        }
        .pic {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            transform: scale(1.1);
            filter: blur(15px);
            transition: 0.3s;
        }
    }
    .cover {
        position: absolute;
        width: 116px;
        height: 116px;
        top: 60px;
        left: 30px;
        border-radius: 8px;
        box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.2);
        z-index: 100;
        transition: 0.3s;
        &.move {
            animation: move 1s 0.5s forwards;
        }
    }

    @keyframes move {
        0% {
            top: 60px;
            left: 30px;
            transform: scale(1);
        }
        100% {
            top: calc(50% - 88px);
            left: 350px;
            transform: scale(3);
        }
    }

    .music-info {
        color: white;
        position: absolute;
        z-index: 100;
        height: 400px;
        width: 300px;
        right: 200px;
        top: calc(50% - 230px);
        text-align: center;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        > * {
            flex-shrink: 0;
        }
        .name {
            font-size: 26px;
            margin-bottom: 10px;
        }
        .artist,
        .album {
            font-size: 14px;
            color: #aaa;
        }
        .lyric {
            margin-top: 20px;
            overflow: auto;
            flex: 1;
            position: relative;
            &::-webkit-scrollbar {
                display: none;
            }

            .lyric-row {
                transition: 0.3s;
                + .lyric-row {
                    margin-top: 20px;
                }
                &.active {
                    color: var(--theme-color);
                }
            }
        }
    }

    .back {
        position: absolute;
        right: 30px;
        top: 30px;
        color: white;
        z-index: 100;
    }
    .operation-bar {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 80px;
        z-index: 100;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #aaa;
        padding: 0 120px;
        .l {
            display: flex;
            align-items: center;
            .v-icon {
                margin-right: 10px;
                font-size: 22px;
            }
            .time {
                font-size: 13px;
            }
        }
        .r {
            display: flex;
            align-items: center;
            > * {
                margin-left: 10px;
            }
        }
        .play-btns {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            left: 0;
            .v-icon {
                font-size: 30px;
                margin: 0 5px;
                cursor: pointer;
            }
            .middle {
                font-size: 40px;
            }
            .other {
                font-size: 20px;
            }
        }
        .base-line {
            height: 3px;
            width: 100%;
            top: 0;
            left: 0;
            background-color: rgba(255, 255, 255, 0.2);
            position: absolute;
            .cur-progress {
                height: 100%;
                cursor: pointer;
                background: linear-gradient(90deg, var(--theme-color), rgba(255, 255, 255, 0.5));
                background-repeat: no-repeat;
            }
        }
    }
}
</style>