<template>
    <div class="album">
        <div class="empty" v-show="!list.length">
            <img src="../../../assets/empty.png" alt />
            <div>暂无收藏专辑</div>
        </div>
        <div v-for="album in list" :key="album.id" class="item">
            <div class="cover">
                <div class="cover-wrap">
                    <div
                        class="pic my-cover"
                        :style="`backgroundImage: url(${album.picUrl}?param=300y300)`"
                    ></div>
                </div>
            </div>
            <div class="text-cut name">{{album.name}}</div>
            <div class="text-cut size">{{album.size}}首</div>
            <div class="text-cut time">{{album.subTime}}</div>
        </div>
    </div>
</template>

<script>
export default {
    async created() {
        const { data } = await this.$http.get('/album/sublist')
        this.list = data.data
    },
    data() {
        return {
            list: []
        }
    }
}
</script>

<style lang="less" scoped>
.album {
    .empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding-top: 50px;
        img {
            width: 200px;
        }
    }
    .item {
        display: flex;
        align-items: center;
        font-size: 14px;
        > * {
            padding-right: 30px;
        }
        .cover {
            flex: 1;
        }

        .cover-wrap {
            width: 70px;
            height: 70px;
            position: relative;
            overflow: visible;
            .pic {
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
    }
}
</style>