<template>
    <div class="similarity">
        <router-link
            :to="`/home/singerDetail/${at.id}`"
            class="at"
            v-for="at in similarity"
            :key="at.id"
        >
            <div
                class="avatar my-cover"
                :style="`backgroundImage: url(${at.picUrl}?param=200y200)`"
            ></div>
            <div class="name">{{at.name}}</div>
        </router-link>
    </div>
</template>

<script>
export default {
    created() {
        this.getSimilarity()
    },
    data() {
        return {
            similarity: []
        }
    },
    methods: {
        async getSimilarity() {
            const { data } = await this.$http.get(
                `/simi/artist?id=${this.$attrs.id}`
            )
            this.similarity = data.artists
        }
    }
}
</script>

<style lang="less" scoped>
.similarity {
    padding: 16px 24px;
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
</style>