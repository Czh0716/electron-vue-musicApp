<template>
    <div class="test">
        <h1 style="textAlign:center" @click="backHome">This is test</h1>
    </div>
</template>

<script>
export default {
    methods: {
        backHome() {
            this.$router.push('/')
        }
    }
}
</script>

<style scoped>
.test {
    height: 500px;
    background-color: #fff;
}
</style>>