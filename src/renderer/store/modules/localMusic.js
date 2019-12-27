const state = {
    localMusics: [],
    searchFiles: []
}

const mutations = {
    ADD_LOCAL_MUSIC(state, music) {
        state.localMusics.push(music)
    },
    ADD_FILE_DIR(state, dir) {
        state.searchFiles.push(dir)
    }
}

const actions = {
    addLocalMusic({ commit }, music) {
        commit('ADD_LOCAL_MUSIC', music)
    },
    addFileDir({ commit }, dir) {
        commit('ADD_FILE_DIR', dir)
    }
}

export default {
    state,
    mutations,
    actions
}
