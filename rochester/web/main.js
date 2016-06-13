var xhr = require('xhr')
var qs = require('querystring')

console.log('cool')
console.log(qs.parse(location.search.slice(1)))

xhr('/hello.txt', function (err, res, body) {
  document.body.innerText = res.statusCode + ': ' + body
})
