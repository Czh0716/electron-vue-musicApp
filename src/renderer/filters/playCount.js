export default val => {
    return val < 10000
        ? val
        : `${parseInt(val / 10000)}.${parseInt((val % 10000) / 1000)}万`
}
