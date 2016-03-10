var xtend = require('xtend')
var catchLinks = require('catch-links')

module.exports = function (bus, loop) {
  var show = require('single-page')(function (href) {
    bus.emit('page', href)
  })
  catchLinks(window, show)
  bus.on('page', show)
  bus.on('remove-item', function (item) {
    var items = loop.state.items.slice()
    var ix = items.indexOf(item)
    if (ix >= 0) items.splice(ix, 1)
    loop.update(xtend(loop.state, { items: items }))
  })
  bus.on('add-item', function (item) {
    var items = loop.state.items.slice()
    items.push(item)
    loop.update(xtend(loop.state, { items: items }))
  })
  bus.on('page', function (href) {
    loop.update(xtend(loop.state, { path: href }))
  })
}
