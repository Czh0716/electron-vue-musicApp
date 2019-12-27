<template>
    <div>
        <v-skeleton-loader v-if="!banners.length" type="image"></v-skeleton-loader>

        <div class="swp-wrap" v-else>
            <!-- <div class="bg-shadow my-cover" :style="`backgroundImage: url(${swipers[curIdx]})`"></div> -->
            <div
                v-for="(item, index) in banners"
                :key="index"
                :style="`backgroundImage: url(${item.imageUrl})`"
                class="swiper my-cover"
                :class="{active : curIdx === index}"
                @click="playMusic(item.encodeId)"
                @mouseenter="handleSwiperMouseInter(index)"
                @mouseleave="handleSwiperMouseLeave"
            ></div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.$http
            .get('/banner?type=0')
            .then(res => {
                this.banners = res.data.banners
            })
            .catch(err => {})
    },
    mounted() {
        this.$nextTick(() => {
            this.startSwiper()
        })
    },
    data() {
        return {
            curIdx: 0,
            banners: [],
            timeId: null
        }
    },
    methods: {
        slideChange() {
            this.curIdx = this.mySwiper.realIndex
        },
        playMusic(id) {
            this.$store.dispatch('getMusicMp3', { id })
        },
        handleSwiperMouseInter(idx) {
            clearInterval(this.timeId)
            this.curIdx = idx
        },
        handleSwiperMouseLeave() {
            this.startSwiper()
        },
        startSwiper() {
            this.timeId = setInterval(() => {
                this.curIdx++
                this.curIdx === this.banners.length && (this.curIdx = 0)
            }, 3000)
        }
    }
}
</script>

<style lang="less" scoped>
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
</style>