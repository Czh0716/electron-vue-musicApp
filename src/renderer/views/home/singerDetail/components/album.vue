<template>
    <div class="ablum">
        <div class="slide-item" v-for="item in albumData" :key="item.id">
            <div class="cover-wrap">
                <div
                    class="cover my-cover"
                    :style="`backgroundImage: url(${item.picUrl}?param=300y300)`"
                ></div>
            </div>
            <div class="name">{{item.name}}</div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getAlbum()
    },
    data() {
        return {
            albumData: []
        }
    },
    methods: {
        async getAlbum() {
            const { data } = await this.$http.get(
                `/artist/album?id=${this.$attrs.id}`
            )
            this.albumData = data.hotAlbums
        }
    }
}
</script>

<style lang="less" scoped>
.ablum {
    display: flex;
    flex-wrap: wrap;
    padding: 16px 24px;
    .slide-item {
        position: relative;
        cursor: pointer;
        overflow: hidden;
        flex-shrink: 0;
        width: 134px;
        margin-right: 41.5px;
        margin-bottom: 20px;
        &:nth-child(5n) {
            margin-right: 0;
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

        .name {
            font-size: 12px;
            color: grey;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
    }
}
</style>