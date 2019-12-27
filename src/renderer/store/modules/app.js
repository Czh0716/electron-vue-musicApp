const state = {
    detailPageIsShow: false
}

const mutations = {
    TOGGLE_DETAIL_PAGE_SHOW(state, status = true) {
        state.detailPageIsShow = status
    }
}

const actions = {}

export default {
    state,
    mutations,
    actions
}
