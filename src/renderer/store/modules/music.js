import { getMusicMp3, getMusicDetail, getLyric } from '@/api'
const state = {
    musicInfo: {},
    audioEl: null,
    playStatus: false,
    currentTime: '',
    currentProgress: 0,
    volume: 1,
    isMute: false,
    playList: [],
    playIndex: 0,
    lyric: null
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
            dispatch('getMusicMp3', { next: true })
        })
    },
    clearPlayList({ commit }) {
        commit('CLEAR_PLAY_LIST')
    }
}

export default {
    state,
    mutations,
    actions
}
