var test = require('tape')
var Git = require('../')
var collect = require('collect-stream')

test('author in the history', function (t) {
  t.plan(2)
  var git = Git()
  collect(git.history(), function (err, commits) {
    t.error(err)
    var lastAuthor = commits[commits.length - 1].author
    t.deepEqual(lastAuthor, {
      name: 'James Halliday',
      email: 'mail@substack.net'
    }, 'last author object')
  })
})
