<template>
    <div class="mv">
        <div class="tit">最新MV</div>
        <div class="list-wrap">
            <div class="item" v-for="item in mvList" :key="item.id">
                <div class="con">
                    <div class="front">
                        <div
                            class="cover my-cover"
                            :style="`backgroundImage: url(${item.cover}?param=300y200)`"
                        ></div>
                        <h2 class="name">{{item.name}}</h2>
                    </div>
                    <div class="back">
                        <div
                            class="b-cover my-cover"
                            :style="`backgroundImage: url(${item.cover}?param=300y200)`"
                        ></div>
                        <h2 class="artist">{{item.artistName}}</h2>
                        <div class="desc">{{item.briefDesc}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.$http
            .get('/mv/first?limit=3')
            .then(res => {
                console.log(res)
                this.mvList = res.data.data
            })
            .catch(err => {})
    },
    data() {
        return {
            mvList: []
        }
    }
}
</script>

<style lang="less" scoped>
.mv {
    .list-wrap {
        display: flex;
        justify-content: space-between;
    }
    .item {
        width: 31%;
        padding-top: 18%;
        position: relative;
        cursor: pointer;
        .con {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }

        &:hover {
            .front {
                transform: rotateY(180deg);
                opacity: 0;
            }
            .back {
                opacity: 1;
                transform: rotateY(0);
            }
        }
        .cover {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    rgba(0, 0, 0, 0.6),
                    rgba(255, 255, 255, 0.1)
                );
            }
        }
        .front,
        .back {
            border-radius: 4px;
            width: 100%;
            height: 100%;
            transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
        }
        .front {
            transform: rotateY(0deg);
            .name {
                color: white;
                position: relative;
                font-size: 20px;
                padding: 0 40px;
                text-align: center;
                text-shadow: 1px 1px rgba(0, 0, 0, 0.04);
            }
        }
        .back {
            transform: rotateY(-180deg);
            z-index: 10;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
            &::before {
                content: '';
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                background-color: rgba(0, 0, 0, 0.3);
                z-index: 10;
            }
            .b-cover {
                filter: blur(3px);
                position: absolute;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
            }

            .artist,
            .desc {
                color: white;
                font-size: 18px;
                padding: 0 40px;
                position: relative;
                z-index: 10;
                text-align: center;
            }
            .desc {
                margin-top: 10px;
                font-size: 14px;
                color: rgba(255, 255, 255, 0.7);
                line-height: 20px;
            }
        }
    }
}
</style>