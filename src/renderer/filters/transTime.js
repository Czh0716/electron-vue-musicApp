export default (val, s = false) => {
    if (!val) return '00:00'
    let minute = ''
    let second = ''
    if (s) {
        minute = parseInt(val / 60)
            .toString()
            .padStart(2, '0')
        second = parseInt(val % 60)
            .toString()
            .padStart(2, '0')
    } else {
        minute = parseInt(val / (60 * 1000))
            .toString()
            .padStart(2, '0')
        second = parseInt(((val % 60) * 1000) / 1000)
            .toString()
            .padStart(2, '0')
    }

    return `${minute}:${second}`
}
