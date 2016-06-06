var from = require('from2')
var messages = [ 'what', 'cool', 'hey', 'neat', null ]

from(function (size, next) {
  next(null, messages.shift())
}).pipe(process.stdout)
