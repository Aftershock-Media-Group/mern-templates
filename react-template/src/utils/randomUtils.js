/* eslint-disable no-extend-native */
export const getRandomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

Array.prototype.sample = function () {
    return this[Math.floor(Math.random() * this.length)]
}

Array.prototype.shuffle = function () {
    var i = this.length,
        j,
        temp
    if (i === 0) return this
    while (--i) {
        j = Math.floor(Math.random() * (i + 1))
        temp = this[i]
        this[i] = this[j]
        this[j] = temp
    }
    return this
}

String.prototype.isEmpty = function () {
    return this.length === 0 || !this.trim()
}
