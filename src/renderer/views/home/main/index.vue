<template>
    <div class="home">
        <swiper-item></swiper-item>
        <div class="my-container">
            <recommend-item></recommend-item>
            <album-item></album-item>
            <music-item></music-item>
            <mv-item></mv-item>
        </div>
    </div>
</template>

<script>
export default {
    name: 'home_main',
    created() {
        this.$http
            .get('http://localhost:3000/banner?type=0')
            .then(res => {
                this.banners = res.data.banners
            })
            .catch(err => {})
    },
    mounted() {
        this.$nextTick(() => {
            setInterval(() => {
                this.curIdx++
                this.curIdx === this.banners.length && (this.curIdx = 0)
            }, 3000)
        })
    },
    components: {
        SwiperItem: () => import('./components/swiper'),
        RecommendItem: () => import('./components/recommend'),
        MusicItem: () => import('./components/music'),
        AlbumItem: () => import('./components/album'),
        MvItem: () => import('./components/mv')
    },
    data() {
        return {
            curIdx: 0,
            banners: []
        }
    },

    methods: {
        goTest() {
            this.$router.push('/test')
        },
        slideChange() {
            this.curIdx = this.mySwiper.realIndex
        }
    }
}
</script>
<style lang="less">
.home {
    .tit {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 20px;
    }
}
</style>
<style lang="less" scoped>
.my-container {
    padding: 16px 24px;
}
h1 {
    font-size: 30px;
    padding: 20px 0;
}
.home {
    background-color: #fff;
}
</style>>

