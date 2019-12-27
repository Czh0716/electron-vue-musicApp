<template>
    <div class="introduction">
        <div class="item" v-for="(item,index) in introduction" :key="index">
            <div class="tit">{{item.ti}}</div>
            <div class="txt">{{item.txt}}</div>
        </div>
    </div>
</template>

<script>
export default {
    created() {
        this.getIntroduction()
    },
    data() {
        return {
            introduction: []
        }
    },
    methods: {
        async getIntroduction() {
            const { data } = await this.$http.get(
                `/artist/desc?id=${this.$attrs.id}`
            )
            console.log(data)
            this.introduction = data.introduction
        }
    }
}
</script>

<style lang="less" scoped>
.introduction {
    padding: 16px 24px;
    .item {
        margin-bottom: 20px;
    }
    .tit {
        padding-left: 10px;
        position: relative;
        margin-bottom: 10px;
        &::before {
            content: '';
            position: absolute;
            height: 100%;
            width: 2px;
            border-radius: 2px;
            left: 0;
            background-color: var(--theme-color);
        }
    }
    .txt {
        text-indent: 2em;
        line-height: 24px;
    }
}
</style>