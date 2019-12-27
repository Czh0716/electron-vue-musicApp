<template>
    <div class="recommend">
        <div class="tit">推荐歌单</div>
        <div class="list-wrap">
            <router-link
                :to="`/home/songListDetail/${item.id}`"
                class="item"
                :class="{'pointer-none': !listData.length}"
                v-for="item in listData.length ? listData : cSktData(10)"
                :key="item.id"
            >
                <div class="con my-cover" :style="`backgroundImage: url(${item.picUrl}?param=200y200)`">
                    <div class="cover-con">
                        <div class="play-count">
                            <v-icon>mdi-headphones</v-icon>
                            <span>{{item.playCount | playCount}}</span>
                        </div>
                    </div>
                </div>
                <div class="name">{{item.name}}</div>
            </router-link>
        </div>
    </div>
</template>

<script>
import playCount from '@/filters/playCount.js'
export default {
    created() {
        this.$http
            .get('/personalized?limit=10')
            .then(res => {
                this.listData = res.data.result
            })
            .catch(err => {})
    },
    data() {
        return {
            listData: []
        }
    },
    filters: {
        playCount
    }
}
</script>

<style lang="less" scoped>
.recommend {
    .tit {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 20px;
    }

    .list-wrap {
        display: flex;
        flex-wrap: wrap;
    }

    .item {
        margin-right: 10%/4;
        margin-bottom: 10%/4;
        width: 18%;
        cursor: pointer;
        .con {
            width: 100%;
            padding-top: 100%;
            position: relative;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0px 4px 20px 1px rgba(0, 0, 0, 0.3);
            margin-bottom: 10px;
            transition: 0.3s;
            background-color: rgba(0, 0, 0, 0.12);
            &:hover {
                transform: translateY(-10px);
            }
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background: linear-gradient(rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0.6));
            }
        }
        .name {
            font-size: 13px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
            line-height: 20px;
            height: 40px;
        }
        &:nth-child(5n) {
            margin-right: 0;
        }
        .cover-con {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            padding: 14px;
            display: flex;
            justify-content: flex-end;

            &::before {
                content: '';
                position: absolute;
                width: 12px;
                height: 12px;
                border: 1px solid white;
                border-left-width: 0;
                border-bottom-width: 0;
                transition: 0.5s;
            }
            &::after {
                content: '';
                position: absolute;
                width: 12px;
                height: 12px;
                left: 14px;
                bottom: 14px;
                border: 1px solid white;
                border-top-width: 0;
                border-right-width: 0;
                transition: 0.5s;
            }

            &:hover {
                &::before,
                &::after {
                    width: calc(100% - 28px);
                    height: calc(100% - 28px);
                }
            }
            .play-count {
                color: #fff;
                display: flex;
                align-items: center;
                align-self: flex-end;
                font-size: 14px;
                margin-bottom: 4px;
                margin-right: 4px;
                .v-icon {
                    margin-right: 6px;
                    font-size: 14px;
                }
            }
        }
    }
}
</style>