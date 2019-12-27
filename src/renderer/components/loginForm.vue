<template>
    <div class="login">
        <div class="form">
            <div class="tit">
                LOGIN
                <div @click="$store.dispatch('setLoginDialog', false)" class="close">
                    <v-icon>mdi-close</v-icon>
                </div>
            </div>
            <div class="content">
                <input v-model="form.phone" type="text" placeholder="手机号" class="un" />
                <input v-model="form.password" type="password" placeholder="密码" class="pwd" />
                <div @click="login" class="btn">登录</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                phone: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            this.$store.dispatch('login', this.form)
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    width: 360px;
    background-color: #fff;
    position: absolute;
    left: 50%;
    top: 30%;
    margin-left: -180px;
    z-index: 10000;
    border-radius: 8px;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.15);

    &::before {
        content: '';
        position: absolute;
        width: 94%;
        height: 10px;
        left: 50%;
        top: -6px;
        transform: translateX(-50%);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        background-color: #fff;
        z-index: -1;
    }

    .tit {
        font-size: 24px;
        color: var(--theme-color);
        font-weight: 700;
        padding: 0 40px;
        margin: 40px 0;
        position: relative;
        &::before {
            content: '';
            position: absolute;
            width: 3px;
            height: 100%;
            left: 0;
            background-color: var(--theme-color);
        }

        .close {
            position: absolute;
            width: 60px;
            height: 60px;
            background-color: var(--theme-color);
            border-radius: 50%;
            top: 50%;
            margin-top: -30px;
            right: -30px;
            color: white;
            box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: center;
            align-items: center;

            .v-icon {
                font-size: 34px;
                font-weight: 700;
            }
        }
    }

    .content {
        padding: 0 40px 40px;
        input {
            display: block;
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #e6e6e6;
            outline: none;
            &:first-child {
                margin-bottom: 20px;
            }
        }

        .btn {
            border-radius: 16px;
            line-height: 40px;
            text-align: center;
            color: white;
            background-color: var(--theme-color);
            cursor: pointer;
            margin-top: 60px;
        }
    }
}
</style>