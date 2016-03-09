var xhr = require('xhr')
xhr({
  method: 'GET',
  url: '/hello.txt'
}, function (err, res, body) {
  console.log('STATUS CODE:', res.statusCode)
  console.log('BODY:', body)
})
