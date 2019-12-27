<template>
    <div class="home">
        <div class="swp-wrap">
            <!-- <div class="bg-shadow my-cover" :style="`backgroundImage: url(${swipers[curIdx]})`"></div> -->
            <div
                v-for="(item, index) in banners"
                :key="index"
                :style="`backgroundImage: url(${item.imageUrl})`"
                class="swiper my-cover"
                :class="{active : curIdx === index}"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
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
    data() {
        return {
            curIdx: 0,
            banners: []
        }
    },

    computed: {
        mySwiper() {
            return this.$refs.mySwiper.swiper
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
<style lang="less" scoped>
h1 {
    font-size: 30px;
    padding: 20px 0;
}
.home {
    background-color: #fff;
    .swp-wrap {
        position: relative;
        display: flex;
        justify-content: flex-start;
        .bg-shadow {
            width: 150%;
            height: 150%;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            position: absolute;
            filter: blur(100px);
            opacity: 0.5;
            transition: 0.3s;
        }
    }
    .swiper {
        height: 210px;
        flex: 1;
        transition: all 0.8s ease;
        transform: translate3d(0, 0, 0);
        cursor: pointer;
        .cover {
            height: 100%;
            border-radius: 4px;
        }
        .swiper-slide {
            width: 50%;
        }

        &.active {
            flex: 12;
        }
    }

    .swp-l {
        position: relative;
    }
}
</style>>

