<template>
    <div class="singerDetail">
        <div class="cover my-cover">
            <div class="bg my-cover" :style="`backgroundImage: url(${atInfo.img1v1Url})`"></div>
            <div class="name">{{atInfo.name}}</div>
            <div class="follow">关注</div>

            <div class="tab-bar">
                <div
                    v-for="(item, key) in types"
                    :key="key"
                    @click="switchTab(key)"
                    :class="{active: type === key}"
                    class="tab"
                >{{item}}</div>
            </div>
        </div>
        <component :is="type" :id="$route.params.id"></component>
    </div>
</template>

<script>
export default {
    created() {
        this.getAt()
    },
    data() {
        return {
            atInfo: {},
            types: {
                album: '专辑',
                mv: 'MV',
                detail: '歌手详情',
                similarity: '相似歌手'
            },
            type: 'album'
        }
    },
    watch: {
        $route() {
            this.getAt()
        }
    },
    components: {
        album: () => import('./components/album'),
        mv: () => import('./components/mv'),
        detail: () => import('./components/detail'),
        similarity: () => import('./components/similarity')
    },
    methods: {
        async getAt() {
            const { data } = await this.$http.get(
                `/artists?id=${this.$route.params.id}`
            )
            this.atInfo = data.artist
            // this.type = 'album'
        },
        switchTab(type) {
            this.type = type
        }
    }
}
</script>

<style lang="less" scoped>
.singerDetail {
    .cover {
        height: 380px;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: 0 24px;
        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, 0.4);
            }
        }
        .name {
            font-size: 36px;
            color: white;
            font-weight: 700;
            position: relative;
            z-index: 10;
        }
        .follow {
            position: relative;
            width: 100px;
            color: white;
            text-align: center;
            font-size: 14px;
            border-radius: 10px;
            padding: 6px 24px;
            background-color: var(--theme-color);
            vertical-align: middle;
            font-weight: 300;
            cursor: pointer;
        }
        .tab-bar {
            position: relative;
            z-index: 10;
            color: white;
            display: flex;
            margin-top: 20px;
            .tab {
                margin-right: 40px;
                padding: 10px 0;
                position: relative;
                cursor: pointer;
                &.active {
                    color: var(--theme-color);
                    &::before {
                        content: '';
                        position: absolute;
                        width: 60%;
                        bottom: 0;
                        left: 20%;
                        height: 3px;
                        background-color: var(--theme-color);
                        border-radius: 2px;
                    }
                }
            }
        }
    }
}
</style>