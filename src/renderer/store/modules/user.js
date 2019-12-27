import { login, logout, getLoginStatus, getUserDetail } from '@/api'
const state = {
    userInfo: {},
    loginDialogVisible: false
}

const mutations = {
    SET_USER_INFO(state, info) {
        state.userInfo = info
    },
    SET_LOGIN_DIALOG(state, status) {
        state.loginDialogVisible = status
    }
}

const actions = {
    async login({ commit }, form) {
        await login(form)
        const { data } = await getLoginStatus()
        commit('SET_USER_INFO', data.profile)
        commit('SET_LOGIN_DIALOG', false)
    },

    async getInfo({ commit }) {
        const { data } = await getLoginStatus()
        commit('SET_USER_INFO', data.profile)
    },

    async logout({ commit }) {
        await logout()
        commit('SET_USER_INFO', {})
    },

    setLoginDialog({ commit }, status = true) {
        commit('SET_LOGIN_DIALOG', status)
    }
}

export default {
    state,
    mutations,
    actions
}
