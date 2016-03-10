module.exports = function (bus, loop) {
  bus.on('increment', function () {
    loop.update({ times: state.times + 1 })
  })
}
