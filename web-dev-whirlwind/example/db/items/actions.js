var xtend = require('xtend')
var through = require('through2')

module.exports = function (bus, loop, db) {
  // load items from the db:
  db.createReadStream().pipe(through.obj(
    function (row, enc, next) {
      addItem(row.key, row.value)
      next()
    },
    function () {
      if (!loop.state.items) {
        loop.update(xtend(loop.state, { items: [] }))
      }
    }
  ))

  bus.on('add-item', function (item) {
    var key = new Date().toISOString()
    db.put(key, item, function (err) {})
    addItem(key, item)
  })
  bus.on('remove-item', function (key) {
    delete loop.state.items[key]
    loop.update(loop.state)
    db.del(key, function (err) {})
  })
  function addItem (key, item) {
    var items = loop.state.items || {}
    items[key] = item
    loop.update(xtend(loop.state, { items: items }))
  }
}
