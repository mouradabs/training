var xhr = require('xhr')
xhr({
  method: 'POST',
  url: '/',
  body: 'Hello server, this is the browser.\n'
}, function (err, res, body) {
  console.log('got response:', body)
})
