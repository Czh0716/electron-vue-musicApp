<template>
    <div class="mv">
        <router-link
            :to="`/mv/video-player/${item.id}`"
            class="item"
            v-for="item in mvs"
            :key="item.id"
        >
            <div class="cover my-cover" v-lazy:background-image="`${item.imgurl}?param=400y200`">
                <div class="mv-con">
                    <div class="top">
                        <v-icon>mdi-play-circle</v-icon>
                        {{item.playCount | playCount}}
                    </div>
                </div>
            </div>
            <div class="name">{{item.name}}</div>
            <div class="artist">{{item.artistName}}</div>
        </router-link>
    </div>
</template>

<script>
export default {
    created() {
        this.getMvs()
    },
    data() {
        return {
            mvs: []
        }
    },
    methods: {
        async getMvs() {
            const { data } = await this.$http.get(
                `/artist/mv?id=${this.$attrs.id}`
            )
            console.log(data)
            this.mvs = data.mvs
        }
    }
}
</script>

<style lang="less" scoped>
.mv {
    display: flex;
    flex-wrap: wrap;
    padding: 16px 24px;
    .item {
        width: 32%;
        position: relative;
        margin-right: 2%;
        margin-bottom: 2%;
        &:nth-child(3n) {
            margin-right: 0;
        }
        .cover {
            width: 100%;
            padding-top: 50%;
            position: relative;
            border-radius: 4px;
            margin-bottom: 8px;
            cursor: pointer;
        }
        .mv-con {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            padding: 10px;
            color: white;
            font-size: 14px;
            .v-icon {
                font-size: 16px;
                margin-right: 4px;
            }
            .top {
                display: flex;
                align-items: center;
                justify-content: flex-end;
            }
        }
        .name,
        .artist {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
            font-size: 14px;
        }

        .artist {
            margin-top: 4px;
            color: #aaa;
        }
    }
}
</style>