var request = require('request')
var r = request('http://localhost:5002', function (err, res, body) {
  console.log(res.statusCode, res.headers['content-type'])
})
r.pipe(process.stdout)
