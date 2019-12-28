import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    linkActiveClass: 'active',
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/home',
            name: 'home_main',
            component: () => import('@/views/home/main')
        },
        {
            path: '/home/rank',
            name: 'home_rank',
            component: () => import('@/views/home/rank')
        },

        {
            path: '/home/rankDetail/:id',
            name: 'home_rankDetail',
            component: () => import('@/views/home/rankDetail')
        },
        {
            path: '/home/songListDetail/:id',
            name: 'home_songListDetail',
            component: () => import('@/views/songListDetail')
        },
        {
            path: '/home/singer',
            name: 'home_singer',
            component: () => import('@/views/home/singer')
        },
        {
            path: '/home/singerDetail/:id',
            name: 'home_singerDetail',
            component: () => import('@/views/home/singerDetail')
        },
        {
            path: '/home/albumDetail/:id',
            name: 'home_albumDetail',
            component: () => import('@/views/home/albumDetail')
        },

        {
            path: '/mv',
            component: () => import('@/views/mv'),
            children: [
                {
                    path: '',
                    name: 'mv_main',
                    component: () => import('@/views/mv/list')
                },
                {
                    path: 'video-player/:id',
                    name: 'mv_videoPlayer',
                    component: () => import('@/views/mv/videoPlayer')
                }
            ]
        },
        {
            path: '/localMusic',
            name: 'localMusic',
            component: () => import('@/views/localMusic')
        },
        {
            path: '/collect',
            name: 'collect',
            component: () => import('@/views/collect'),
            meta: {
                title: '我的收藏'
            }
        },
        {
            path: '/playRecords',
            name: 'playRecords',
            component: () => import('@/views/playRecords')
        },
        {
            path: '/dynamic',
            name: 'dynamic',
            component: () => import('@/views/dynamic')
        },
        {
            path: '/test',
            component: () => import('@/components/test.vue')
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
