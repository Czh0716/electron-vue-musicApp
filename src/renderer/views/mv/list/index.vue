<template>
    <div class="mv">
        <div class="category">
            <div class="area">
                <span>地区</span>
                <div
                    :class="{active: area === item}"
                    v-for="(item, index) in areas"
                    :key="index"
                    @click="switchCat('area',item)"
                >{{item}}</div>
            </div>
            <div class="type">
                <span>类型</span>
                <div
                    :class="{active: type === item}"
                    v-for="(item, index) in types"
                    :key="index"
                    @click="switchCat('type',item)"
                >{{item}}</div>
            </div>
            <div class="order">
                <span>排序</span>
                <div
                    :class="{active: order === item}"
                    v-for="(item, index) in orders"
                    :key="index"
                    @click="switchCat('order',item)"
                >{{item}}</div>
            </div>
        </div>
        <div class="list">
            <router-link
                :to="`/mv/video-player/${item.id}`"
                class="item"
                :class="{'pointer-none': !mvLists.length}"
                v-for="item in mvLists.length ? mvLists : cSktData(12)"
                :key="item.id"
            >
                <div class="cover my-cover" v-lazy:background-image="`${item.cover}?param=400y200`">
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
        <div class="lazy-target" v-intersect="loadData"></div>
    </div>
</template>

<script>
export default {
    name: 'mv_main',
    created() {
        this.getDatas()
    },
    data() {
        return {
            mvLists: Array.from({ length: 10 }, (item, index) => {
                return {
                    id: index
                }
            }),
            total: 0,
            limit: 24,
            areas: ['全部', '内地', '港台', '欧美', '韩国', '日本'],
            types: ['全部', '官方版', '原声', '现场版'],
            orders: ['上升最快', '最热', '最新'],
            area: '全部',
            type: '全部',
            order: '上升最快',
            isActive: false
        }
    },
    methods: {
        getDatas(isPush) {
            this.$http
                .get(
                    `/mv/all?area=${this.area}&type=${this.type}&order=${this.order}&limit=${this.limit}&offset=${this.total}`
                )
                .then(res => {
                    if (isPush) {
                        this.mvLists.push(...res.data.data)
                    } else {
                        this.mvLists = res.data.data
                    }
                })
                .catch(err => {})

            this.total += this.limit
        },
        switchCat(target, val) {
            this[target] = val
            this.total = 0
            this.getDatas()
        },
        loadData(entries, observer, isIntersecting) {
            if (isIntersecting) {
                this.getDatas(true)
            }
        }
    }
}
</script>


<style lang="less" scoped>
.mv {
    padding: 24px;
    .category {
        margin-bottom: 10px;
        .area,
        .type,
        .order {
            display: flex;
            margin-bottom: 14px;
            font-size: 14px;
            align-items: center;
            span {
                padding-right: 10px;
                margin-right: 10px;
                border-right: 1px solid #e6e6e6;
            }
            div {
                padding: 6px 20px;
                border-radius: 10px;
                border: 1px solid #e6e6e6;
                margin-right: 20px;
                cursor: pointer;
                &.active {
                    border-color: var(--theme-color);
                    background-color: var(--theme-color);
                    color: white;
                }
            }
        }
    }
    .list {
        display: flex;
        flex-wrap: wrap;
    }
    .item {
        width: 32%;
        position: relative;
        margin-right: 2%;
        margin-bottom: 2%;
        &.pointer-none {
            background-color: rgba(0, 0, 0, 0.12);
        }
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