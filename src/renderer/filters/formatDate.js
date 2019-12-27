function padTwo(str) {
    return ('0' + str).slice(-2)
}

export default (date, format = 'yyyy-MM-dd HH:mm:ss') => {
    const myDate = new Date(date)
    const map = {
        'y+': myDate.getFullYear(),
        'M+': padTwo(myDate.getMonth() + 1),
        'd+': padTwo(myDate.getDate()),
        'H+': padTwo(myDate.getHours()),
        'm+': padTwo(myDate.getMinutes()),
        's+': padTwo(myDate.getSeconds())
    }

    for (let key in map) {
        let reg = new RegExp(`${key}`)
        if (reg.test(format)) {
            format = format.replace(reg, map[key])
        }
    }

    return format
}
