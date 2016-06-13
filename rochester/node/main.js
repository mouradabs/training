console.log('hello there!')
console.log(process.argv.slice(2))

process.stdin.on('data', function (buf) {
  console.log(buf)
  console.log(buf.toString('hex'))
})
