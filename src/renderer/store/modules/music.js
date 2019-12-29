import {
    getMusicMp3,
    getMusicDetail,
    getLyric,
    getLikeList,
    likeMusic
} from '@/api'
const state = {
    musicInfo: {},
    audioEl: null,
    playStatus: false,
    currentTime: '',
    currentProgress: 0,
    volume: 1,
    isMute: false,
    playList: [],
    likeList: [],
    playIndex: 0,
    lyric: null,
    playMode: 0,
    playModes: {
        0: 'mdi-repeat-once',
        1: 'mdi-repeat',
        2: 'mdi-shuffle-variant'
    }
}

const mutations = {
    PLAY_MUSIC(state) {
        state.playStatus = true
        state.audioEl.play()
    },
    PAUSE_MUSIC(state) {
        state.playStatus = false
        state.audioEl.pause()
    },
    SET_MUSIC(state, info) {
        state.musicInfo = info
        let hasMusic = state.playList.find(item => {
            return item.id === info.id
        })
        if (!hasMusic) {
            state.playList.unshift(info)
            this.playIndex = 0
            state.currentTime = ''
            state.currentProgress = 0
        }
    },
    SET_MUSIC_DURATION(state, duration) {
        state.musicInfo.duration = duration
    },
    SET_AUDIO_ELEMENT(state, el) {
        state.audioEl = el
    },
    SET_PLAY_STATUS(state, status) {
        state.playStatus = status
    },
    SET_PLAY_PROGRESS(state, { time, progress }) {
        time && (state.currentTime = time)
        time ||
            (state.audioEl.currentTime =
                (state.musicInfo.duration || 0) * progress)
        state.currentProgress = progress
    },
    SET_MUSIC_VOLUME(state, volume) {
        state.audioEl.muted = false
        state.isMute = false
        state.audioEl.volume = volume
        state.volume = volume
    },
    SWITCH_MUTE(state) {
        state.audioEl.muted = !state.audioEl.muted
        state.isMute = !state.isMute
    },
    SET_LYRIC(state, lyric) {
        state.lyric = lyric
    },
    CLEAR_PLAY_LIST(state) {
        state.playList = []
        state.musicInfo = {}
        state.playStatus = false
        state.audioEl.pause()
        state.currentTime = ''
        state.currentProgress = 0
    },
    SET_LIKE_LIST(state, likeList) {
        if (Array.isArray(likeList)) {
            state.likeList = likeList
        } else {
            const songIndex = state.likeList.findIndex(
                item => item === likeList
            )
            songIndex !== -1
                ? state.likeList.splice(songIndex, 1)
                : state.likeList.push(likeList)
        }
    },
    SET_PLAY_MODE(state) {
        const overflow =
            state.playMode + 1 >= Object.keys(state.playModes).length
        state.playMode = overflow ? 0 : state.playMode + 1
    }
}

const actions = {
    async getMusicMp3({ commit, state }, { id, prev, next }) {
        const pList = state.playList
        if (!id) {
            const curIdx = pList.findIndex(
                music => music.id === state.musicInfo.id
            )

            prev &&
                (id = pList[curIdx - 1 < 0 ? pList.length - 1 : curIdx - 1].id)

            next && (id = pList[curIdx + 1 >= pList.length ? 0 : curIdx + 1].id)
        }
        const detailRes = await getMusicDetail(id)
        const mp3Res = await getMusicMp3(id)
        commit('SET_MUSIC', {
            id: id,
            url: mp3Res.data.data[0].url,
            name: detailRes.data.songs[0].name,
            cover: detailRes.data.songs[0].al.picUrl,
            artists: detailRes.data.songs[0].ar,
            album: detailRes.data.songs[0].al.name
        })

        getLyric(id)
            .then(res => {
                let tmpArr = res.data.lrc.lyric.split('\n')
                let lrcArr = tmpArr.map(item => {
                    let obj = {}
                    let splitLrc = item.split(']')
                    let time = splitLrc[0].replace('[', '').split(':')
                    obj.time = Math.round(time[0] * 60 + (time[1] - 0))
                    obj.text = splitLrc[1] ? splitLrc[1].trim() : splitLrc[1]
                    return obj.text ? obj : null
                })
                commit('SET_LYRIC', lrcArr.filter(Boolean))
            })
            .catch(err => {})
    },
    initAudioElement({ commit, state, dispatch }, target) {
        commit('SET_AUDIO_ELEMENT', target)
        state.audioEl.volume = state.volume
        state.audioEl.muted = state.isMute
        state.audioEl.currentTime =
            (state.musicInfo.duration || 0) * state.currentProgress
        state.audioEl.addEventListener('canplay', () => {
            commit('PLAY_MUSIC')
        })
        state.audioEl.addEventListener('play', () => {
            commit('SET_PLAY_STATUS', true)
            commit('SET_MUSIC_DURATION', state.audioEl.duration)
        })
        state.audioEl.addEventListener('pause', () => {
            commit('SET_PLAY_STATUS', false)
        })
        state.audioEl.addEventListener('timeupdate', () => {
            let time = parseInt(state.audioEl.currentTime)
            let minute = parseInt(time / 60)
                .toString()
                .padStart(2, '0')
            let second = parseInt(time % 60)
                .toString()
                .padStart(2, '0')
            commit('SET_PLAY_PROGRESS', {
                time: `${minute}:${second}`,
                progress: state.audioEl.currentTime / state.audioEl.duration
            })
        })
        state.audioEl.addEventListener('ended', () => {
            switch (state.playMode) {
                case 0:
                    state.audioEl.play()
                    break
                case 1:
                    dispatch('getMusicMp3', { next: true })
                case 2:
                    const rdmNum = parseInt(
                        Math.random() * state.playList.length
                    )
                    dispatch('getMusicMp3', { id: state.playList[rdmNum].id })
            }
        })
    },
    clearPlayList({ commit }) {
        commit('CLEAR_PLAY_LIST')
    },
    async getLikeList({ commit, state }, id) {
        const { data } = await getLikeList(id)
        commit('SET_LIKE_LIST', data.ids)
    },
    async likeMusic({ commit, dispatch }, { id, liked = true }) {
        await likeMusic(id, liked)
        commit('SET_LIKE_LIST', id)
    },
    setPlayMode({ commit }) {
        commit('SET_PLAY_MODE')
    }
}

export default {
    state,
    mutations,
    actions
}
