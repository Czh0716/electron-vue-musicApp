<template>
    <div class="collect">
        <v-tabs v-model="tab" grow>
            <v-tab v-for="(tab, key) in tabs" :key="key">{{tab}}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(tab,key) in tabs" :key="key">
                <div class="tit">收藏的{{tab}}</div>
                <div class="cont">
                    <component :ref="key" :is="key"></component>
                </div>
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tab: null,
            tabs: {
                album: '专辑',
                singer: '歌手',
                myVideo: '视频',
                column: '专栏'
            }
        }
    },

    components: {
        album: () => import('./components/album'),
        singer: () => import('./components/singer'),
        myVideo: () => import('./components/video'),
        column: () => import('./components/column')
    }
}
</script>

<style lang="less" scoped>
.collect {
    .tit {
        padding: 16px 24px;
        font-size: 16px;
        border-bottom: 1px solid #e6e6e6;
        margin-bottom: 16px;
    }
    .cont {
        padding: 0px 24px;
    }
}
</style>