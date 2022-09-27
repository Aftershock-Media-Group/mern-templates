export const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)]
}
