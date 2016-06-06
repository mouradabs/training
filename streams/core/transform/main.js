var caser = require('./')('flip')
process.stdin.pipe(caser).pipe(process.stdout)

setInterval(function () {
  caser.nextMode()
}, 1000)
