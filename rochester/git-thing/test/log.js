var test = require('tape')
var Git = require('../')
var collect = require('collect-stream')

test('history', function (t) {
  t.plan(2)
  var git = Git()
  collect(git.history(), function (err, commits) {
    t.error(err)
    var lastHash = commits[commits.length - 1].hash
    t.equal(lastHash, 'c18b91270ff64353d215ce5c4d8c75fffb27f63e',
      'last hash')
  })
})
