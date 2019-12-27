<template>
    <div class="music">
        <div class="tit">最新音乐</div>
        <div class="list-wrap">
            <div
                class="item"
                v-for="(music, index) in musicData"
                :key="music.id"
                @click="$store.dispatch('getMusicMp3', {id: music.id})"
            >
                <span class="num">{{(index+1).toString().padStart(2,'0')}}</span>
                <div
                    class="music-cover my-cover"
                    :style="`backgroundImage: url(${music.song.album.picUrl}?param=100y100)`"
                ></div>
                <div class="info">
                    <div class="name">{{music.song.name}}</div>
                    <div class="author">
                        <span
                            v-for="(artist, index) in music.song.artists"
                            :key="artist.id"
                        >{{index>0 ?' /' + artist.name : artist.name}}</span>
                    </div>
                </div>
                <div class="playBtn">
                    <v-icon>mdi-play-speed</v-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            musicData: []
        }
    },
    created() {
        this.$http
            .get('/personalized/newsong')
            .then(res => {
                this.musicData = res.data.result
                console.log(musicData)
            })
            .catch(err => {})
    },
    methods: {}
}
</script>

<style lang="less" scoped>
.music {
    margin-bottom: 30px;
    .list-wrap {
        display: flex;
        flex-direction: column;
        height: 70px * 5 + 50px;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .num {
        margin: 0 14px;
        position: relative;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 50%;
        border: 1px dashed black;
    }

    .num,
    .author {
        color: #888;
    }
    .item {
        position: relative;
        display: flex;
        font-size: 13px;
        width: 48%;
        align-items: center;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.1);
        padding: 10px 0;
        border-radius: 4px;
        overflow: hidden;
        transition: 0.3s;
        cursor: pointer;
        &:nth-child(odd) {
            margin-right: 4%;
        }
        > * {
            z-index: 10;
        }

        @keyframes criss-cross-left {
            0% {
                left: -8px;
            }
            30% {
                left: 50%;
                width: 16px;
                padding-top: 16px;
            }
            100% {
                left: 50%;
                width: 100% * 1.1;
                padding-top: 100% * 1.1;
            }
        }

        @keyframes criss-cross-right {
            0% {
                left: calc(100% + 8px);
            }
            30% {
                left: 50%;
                width: 16px;
                padding-top: 16px;
            }
            100% {
                left: 50%;
                width: 100% * 1.1;
                padding-top: 100% * 1.1;
            }
        }

        &::before,
        &::after {
            content: '';
            width: 16px;
            padding-top: 16px;
            position: absolute;
            border-radius: 50%;
            background-color: var(--theme-color);
            z-index: 1;
            transform: translateX(-50%);
            left: -8px;
        }
        &::after {
            left: calc(100% + 8px);
        }

        &:hover {
            &::before {
                animation: criss-cross-left 0.6s both;
                animation-direction: alternate;
            }
            &::after {
                animation: criss-cross-right 0.6s both;
            }
            .num,
            .name,
            .author,
            .playBtn {
                transition: 0.2s 0.4s;
            }
            .num {
                border-color: white;
            }
            .playBtn,
            .name {
                color: white;
            }
            .num,
            .author {
                color: #fafafa;
            }
        }
    }
    .music-cover {
        height: 50px;
        width: 50px;
        margin-right: 10px;
    }
    .info {
        flex-grow: 1;
        overflow: hidden;
    }

    .name {
        margin-bottom: 8px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .author {
        font-size: 12px;
    }
    .playBtn {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--theme-color);
        cursor: pointer;
        margin: 0 14px;
        .v-icon {
            transition: none;
        }
    }

    .num,
    .music-cover,
    .playBtn {
        flex-shrink: 0;
    }
}
</style>