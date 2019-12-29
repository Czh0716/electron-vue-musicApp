<template>
    <div class="play-options">
        <transition
            name="playList"
            enter-active-class="animated flipInX"
            leave-active-class="animated fadeOut"
        >
            <div class="play-list" v-show="playListIsShow">
                <div class="header">
                    <div class="r">
                        <span class="tit">播放列表</span>
                        <span class="count">总共{{$store.state.music.playList.length}}首歌曲</span>
                    </div>
                    <div class="clear" @click="$store.dispatch('clearPlayList')">
                        <v-icon>mdi-delete-circle-outline</v-icon>清空
                    </div>
                </div>
                <div class="song-list">
                    <div
                        class="song-item"
                        :class="{active: item.id === $store.state.music.musicInfo.id && $store.state.music.playStatus, isPlay: item.id === $store.state.music.musicInfo.id && $store.state.music.playStatus}"
                        v-for="item in $store.state.music.playList"
                        :key="item.id"
                        @click="$store.dispatch('getMusicMp3', {id: item.id})"
                    >
                        <div class="name">{{item.name}}</div>
                        <div class="artist">
                            <span
                                v-for="(artist, index) in item.artists"
                                :key="artist.id"
                            >{{index % 2 ? `/${artist.name}` : artist.name}}</span>
                        </div>
                        <div class="duration">{{item.duration | transTime(true)}}</div>
                        <div class="btns">
                            <v-icon>mdi-play-circle-outline</v-icon>
                            <v-icon
                                :class="{liked: $store.getters.likeList.includes(item.id)}"
                                @click.stop="$store.dispatch('likeMusic', {id: item.id, liked: !$store.getters.likeList.includes(item.id)})"
                            >mdi-heart{{ $store.getters.likeList.includes(item.id) ?'' : '-outline'}}</v-icon>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <div class="base-volume-line">
            <div
                class="volume-progress"
                @click="setVolume"
                :style="`background-size: 100% ${$store.state.music.isMute ? 0 : $store.state.music.volume*100}%;`"
            ></div>
        </div>
        <v-icon
            v-if="!$store.state.music.isMute && $store.state.music.volume"
            class="volume"
            @click="switchMute"
        >mdi-volume-high</v-icon>
        <v-icon v-else class="volume" @click="switchMute">mdi-volume-mute</v-icon>
        <div class="play-list-btn" @click="switchPlayListShow">
            <v-icon>mdi-playlist-music-outline</v-icon>
        </div>
        <div @click="$store.commit('CLEAR_STATE')">
            <v-icon></v-icon>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            playListIsShow: false
        }
    },
    methods: {
        setVolume({ target, offsetY }) {
            let height = target.offsetHeight
            let volume = offsetY / height
            this.$store.commit('SET_MUSIC_VOLUME', volume)
        },
        switchMute() {
            this.$store.commit('SWITCH_MUTE')
        },
        switchPlayListShow() {
            this.playListIsShow = !this.playListIsShow
        }
    }
}
</script>

<style lang="less" scoped>
.play-options {
    position: absolute;
    right: 40px;
    transform: translateX(50%);
    bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1000;

    > * {
        cursor: pointer;
    }
    .play-list {
        cursor: auto;
        border-radius: 6px;
        position: absolute;
        width: 550px;
        height: 400px;
        background-color: #fff;
        box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);
        right: 40px;
        bottom: 0;
        z-index: 10000;
        transform: translate3d(0, 0, 0);
        .header,
        .song-item {
            padding: 0 30px;
        }
        .header {
            height: 40px;
            display: flex;
            align-items: center;
            font-size: 12px;
            border-bottom: 1px solid #e6e6e6;
            justify-content: space-between;
            .tit {
                font-size: 16px;
                font-weight: 700;
                margin-right: 20px;
            }

            .clear {
                display: flex;
                align-items: center;
                cursor: pointer;
                .v-icon {
                    margin-right: 4px;
                }
            }
        }

        .song-list {
            height: calc(100% - 40px);
            overflow-y: scroll;
            &::-webkit-scrollbar {
                display: none;
            }
        }

        .song-item {
            display: flex;
            height: 40px;
            align-items: center;
            font-size: 14px;
            border-bottom: 1px solid #e6e6e6;
            cursor: pointer;
            transition: 0.3s;
            &.active {
                background-color: rgba(0, 0, 0, 0.03);
                .name,
                .artist {
                    color: var(--theme-color);
                }
            }
            &:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }
            .name {
                flex: 1;
            }
            .artist,
            .duration,
            .btns {
                flex-shrink: 0;
            }
            .name,
            .artist {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .artist {
                width: 100px;
                font-size: 13px;
            }
            .artist,
            .duration {
                color: #aaa;
            }
            .btns,
            .duration,
            .artist {
                margin-left: 20px;
            }
            .v-icon {
                font-size: 18px;
                + .v-icon {
                    margin-left: 6px;
                }
            }
        }
    }

    .volume {
        color: var(--theme-color) !important;
    }
    .play-list-btn {
        position: relative;
        &::before {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            transform: scale(1.5);
            background-color: #fff;
            border-radius: 50%;
            box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
        }
        .v-icon {
            position: relative;
            z-index: 10;
            color: var(--theme-color) !important;
        }
    }
    .volume {
        margin-bottom: 10px;
        margin-top: 4px;
    }
    .base-volume-line {
        height: 90px;
        width: 8px;
        border-radius: 4px;
        background-color: rgba(128, 128, 128, 0.15);
        position: relative;
        .volume-progress {
            position: absolute;
            width: 100%;
            bottom: 0;
            left: 0;
            height: 100%;
            border-radius: 4px;
            @themeColor: pink;
            transform: rotate(180deg);
            background: linear-gradient(fade(@themeColor, 20%), var(--theme-color));
            transition: 0.4s;
            background-repeat: no-repeat;
            background-size: 100% 10%;
        }
    }
}
</style>