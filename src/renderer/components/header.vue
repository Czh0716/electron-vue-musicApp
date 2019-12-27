<template>
    <div class="header">
        <div class="con" :class="{drag: !$store.state.app.detailPageIsShow}">
            <div class="left">
                <div class="advanceAndBack-btn">
                    <v-icon @click="back" class="btn back-btn">mdi-chevron-left</v-icon>
                    <v-icon @click="advance" class="btn">mdi-chevron-right</v-icon>
                </div>
            </div>
            <div class="right">
                <div class="user-info">
                    <template v-if="Object.keys($store.state.user.userInfo).length">
                        <div
                            class="avatar my-cover"
                            :style="`backgroundImage:url(${$store.state.user.userInfo.avatarUrl})`"
                        ></div>
                        <div class="userInfo-name">{{$store.state.user.userInfo.nickname}}</div>
                    </template>
                    <dir v-else @click="$store.dispatch('setLoginDialog')">未登录</dir>
                </div>
                <v-icon
                    class="btn"
                    v-if="Object.keys($store.state.user.userInfo).length"
                    @click="$store.dispatch('logout')"
                >mdi-power</v-icon>
                <v-icon class="btn">mdi-comment-outline</v-icon>
                <v-icon class="btn">mdi-palette-outline</v-icon>
                <v-icon class="btn">mdi-settings</v-icon>

                <div class="search">
                    <input type="text" />
                    <v-icon>mdi-magnify</v-icon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        back() {
            this.$router.go(-1)
        },
        advance() {
            this.$router.go(1)
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    height: 280px;
    position: fixed;
    width: calc(100% - 260px);
    top: 0;
    border-top-right-radius: 16px;
    overflow: hidden;
    background-color: var(--theme-color);

    .con {
        height: 60px;
        display: flex;
        align-items: center;
        color: #fff;
        justify-content: space-between;
        padding-right: 60px;
        &.drag {
            -webkit-app-region: drag;
        }

        .left,
        .right {
            display: flex;
            -webkit-app-region: no-drag;
        }
        .btn {
            margin: 0 10px;
            cursor: pointer;
            font-size: 20px;
        }
        .tit {
            font-size: 18px;
            font-weight: 700;
            margin-right: 30px;
        }
        .back-btn {
            margin-right: 10px;
        }
        .user-info {
            display: flex;
            align-items: center;
            margin-right: 10px;
            cursor: pointer;
            .avatar {
                height: 40px;
                width: 40px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
            }
        }

        .search {
            display: flex;
            align-items: center;
            position: relative;
            color: grey;
            margin-left: 10px;

            input {
                height: 30px;
                display: block;
                width: 200px;
                background-color: #fff;
                border-radius: 14px;
                outline: none;
                padding: 0 40px 0 20px;
            }
            .v-icon {
                position: absolute;
                right: 10px;
            }
        }
    }
}
</style>