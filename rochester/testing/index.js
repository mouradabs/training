module.exports = function (n, cb) {
  setTimeout(function () {
    if (n === 3) cb(new Error('not implemented'))
    else cb(null, n * 100)
  }, 100)
}
