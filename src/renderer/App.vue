<template>
    <div id="app">
        <audio ref="player" :src="$store.state.music.musicInfo.url" style="display:none;"></audio>
        <side-bar></side-bar>
        <div class="app-right">
            <!-- <v-color-picker class="color-picker" v-model="themeColor"></v-color-picker> -->
            <app-header></app-header>
            <div class="main">
                <div class="con-wrap">
                    <keep-alive :include="aliveRoutes">
                        <router-view></router-view>
                    </keep-alive>
                    <!-- <router-view v-if="!$route.meta.keepAlive"></router-view> -->
                </div>
                <div class="side-nav">
                    <router-link
                        :to="item.router"
                        :title="item.title"
                        v-for="(item, index) in sideNavData"
                        :key="index"
                    >
                        <v-icon>{{item.icon}}</v-icon>
                    </router-link>
                </div>
                <play-options></play-options>
            </div>
        </div>
        <transition name="detail">
            <detail v-show="$store.state.app.detailPageIsShow"></detail>
        </transition>
        <transition enter-active-class="animated flipInX" leave-active-class="animated fadeOut">
            <login-form v-show="$store.state.user.loginDialogVisible"></login-form>
        </transition>
    </div>
</template>

<script>
import { getPlayRecord } from '@/api'
export default {
    name: 'my-project',
    created() {
        // this.$http
        //     .get('/login/cellphone?phone=13435897138&password=czh3287316')
        //     .then(res => {
        //         getPlayRecord(res.data.account.id)
        //             .then(res => {
        //                 console.log(res)
        //             })
        //             .catch(err => {})
        //     })
        //     .catch(err => {})
    },
    mounted() {
        this.$nextTick(() => {
            this.$store.dispatch('initAudioElement', this.$refs.player)
        })
    },
    
    data() {
        return {
            themeColor: '#F59898',
            isShowDetailPage: false,
            sideNavData: [
                {
                    router: '/',
                    title: '推荐',
                    icon: 'mdi-view-dashboard-outline'
                },
                {
                    router: '/home/rank',
                    title: '排行榜',
                    icon: 'mdi-equalizer-outline'
                },
                {
                    router: '/home/singer',
                    title: '歌手',
                    icon: 'mdi-ninja'
                },
                {
                    router: '/',
                    title: '最新音乐',
                    icon: 'mdi-new-box'
                }
            ],
            aliveRoutes: []
        }
    },
    watch: {
        $route(to, from) {
            if (this.aliveRoutes.includes(from.name)) {
                this.aliveRoutes.indexOf(to.name) !== -1 &&
                    this.aliveRoutes.splice(this.aliveRoutes.indexOf(from.name), 1)
            } else {
                this.aliveRoutes.indexOf(to.name) === -1 && this.aliveRoutes.push(from.name)
            }
        },
        themeColor(val) {
            document.body.style = `--theme-color: ${val.slice(0, 7)}`
        }
    },
    components: {
        SideBar: () => import('@/components/sideBar'),
        AppHeader: () => import('@/components/header'),
        PlayOptions: () => import('@/components/playOptions'),
        detail: () => import('@/components/detail'),
        LoginForm: () => import('@/components/loginForm')
    }
}
</script>

<style  lang="less">
/* CSS */
h1 {
    margin: 0;
}
#app {
    border-radius: 16px;
    height: 100%;
    display: flex;
    overflow: hidden;
    background-color: #f1f1f1;
    padding-left: 260px;
    position: relative;
}

.detail-enter,
.detail-leave-to {
    opacity: 0;
}

.detail-enter-active,
.detail-leave-active {
    transition: 0.5s;
}

.app-right {
    width: 100%;
    @headerHeight: 60px;
    padding-top: @headerHeight;
    border-top-right-radius: 16px;
    position: relative;
    .color-picker {
        position: absolute;
        right: 50px;
        top: 50px;
        z-index: 10000;
    }
    .main {
        position: relative;
        z-index: 100;
        padding-right: 80px;

        .con-wrap {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            overflow: scroll;
            box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.08);
            height: calc(100vh - @headerHeight);
            background-color: #fff;
            &::-webkit-scrollbar {
                display: none;
            }
        }

        .side-nav {
            position: absolute;
            right: 20px;
            top: 100px;
            background-color: #dcd2c6;
            border-radius: 4px;
            box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            padding: 10px 0;
            .v-icon {
                margin: 10px;
                cursor: pointer;
                color: white !important;
                font-size: 22px;
            }
        }
    }
}
.page-enter,
.page-leave-to {
    opacity: 0;
    transform: translateX(100px);
}

.v-enter-active,
.v-leave-active {
    transition: 0.3s;
}
</style>
