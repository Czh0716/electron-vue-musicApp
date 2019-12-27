<template>
    <div class="singer">
        <div class="category">
            <div class="item">
                <span>语种</span>
                <div
                    @click="changeLg(item.key)"
                    :class="{active: curLg === item.key}"
                    v-for="(item, index) in languages"
                    :key="index"
                >{{item.label}}</div>
            </div>
            <div class="item">
                <span>分类</span>
                <div
                    @click="changeCat(index + 1)"
                    :class="{active: curCat === index + 1}"
                    v-for="(item, index) in cats"
                    :key="index"
                >{{item}}</div>
            </div>
            <!-- <div class="item">
                <span>筛选</span>
                <div
                    :class="{active: curOth === index}"
                    v-for="(item, index) in orders"
                    :key="index"
                >{{item}}</div>
            </div>-->
        </div>
        <div class="list">
            <router-link :to="`/home/singerDetail/${at.id}`" class="at" v-for="at in singerList" :key="at.id">
                <div class="avatar my-cover" :style="`backgroundImage: url(${at.picUrl}?param=200y200)`"></div>
                <div class="name">{{at.name}}</div>
            </router-link>
        </div>
        <div ref="lazyBar" class="lazy-bar"></div>
    </div>
</template>

<script>
export default {
    name: 'home_singer',
    mounted() {
        this.getTopAt()
        const ob = new IntersectionObserver(entry => {
            if (entry[0].isIntersecting && this.singerList.length) {
                this.curPage++
                this.getTopAt()
            }
        })
        this.$nextTick(() => {
            ob.observe(this.$refs.lazyBar)
        })
    },
    data() {
        return {
            languages: [
                { label: '华语', key: 1 },
                { label: '欧美', key: 2 },
                { label: '日本', key: 6 },
                { label: '韩国', key: 7 },
                { label: '其他', key: 4 }
            ],
            cats: ['男歌手', '女歌手', '乐队组合'],
            orders: [
                '热门',
                'A',
                'B',
                'C',
                'D',
                'E',
                'F',
                'G',
                'H',
                'I',
                'J',
                'K',
                'L',
                'M',
                'N',
                'O',
                'P',
                'Q',
                'R',
                'S',
                'T',
                'U',
                'V',
                'W',
                'X',
                'Y',
                'Z'
            ],
            curLg: 1,
            curCat: 1,
            curOth: 0,
            singerList: [],
            curPage: 0,
            limit: 50
        }
    },
    methods: {
        async getTopAt() {
            const { data } = await this.$http.get(
                `/artist/list?cat=${this.curLg}00${this.curCat}&offset=${this.curPage *
                    this.limit}&limit=${this.limit}`
            )
            this.singerList =
                this.curPage === 0 ? data.artists : [...this.singerList, ...data.artists]
        },
        changeLg(key) {
            this.curLg = key
            this.curPage = 0
            this.getTopAt()
        },
        changeCat(cat) {
            this.curCat = cat
            this.curPage = 0
            this.getTopAt()
        }
    }
}
</script>

<style lang="less" scoped>
.singer {
    padding: 24px;
    .category {
        margin-bottom: 10px;
        .item {
            display: flex;
            margin-bottom: 14px;
            font-size: 14px;
            align-items: center;
            flex-wrap: wrap;
            span {
                padding-right: 10px;
                margin-right: 10px;
                border-right: 1px solid #e6e6e6;
            }
            div {
                padding: 6px 20px;
                border-radius: 10px;
                border: 1px solid #e6e6e6;
                margin-left: 20px;
                cursor: pointer;
                margin-bottom: 6px;
                &.active {
                    border-color: var(--theme-color);
                    background-color: var(--theme-color);
                    color: white;
                }

                &:nth-child(1) {
                    margin-left: 0;
                }
            }
        }
    }
    .list {
        display: flex;
        flex-wrap: wrap;

        .at {
            width: 17%;
            margin-right: 15%/4;
            margin-bottom: 15%/4;
            cursor: pointer;
            &:nth-child(5n) {
                margin-right: 0;
            }
            .avatar {
                width: 100%;
                padding-top: 100%;
                border-radius: 50%;
                margin-bottom: 10px;
            }
            .name {
                text-align: center;
                font-size: 13px;
                color: #999;
            }
        }
    }
    .lazy-bar {
        height: 1px;
    }
}
</style>