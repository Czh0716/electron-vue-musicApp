import request from '@/utils/request'

// 获取音乐MP3
export function getMusicMp3(id) {
    return request({
        url: `/song/url?id=${id}`,
        method: 'get'
    })
}

// 获取用户播放记录
export function getPlayRecord(id) {
    return request({
        url: `/user/record?uid=${id}&type=1`,
        method: 'get'
    })
}

// 获取歌词
export function getLyric(id) {
    return request({
        url: `/lyric?id=${id}`,
        method: 'get'
    })
}

// 获取音乐详情
export function getMusicDetail(id) {
    return request({
        url: `/song/detail?ids=${id}`,
        method: 'get'
    })
}

export function login({ phone, password }) {
    return request({
        url: `/login/cellphone?phone=${phone}&password=${password}`,
        method: 'get'
    })
}

export function logout() {
    return request({
        url: `/logout`,
        method: 'get'
    })
}

export function getLoginStatus() {
    return request({
        url: `/login/status`,
        method: 'get'
    })
}

export function getUserDetail(id) {
    return request({
        url: `/user/detail?uid=${id}`,
        method: 'get'
    })
}
