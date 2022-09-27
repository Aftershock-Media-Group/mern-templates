export default () => {
  ;['log', 'warn'].forEach(function (method) {
    const old = console[method]
    console[method] = function () {
      let stack = new Error().stack.split(/\n/)
      // Chrome includes a single "Error" line, FF doesn't.
      if (stack[0].indexOf('Error') === 0) {
        stack = stack.slice(1)
      }
      const args = [].slice.apply(arguments).concat([stack[1].trim()])
      return old.apply(console, args)
    }
  })
}
