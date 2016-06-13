var EventEmitter = require('events').EventEmitter
var ev = new EventEmitter
ev.on('hello', onhello)
function onhello (x, y) {
  console.log(x, y)
}
ev.emit('hello', 100, 200)
ev.emit('hello', 300, 400)
ev.removeListener('hello', onhello)
ev.emit('hello', 500, 600)

ev.on('error', function (err) {
  console.log('caught error: ' + err)
})
ev.emit('error', new Error('crash!'))
