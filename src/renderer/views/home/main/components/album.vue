<template>
    <div class="album">
        <div class="tit">新碟上架</div>
        <div class="slide-container">
            <div class="slide-wrap">
                <router-link
                    class="slide-item"
                    v-for="item in albumData"
                    :key="item.id"
                    :to="`/home/albumDetail/${item.id}`"
                >
                    <div class="cover-wrap">
                        <div
                            class="cover my-cover"
                            :style="`backgroundImage: url(${item.picUrl}?param=300y300)`"
                        ></div>
                    </div>
                    <div class="name">{{item.name}}</div>
                    <div class="artist">{{item.artist.name}}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            albumData: []
        }
    },
    created() {
        this.$http
            .get('/top/album?limit=5')
            .then(res => {
                this.albumData = res.data.albums
                console.log(this.albumData)
            })
            .catch(err => {})
    }
}
</script>

<style lang="less" scoped>
.album {
    margin-bottom: 30px;
    .slide-container {
        position: relative;
        overflow: hidden;
    }
    .slide-wrap {
        display: flex;
        justify-content: space-between;
    }
    .slide-item {
        position: relative;
        cursor: pointer;
        overflow: hidden;
        flex-shrink: 0;
        width: 134px;
        + .slide-item {
            margin-left: 20px;
        }
        .cover-wrap {
            width: 120px;
            height: 120px;
            position: relative;
            overflow: visible;
            margin-right: 14px;
            margin-bottom: 10px;
            .cover {
                width: 100%;
                height: 100%;
                position: relative;
                z-index: 10;
                box-shadow: 2px 5px 12px 0px rgba(144, 144, 144, 0.77);
            }
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 94%;
                top: 50%;
                transform: translate(6px, -50%);
                border: 1px solid #aaa;
                z-index: 5;
                background-color: rgba(131, 131, 131, 0.17);
            }
            &::after {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: linear-gradient(135deg, #c3c3c3, #a5a5a5, #3e628e);
                top: 0;
                right: -14px;
                z-index: 4;
            }
            &:hover {
                &::after {
                    animation: circle-rotate 2s infinite;
                }
            }
            @keyframes circle-rotate {
                0% {
                    transform: rotate(0);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        }
        .name,
        .artist {
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .name {
            font-size: 13px;
        }
        .artist {
            font-size: 12px;
            color: grey;
        }
    }
}
</style>