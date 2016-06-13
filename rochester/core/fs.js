var fs = require('fs')

fs.stat('hello.txt', function (err, stat) {
  if (err) return console.error(err)
  console.log(stat)
})

/*
fs.writeFile('hello.txt', 'hello there!', function (err) {
  if (err) console.error(err)
  var r = fs.createReadStream('hello.txt')
  var w = fs.createWriteStream('hello2.txt')
  r.pipe(w)
})
*/
