var xtend = require('xtend')

module.exports = function (bus, loop) {
  bus.on('add-item', function (item) {
    loop.update(xtend(loop.state, {
      items: loop.state.items.concat(item)
    }))
  })
  bus.on('remove-item', function (index) {
    var items = loop.state.items.slice()
    items.splice(index, 1)
    loop.update(xtend(loop.state, { items: items }))
  })
  bus.on('update-item', function (olditem, newitem) {
    loop.update(xtend(loop.state, {
      items: loop.state.items.map(function (name) {
        if (name === olditem) return newitem
        else return name
      })
    }))
  })
}
